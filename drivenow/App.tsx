import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { TamaguiProvider, View } from "@tamagui/core";
import appConfig from "./tamagui.config";
import { useFonts } from "expo-font";
import React from "react";
import { Button, Input, TextArea, XStack, YStack } from "tamagui";
import type { SizeTokens } from "tamagui";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <TamaguiProvider config={appConfig}>
      <View width={200} height={200} backgroundColor="$background" />
      <YStack
        width={200}
        minHeight={250}
        overflow="hidden"
        space="$2"
        margin="$3"
        padding="$2"
      >
        <InputDemo size="$2" />
        <InputDemo size="$3" />
        <InputDemo size="$4" />
        <TextArea placeholder="Enter your details..." />
      </YStack>
    </TamaguiProvider>
  );
}
function InputDemo(props: { size: SizeTokens }) {
  return (
    <XStack alignItems="center" space="$2">
      <Input flex={1} size={props.size} placeholder={`Size ${props.size}...`} />
      <Button size={props.size}>Go</Button>
    </XStack>
  );
}
