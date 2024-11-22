import React from "react";
import { Button, View, Text } from "tamagui";
import { NavigationProp } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";

export default function HomeScreen({
  navigation,
  session,
}: {
  navigation: NavigationProp<any>;
  session: Session;
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
    </View>
  );
}
