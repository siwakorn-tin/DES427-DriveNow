import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { Stack, Text, Input, Button } from "tamagui";
import { ProfileProps } from "../types/session";

const SignUpScreen = ({ navigation }: ProfileProps) => {
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [driverLicense, setDriverLicense] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleSignUp = () => {
    console.log({
      firstName,
      lastName,
      driverLicense,
      email,
      username,
      password,
    });
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
        placeholder="Username"
        placeholderTextColor="#A9A9A9"
        value={username}
        onChangeText={setUsername}
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
