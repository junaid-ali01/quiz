import React, { ComponentType, FC, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useAppDispatch } from "app/store/hooks"
import { ErrorMessage, Formik } from "formik"
import * as Yup from "yup"
import { loginSuccess } from "app/store/authSlice"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}
interface detail {
  email: string
  password: string
}

export const LoginScreen: FC<LoginScreenProps> = (_props) => {
  const { navigation } = _props
  const authPasswordInput = useRef<TextInput>(null)
  const dispatch = useAppDispatch()

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [attemptsCount] = useState(0)

  const initialValues: detail = {
    email: "ignite@infinite.red",
    password: "ign1teIsAwes0m3",
  }

  const validationSchema = Yup.object().shape({
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
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="common.titleHead" preset="formLabel" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          dispatch(loginSuccess(values))
          actions.setSubmitting(false)
          navigation.navigate("Welcome")
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
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
              tx="loginScreen.tapToSignIn"
              style={$tapButton}
              preset="awesomeButton"
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <View style={$bottomView}>
        <Text tx="loginScreen.bottomText" />
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text tx="loginScreen.bottomSignup" style={$bottomtext} />
        </TouchableOpacity>
      </View>
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
const $bottomtext: TextStyle = {
  color: colors.palette.primary700,
}
