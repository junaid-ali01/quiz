import React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "app/components"
import { AppStackParamList } from "../navigators"
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader"
import { useAppDispatch, useAppSelector } from "app/store/hooks"
import { logoutSuccess } from "app/store/authSlice"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootState } from "app/store/store"

const welcomeLogo = require("../../assets/images/logo.png")

interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<AppStackParamList, "Welcome">
}

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const { name, email, password, isLoggedIn, registered } = useAppSelector(
    (state: RootState) => state.auth,
  )

  const dispatch = useAppDispatch()
  function Logout() {
    dispatch(logoutSuccess())
  }
  useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: Logout,
    },
    [Logout],
  )

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />

        {registered ? (
          <View>
            <Text>Welcome, {name}</Text>
            <Text>Welcome, {email}</Text>
            <Text> {password}</Text>
          </View>
        ) : (
          <Text></Text>
        )}
        {isLoggedIn ? (
          <View>
            <Text>Welcome, {email}</Text>
            <Text> {password}</Text>
          </View>
        ) : (
          <Text>....</Text>
        )}
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
      </View>
    </View>
  )
}
export default WelcomeScreen
const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
