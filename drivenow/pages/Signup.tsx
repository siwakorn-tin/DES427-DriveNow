import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { NavigationProp } from "@react-navigation/native";

const SignUpScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A9A9A9"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#A9A9A9"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </TouchableOpacity>
      
      <Text style={styles.logInText}>
        Already have an account?{' '}
        <Text style={styles.logInLink} onPress={() => navigation.navigate("Login")}>
          Log in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000000',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: '#000000',
  },
  signUpButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logInText: {
    marginTop: 20,
    fontSize: 14,
    color: '#000000',
  },
  logInLink: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
