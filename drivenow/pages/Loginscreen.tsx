import React from "react";
import { Button, View, Text } from "tamagui";
import { NavigationProp } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";

export default function LoginScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      <Button
        onPress={() => navigation.navigate("Profile")}
        size="$3"
        theme="active"
        color={"$blue7"}
        backgroundColor={"$blue11Dark"}
      >
        Go to Profile
      </Button>
    </View>
  );
}
