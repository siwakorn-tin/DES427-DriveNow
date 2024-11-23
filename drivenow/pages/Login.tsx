import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { ProfileProps } from "../types/session";
import { supabase } from "../utils/supabase";
import { Alert } from "react-native";
const LoginScreen = ({ navigation, session }: ProfileProps) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = () => {
    async function handleLogin() {
      try {
        const { error, data } = await supabase.auth.signInWithPassword({
          email: username,
          password: password,
        });
        if (data.user !== null) {
          navigation.navigate("Home");
        }
        if (error) throw error;
      } catch (error: any) {
        console.error("Error logging in:", error.message);
      }
    }
    handleLogin();
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/car_icon.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>DriveNow</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#A9A9A9"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        New Here?{" "}
        <Text
          style={styles.signUpLink}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  input: {
    width: "70%",
    height: 60,
    backgroundColor: "#F5F5F5",
    borderRadius: 50,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: "#000000",
  },
  loginButton: {
    width: "70%",
    height: 60,
    backgroundColor: "#000000",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 20,
    fontSize: 14,
    color: "#000000",
  },
  signUpLink: {
    color: "#000000",
    fontWeight: "bold",
  },
});

export default LoginScreen;
