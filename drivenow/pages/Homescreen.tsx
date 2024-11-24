import React from "react";
import { Button, View, Text } from "tamagui";
import { NavigationProp } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { ProfileProps } from "../types/session";

export default function HomeScreen({
navigation,session
}:ProfileProps) {
  return (
    <View padding="$6" bg="white" style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text fontSize="$8" fontWeight="bold" marginVertical="$5">
        Home Screen
      </Text>

      <Button
        onPress={() => navigation.navigate("Profile")}
        size="$3"
        theme="active"
        color="white"
        backgroundColor={"black"}
        height="60"
        paddingInline="$4"
        borderRadius="$10"
        marginBottom="$4"
        width="100%"
        fontSize="$4"
      >
        Go to Profile
      </Button>
      <Button
        onPress={() => navigation.navigate("Search")}
        size="$3"
        theme="active"
        color="white"
        backgroundColor={"black"}
        height="60"
        paddingInline="$4"
        borderRadius="$10"
        marginBottom="$4"
        width="100%"
        fontSize="$4"
      >
        Go to Car Rental Search
      </Button>
      <Button
        onPress={() => navigation.navigate("History")}
        size="$3"
        theme="active"
        color="white"
        backgroundColor={"black"}
        height="60"
        paddingInline="$4"
        borderRadius="$10"
        marginBottom="$4"
        width="100%"
        fontSize="$4"
      >
        Go to Car Rental History
      </Button>
    </View>
  );
}
