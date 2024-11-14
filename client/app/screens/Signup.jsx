// SignupScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const { width } = Dimensions.get('window');

const SignupScreen = ({ navigation }) => {
  const [step, setStep] = useState(1); // Track current step
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    gender: '',
    height: '',
    fitnessGoals: '',
    currentActivityLevel: '',
    weights: [{ weight: '', date: new Date() }],
    dietaryPreferences: '',
    workoutPlan: [],
    dietPlan: []
  });

  const handleNext = () => {
    if (step < 5) setStep(step + 1); // Go to the next step
    else {
      console.log('Signup Complete:', formData);
      navigation.navigate('HomeScreen'); // Navigate to home after signup
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1); // Go to the previous step if not on the first step
  };

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.title}>Create Your Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={formData.username}
              onChangeText={value => handleInputChange('username', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={formData.password}
              onChangeText={value => handleInputChange('password', value)}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.title}>Personal Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={formData.gender}
              onChangeText={value => handleInputChange('gender', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Height (cm)"
              keyboardType="numeric"
              value={formData.height}
              onChangeText={value => handleInputChange('height', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Fitness Goals (e.g., Lose Weight)"
              value={formData.fitnessGoals}
              onChangeText={value => handleInputChange('fitnessGoals', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Activity Level (e.g., Moderate)"
              value={formData.currentActivityLevel}
              onChangeText={value => handleInputChange('currentActivityLevel', value)}
            />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.title}>Track Your Weight</Text>
            <TextInput
              style={styles.input}
              placeholder="Current Weight (kg)"
              keyboardType="numeric"
              value={formData.weights[0].weight}
              onChangeText={value =>
                setFormData(prevData => ({
                  ...prevData,
                  weights: [{ weight: value, date: new Date() }]
                }))
              }
            />
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.title}>Your Workout Plan</Text>
            <TextInput
              style={styles.input}
              placeholder="Day (e.g., Monday)"
              value={formData.workoutPlan.day}
              onChangeText={day => handleInputChange('workoutPlan', { ...formData.workoutPlan, day })}
            />
            <TextInput
              style={styles.input}
              placeholder="Exercises (e.g., Squats, 3 sets of 10)"
              value={formData.workoutPlan.exercises}
              onChangeText={exercises => handleInputChange('workoutPlan', { ...formData.workoutPlan, exercises })}
            />
          </>
        );
      case 5:
        return (
          <>
            <Text style={styles.title}>Your Diet Plan</Text>
            <TextInput
              style={styles.input}
              placeholder="Dietary Preferences (e.g., Vegan, Balanced)"
              value={formData.dietaryPreferences}
              onChangeText={value => handleInputChange('dietaryPreferences', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Meals (e.g., Breakfast: Oats, Lunch: Salad)"
              value={formData.dietPlan.meals}
              onChangeText={meals => handleInputChange('dietPlan', { ...formData.dietPlan, meals })}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Progress Bar */}
      <ProgressBar progress={step / 5} color="#FF8C00" style={styles.progressBar} />

      {renderStepContent()}

      <View style={styles.buttonContainer}>
        {/* Back Button (only show if not on the first step) */}
        {step > 1 && (
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}

        {/* Next Button */}
        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNext}>
          <Text style={styles.buttonText}>{step < 5 ? 'Next' : 'Finish'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  progressBar: { marginVertical: 20, height: 8, borderRadius: 4 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#333', fontWeight: '600' },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: '#333'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%'
  },
  nextButton: {
    backgroundColor: '#FF8C00',
  },
  backButton: {
    backgroundColor: '#ddd',
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '700' }
});

export default SignupScreen;
