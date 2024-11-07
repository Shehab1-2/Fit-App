// src/screens/Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    gender: '',
    height: '',
    heightUnit: 'inches',
    weight: '',
    fitnessGoals: '',
    currentActivityLevel: '',
    dietaryPreferences: '',
  });
  const router = useRouter();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Signup successful');
        router.push('/dashboard'); // Replace with actual route
      } else {
        Alert.alert('Error', 'Signup failed');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Unable to reach server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleChange('username', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default Signup;
