import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SurveyForm = () => {
  const [surveyData, setSurveyData] = useState({
    username: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoals: '',
    currentActivityLevel: '',
    dietaryPreferences: '',
  });

  const navigation = useNavigation();

  const handleChange = (field, value) => {
    setSurveyData({ ...surveyData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        surveyData.username = storedUsername;
      }

      const response = await fetch('http://localhost:5001/api/users/fitness-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Survey Data Saved:', data);
        navigation.navigate('Dashboard'); // Navigate to Dashboard upon successful submission
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error saving survey data');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to save survey data: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete your fitness survey</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={surveyData.gender}
          onValueChange={(value) => handleChange('gender', value)}
          style={styles.input}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Height (in):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={surveyData.height}
          onChangeText={(value) => handleChange('height', value)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Weight (lb):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={surveyData.weight}
          onChangeText={(value) => handleChange('weight', value)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fitness Goals:</Text>
        <Picker
          selectedValue={surveyData.fitnessGoals}
          onValueChange={(value) => handleChange('fitnessGoals', value)}
          style={styles.input}
        >
          <Picker.Item label="Select Fitness Goal" value="" />
          <Picker.Item label="Lose Weight" value="lose weight" />
          <Picker.Item label="Gain Muscle" value="gain muscle" />
          <Picker.Item label="Improve Stamina" value="improve stamina" />
          <Picker.Item label="Increase Flexibility" value="increase flexibility" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Current Activity Level:</Text>
        <Picker
          selectedValue={surveyData.currentActivityLevel}
          onValueChange={(value) => handleChange('currentActivityLevel', value)}
          style={styles.input}
        >
          <Picker.Item label="Select Activity Level" value="" />
          <Picker.Item label="Sedentary" value="sedentary" />
          <Picker.Item label="Active" value="active" />
          <Picker.Item label="Very Active" value="very active" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Dietary Preferences:</Text>
        <Picker
          selectedValue={surveyData.dietaryPreferences}
          onValueChange={(value) => handleChange('dietaryPreferences', value)}
          style={styles.input}
        >
          <Picker.Item label="Select Dietary Preference" value="" />
          <Picker.Item label="Vegetarian" value="vegetarian" />
          <Picker.Item label="Vegan" value="vegan" />
          <Picker.Item label="Paleo" value="paleo" />
          <Picker.Item label="Keto" value="keto" />
          <Picker.Item label="None" value="none" />
        </Picker>
      </View>

      <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    color: '#333333',
  },
});

export default SurveyForm;
