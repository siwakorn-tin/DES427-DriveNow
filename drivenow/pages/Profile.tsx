import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { ProfileProps } from "../types/session";
import useUserData from "../hooks/useUserData";

const ProfileScreen: React.FC<ProfileProps> = ({ navigation, session }) => {
  if (!session) {
    return <Text>Not logged in</Text>;
  }
  
  const { data, loading } = useUserData(session);

  if (loading || !data) {
    return <Text>Loading...</Text>;
  }

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <View style={styles.screen}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitial(data.fullname)}</Text>
        </View>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen:{
    backgroundColor: "white",
    height: "100%",
  },
  container: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  label: {
    fontSize: 14,
    color: "#6c757d",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;