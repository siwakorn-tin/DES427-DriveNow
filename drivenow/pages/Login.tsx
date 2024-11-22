import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { NavigationProp } from "@react-navigation/native";

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/car_icon.png')} // Make sure the file exists in the correct path
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>DriveNow</Text>
      </View>
      
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
      
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      
      <Text style={styles.signUpText}>
        New Here?{' '}
        <Text style={styles.signUpLink} onPress={() => navigation.navigate("Signup")}>
          Sign up
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
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
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 20,
    fontSize: 14,
    color: '#000000',
  },
  signUpLink: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
