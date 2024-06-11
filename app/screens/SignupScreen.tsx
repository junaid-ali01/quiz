import React, { ComponentType, FC, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useAppDispatch } from "app/store/hooks"
import { ErrorMessage, Formik } from "formik"
import { registerSuccess } from "app/store/authSlice"
import * as Yup from "yup"

interface SignupScreenProps extends AppStackScreenProps<"Register"> {}
interface Detail {
  name: string
  email: string
  password: string
}

export const SignupScreen: FC<SignupScreenProps> = (_props) => {
  const authPasswordInput = useRef<TextInput>(null)
  const { navigation } = _props
  const dispatch = useAppDispatch()

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [attemptsCount] = useState(0)

  const initialValues: Detail = {
    name: "ali",
    email: "ali@infinite.red",
    password: "ign1teIsAwes0m3",
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  })

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="SignupScreen.signup" preset="heading" style={$signIn} />
      <Text tx="common.titleHead" preset="formLabel" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          dispatch(registerSuccess(values))
          actions.setSubmitting(false)
          navigation.navigate("Otp")
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <TextField
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect={false}
              labelTx="SignupScreen.nameFieldLabel"
              placeholderTx="SignupScreen.nameFieldPlaceholder"
              onSubmitEditing={() => authPasswordInput.current?.focus()}
            />
            <ErrorMessage name="name" render={(msg) => <Text style={$textError}>{msg}</Text>} />

            <TextField
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              labelTx="loginScreen.emailFieldLabel"
              placeholderTx="loginScreen.emailFieldPlaceholder"
              onSubmitEditing={() => authPasswordInput.current?.focus()}
            />
            <ErrorMessage name="email" render={(msg) => <Text style={$textError}>{msg}</Text>} />

            <TextField
              ref={authPasswordInput}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isAuthPasswordHidden}
              labelTx="loginScreen.passwordFieldLabel"
              placeholderTx="loginScreen.passwordFieldPlaceholder"
              RightAccessory={PasswordRightAccessory}
            />
            <ErrorMessage name="password" render={(msg) => <Text style={$textError}>{msg}</Text>} />

            <Button
              testID="login-button"
              tx="SignupScreen.tapToSignUp"
              style={$tapButton}
              preset="awesomeButton"
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <View style={$bottomView}>
        <Text tx="SignupScreen.bottomText" />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text tx="SignupScreen.bottomSignup" style={$bottomText} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("starting")}>
        <Text tx="SignupScreen.bottomSignup" style={$bottomText} />
      </TouchableOpacity>
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.md,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
  marginTop: spacing.lg,
}
const $textError: TextStyle = {
  color: colors.error,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
  marginTop: spacing.xs,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  borderRadius: spacing.lg,
}
const $bottomView: ViewStyle = {
  flexDirection: "row",
  alignSelf: "center",
  marginTop: spacing.xs,
}
const $bottomText: TextStyle = {
  color: colors.palette.primary700,
}
