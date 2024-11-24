import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { getUser } from "../utils/user";
import { NavigationProp } from "@react-navigation/native";
import useUserData from "../hooks/useUserData";
import { ProfileProps } from "../types/session";

const ProfileScreen: React.FC<ProfileProps> = ({ navigation, session }) => {
  if (!session) {
    return <Text>Not logged in</Text>;
  }
  const { data, loading } = useUserData(session);

  if (loading || !data) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Profile Details</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{data.fullname || "N/A"}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{data.id || "N/A"}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>License Number:</Text>
        <Text style={styles.value}>{data.license_number || "N/A"}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{data.user_id || "N/A"}</Text>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 30,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 10,
    color: "#555",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
  },
});

export default ProfileScreen;
