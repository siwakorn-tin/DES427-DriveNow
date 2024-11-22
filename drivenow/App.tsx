import { TamaguiProvider, View } from "@tamagui/core";
import appConfig from "./tamagui.config";
import { useFonts } from "expo-font";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./pages/Homescreen";
import AboutScreen from "./pages/Profile";
import LoginScreen from "./pages/Login";
import SignupScreen from "./pages/Signup";
import CarRentalSearch from "./pages/Search";
import CarRentalConfirmation from "./pages/Confirmation";
import AvailableCarsScreen from "./pages/AvailableCar";
import CarRentalFormScreen from "./pages/CarRentalForm";
import RentalHistoryScreen from "./pages/History";
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
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Search" component={CarRentalSearch} />
          <Stack.Screen name="Confirmation" component={CarRentalConfirmation} />
          <Stack.Screen name="Available" component={AvailableCarsScreen} />
          <Stack.Screen name="RentalForm" component={CarRentalFormScreen} />
          <Stack.Screen name="History" component={RentalHistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}
