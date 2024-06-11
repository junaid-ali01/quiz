import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import React from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "app/navigators"
import { Button, Text } from "app/components"
import { colors, spacing } from "app/theme"
import OTPTextInput from "react-native-otp-textinput"
import { ErrorMessage, Formik } from "formik"
import * as Yup from "yup"

interface props {
  navigation: NativeStackNavigationProp<AppStackParamList, "Otp">
}

const validationSchema = Yup.object().shape({
  otp: Yup.string().required("Otp is required"),
})

const OtpView = ({ navigation }: props) => {
  return (
    <View style={$ViewContentContainer}>
      <Formik
        initialValues={{ otp: "9999" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission
          console.log(values)
          navigation.navigate("Welcome")
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <Text tx="OtpScreen.HeadingText" preset="bold" size="lg" style={$textContain} />
            <Text tx="OtpScreen.SubHeadingText" preset="formLabel" style={$textContain} />
            <OTPTextInput value={values.otp} handleTextChange={handleChange("otp")} />
            <ErrorMessage name="otp" render={(msg) => <Text>{msg}</Text>} />
            <Button
              tx="OtpScreen.buttonText"
              style={$SignButton}
              preset="awesomeButton"
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      <View></View>
      <View style={$bottomView}>
        <Text tx="OtpScreen.OtpBottomText" />
        <TouchableOpacity>
          <Text tx="OtpScreen.otpEdit" style={$bottomText} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OtpView

const $ViewContentContainer: ViewStyle = {
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.sm,
  backgroundColor: colors.palette.neutral100,
  height: "100%",
}
const $textContain: TextStyle = {
  paddingVertical: spacing.xxs,
  marginTop: spacing.xl,
}
const $SignButton: ViewStyle = {
  borderRadius: spacing.lg,
  marginTop: spacing.xl,
}
const $bottomView: ViewStyle = {
  flexDirection: "row",
  alignSelf: "center",
  marginTop: spacing.xs,
}
const $bottomText: TextStyle = {
  color: colors.palette.primary700,
}
