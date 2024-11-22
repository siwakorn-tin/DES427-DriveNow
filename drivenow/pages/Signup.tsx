import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { Stack, Text, Input, Button } from "tamagui";
import { ProfileProps } from "../types/session";
import { createAccount } from "../utils/user";
import { Alert, Platform } from "react-native";

const SignUpScreen = ({ navigation }: ProfileProps) => {
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [driverLicense, setDriverLicense] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSignUp = async () => {
    if (loading) return; // Prevent multiple submissions

    setLoading(true);
    try {
      const data = await createAccount(
        firstName,
        lastName,
        driverLicense,
        email,
        password
      );
      console.log(data);
      if (data) {
        Alert.alert("Success", "Account created successfully");
        navigation.navigate("Login");
      }
    } catch (error: any) {
      if (Platform.OS === "web") {
        window.alert(`Signup Error: ${error.message}`);
      } else {
        Alert.alert("Signup Error", error.message);
      }
      console.error("Error creating account:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#FFFFFF"
      paddingHorizontal="$4"
    >
      {/* Title */}
      <Text fontSize="$8" fontWeight="bold" color="#000" marginBottom="$6">
        Create account
      </Text>

      {/* Input Fields */}
      <Input
        placeholder="First Name"
        placeholderTextColor="#A9A9A9"
        value={firstName}
        onChangeText={setFirstName}
        width="80%"
        height="$5"
        borderRadius="$4"
        backgroundColor="#F5F5F5"
        paddingHorizontal="$4"
        marginBottom="$3"
        fontSize="$5"
      />
      <Input
        placeholder="Last Name"
        placeholderTextColor="#A9A9A9"
        value={lastName}
        onChangeText={setLastName}
        width="80%"
        height="$5"
        borderRadius="$4"
        backgroundColor="#F5F5F5"
        paddingHorizontal="$4"
        marginBottom="$3"
        fontSize="$5"
      />
      <Input
        placeholder="Driver License Number"
        placeholderTextColor="#A9A9A9"
        keyboardType="numeric"
        value={driverLicense}
        onChangeText={setDriverLicense}
        width="80%"
        height="$5"
        borderRadius="$4"
        backgroundColor="#F5F5F5"
        paddingHorizontal="$4"
        marginBottom="$3"
        fontSize="$5"
      />
      <Input
        placeholder="Email"
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={setEmail}
        width="80%"
        height="$5"
        borderRadius="$4"
        backgroundColor="#F5F5F5"
        paddingHorizontal="$4"
        marginBottom="$3"
        fontSize="$5"
      />

      <Input
        placeholder="Password"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        width="80%"
        height="$5"
        borderRadius="$4"
        backgroundColor="#F5F5F5"
        paddingHorizontal="$4"
        marginBottom="$5"
        fontSize="$5"
      />

      {/* Sign Up Button */}
      <Button
        width="80%"
        height="$5"
        backgroundColor="#000"
        borderRadius="$4"
        justifyContent="center"
        alignItems="center"
        marginBottom="$4"
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text color="#FFF" fontSize="$5" fontWeight="bold">
          Sign up
        </Text>
      </Button>

      <Text fontSize="$4" color="#000">
        Already have an account?{" "}
        <Text
          color="#000"
          fontWeight="bold"
          onPress={() => navigation.navigate("Login")}
        >
          Log in
        </Text>
      </Text>
    </Stack>
  );
};

export default SignUpScreen;
