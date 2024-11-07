// src/components/WeeklyWorkout.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const WeeklyWorkout = () => {
  const [surveyData, setSurveyData] = useState({
    gender: '',
    height: '',
    weight: '',
    fitnessGoals: '',
    currentActivityLevel: '',
    dietaryPreferences: ''
  });

  const [workoutPlan, setWorkoutPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername || '');
      fetchUserData(storedUsername);
    };
    fetchUsername();
  }, []);

  const fetchUserData = async (user) => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:5001/api/users/user/${user}`);
      if (!response.ok) throw new Error('Failed to fetch user details');
      
      const data = await response.json();
      setSurveyData({
        gender: data.gender || '',
        height: data.height || '',
        weight: data.weights.length > 0 ? data.weights[0].weight : '',
        fitnessGoals: data.fitnessGoals || '',
        currentActivityLevel: data.currentActivityLevel || '',
        dietaryPreferences: data.dietaryPreferences || ''
      });
    } catch (error) {
      setError('Failed to fetch user data.');
      console.error(error);
    }
  };

  const handleChange = (field, value) => {
    setSurveyData({ ...surveyData, [field]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setWorkoutPlan('');

    const prompt = `
      Create a weekly workout plan for a user with the following details:
      - Gender: ${surveyData.gender}
      - Height: ${surveyData.height} in
      - Weight: ${surveyData.weight} lb
      - Fitness Goals: ${surveyData.fitnessGoals}
      - Current Activity Level: ${surveyData.currentActivityLevel}
      - Dietary Preferences: ${surveyData.dietaryPreferences}
      
      The plan should include exercises from Monday to Sunday, each day should have a minimum of 
      5 exercises specifying the type of exercise, sets, reps strictly with no additional information.`;

    try {
      const response = await fetch('http://localhost:5001/api/chatgpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setWorkoutPlan(data.response);

        await fetch('http://localhost:5001/api/users/save-workout-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, workoutPlan: data.response }),
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred while fetching the workout plan.');
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Generate Your Weekly Workout Plan</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Gender:</Text>
        <Picker selectedValue={surveyData.gender} onValueChange={(value) => handleChange('gender', value)} style={styles.input}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Height (in):</Text>
        <TextInput style={styles.input} value={surveyData.height} keyboardType="numeric" onChangeText={(value) => handleChange('height', value)} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Weight (lb):</Text>
        <TextInput style={styles.input} value={surveyData.weight} keyboardType="numeric" onChangeText={(value) => handleChange('weight', value)} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fitness Goals:</Text>
        <Picker selectedValue={surveyData.fitnessGoals} onValueChange={(value) => handleChange('fitnessGoals', value)} style={styles.input}>
          <Picker.Item label="Select Fitness Goal" value="" />
          <Picker.Item label="Lose Weight" value="lose weight" />
          <Picker.Item label="Gain Muscle" value="gain muscle" />
          <Picker.Item label="Improve Stamina" value="improve stamina" />
          <Picker.Item label="Increase Flexibility" value="increase flexibility" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Current Activity Level:</Text>
        <Picker selectedValue={surveyData.currentActivityLevel} onValueChange={(value) => handleChange('currentActivityLevel', value)} style={styles.input}>
          <Picker.Item label="Select Activity Level" value="" />
          <Picker.Item label="Sedentary" value="sedentary" />
          <Picker.Item label="Active" value="active" />
          <Picker.Item label="Very Active" value="very active" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Dietary Preferences:</Text>
        <Picker selectedValue={surveyData.dietaryPreferences} onValueChange={(value) => handleChange('dietaryPreferences', value)} style={styles.input}>
          <Picker.Item label="Select Dietary Preference" value="" />
          <Picker.Item label="Vegetarian" value="vegetarian" />
          <Picker.Item label="Vegan" value="vegan" />
          <Picker.Item label="Paleo" value="paleo" />
          <Picker.Item label="Keto" value="keto" />
          <Picker.Item label="None" value="none" />
        </Picker>
      </View>

      <Button title={loading ? 'Generating...' : 'Generate Workout Plan'} onPress={handleSubmit} disabled={loading} color="#FF8C00" />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {workoutPlan ? (
        <View style={styles.workoutPlan}>
          <Text style={styles.planTitle}>Your Weekly Workout Plan</Text>
          <Text style={styles.planText}>{workoutPlan}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
  },
  error: {
    color: '#ff4c4c',
    marginTop: 20,
  },
  workoutPlan: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  planTitle: {
    fontSize: 18,
    color: '#FF8C00',
    marginBottom: 10,
  },
  planText: {
    color: '#B3B3B3',
  },
});

export default WeeklyWorkout;
