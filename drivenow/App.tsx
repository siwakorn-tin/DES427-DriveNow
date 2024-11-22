import { TamaguiProvider, View } from "@tamagui/core";
import appConfig from "./tamagui.config";
import { useFonts } from "expo-font";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./pages/Homescreen";
import AboutScreen from "./pages/Profile";
const Stack = createNativeStackNavigator();
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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}
