import React from "react";
import { Button, View, Text } from "tamagui";
import { NavigationProp } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { ProfileProps } from "../types/session";

export default function HomeScreen({
navigation,session
}:ProfileProps) {
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
      <Button
        onPress={() => navigation.navigate("Search")}
        size="$3"
        theme="active"
        color={"$blue7"}
        backgroundColor={"$blue11Dark"}
      >
        Go to Car Rental Search
      </Button>
      <Button
        onPress={() => navigation.navigate("Confirmation")}
        size="$3"
        theme="active"
        color={"$blue7"}
        backgroundColor={"$blue11Dark"}
      >
        Go to Car Rental Confirmation
      </Button>
    </View>
  );
}
