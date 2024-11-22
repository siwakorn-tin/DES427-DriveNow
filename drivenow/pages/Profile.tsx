import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { getUser } from "../utils/user";
import { NavigationProp } from "@react-navigation/native";
import useUserData from "../hooks/useUserData";
import { ProfileProps } from "../types/session";

const ProfileScreen: React.FC<ProfileProps> = ({ navigation, session }) => {
  const { data, loading } = useUserData(session);

  if (loading || !data) {
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      <Text>Full Name: {data.fullname}</Text>
      <Text>ID: {data.id}</Text>
      <Text>License Number: {data.license_number}</Text>
      <Text>User ID: {data.user_id}</Text>
    </View>
  );
};

export default ProfileScreen;
