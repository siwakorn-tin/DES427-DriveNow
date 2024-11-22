import { TamaguiProvider, View } from "@tamagui/core";
import appConfig from "./tamagui.config";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, AboutScreen, LoginScreen } from "./pages";

import useSession from "./hooks/useSession";
const Stack = createNativeStackNavigator();
export default function App() {
  const session = useSession();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  return (
    <TamaguiProvider config={appConfig}>
      {!loaded ? (
        <View>Loading...</View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            {session ? (
              <>
                <Stack.Screen name="Home">
                  {(props) => <HomeScreen {...props} session={session} />}
                </Stack.Screen>
                <Stack.Screen name="Profile">
                  {(props) => <AboutScreen {...props} session={session} />}
                </Stack.Screen>
              </>
            ) : (
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} />}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </TamaguiProvider>
  );
}
