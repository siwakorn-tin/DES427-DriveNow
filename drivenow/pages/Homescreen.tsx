// Homescreen.js
import React from "react";
// import { Button, View, Text } from "react-native";
import { Button, View, Text } from "tamagui";
import { NavigationProp } from "@react-navigation/native";

export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => navigation.navigate("Profile")}
        size="$3"
        theme="active"
        color={"$blue7"}
        backgroundColor={"$blue11Dark"}
      >
        Go to Profile
      </Button>
      <Button
        onPress={() => navigation.navigate("Login")}
        size="$3"
        theme="active"
        color={"$blue7"}
        backgroundColor={"$blue11Dark"}
      >
        Go to Login
      </Button>
    </View>
  );
}