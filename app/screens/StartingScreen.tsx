import { View, ViewStyle, Image, ImageStyle, TextStyle, TouchableOpacity } from "react-native"
import React from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "app/navigators"
import { colors, spacing } from "app/theme"
import { Button, Screen, Text } from "app/components"

const welcomeLogo = require("../../assets/images/ui/front.png")

interface props {
  navigation: NativeStackNavigationProp<AppStackParamList, "starting">
}
const StartingScreen = ({ navigation }: props) => {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["bottom"]}
    >
      <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />

      <View style={$Container}>
        <Text tx="startingScreen.labeltext" size="xl" preset="bold" style={$RegText} />
      </View>
      <Text tx="common.titleHead" size="sm" style={$titleText} />
      <View>
        <Button
          tx="startingScreen.buttonText"
          style={$tapButton}
          preset="awesomeButton"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("starting")}>
        <Text tx="startingScreen.bottomButton" style={$bottomText} />
      </TouchableOpacity>
    </Screen>
  )
}

export default StartingScreen

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  backgroundColor: colors.palette.neutral100,
}

const $Container: ViewStyle = {
  margin: spacing.md,
}
const $RegText: TextStyle = {}
const $titleText: TextStyle = {
  marginBottom: spacing.sm,
}
const $tapButton: ViewStyle = {
  marginTop: spacing.sm,
  borderRadius: spacing.lg,
}
const $welcomeLogo: ImageStyle = {
  height: 290,
  width: "60%",
  marginBottom: spacing.lg,
  marginTop: spacing.lg,
}
const $bottomText: TextStyle = {
  textAlign: "center",
}
