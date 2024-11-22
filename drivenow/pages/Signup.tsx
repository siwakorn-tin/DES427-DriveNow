import React from 'react';
import { NavigationProp } from "@react-navigation/native";
import { Stack, Text, Input, Button } from 'tamagui';

const SignUpScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
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
        placeholder="Email"
        placeholderTextColor="#A9A9A9"
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
        onPress={() => console.log("Sign up pressed")}
      >
        <Text color="#FFF" fontSize="$5" fontWeight="bold">
          Sign up
        </Text>
      </Button>
      
      {/* Log In Link */}
      <Text fontSize="$4" color="#000">
        Already have an account?{' '}
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