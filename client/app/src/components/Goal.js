// src/components/Goals.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Goals = () => {
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [calories, setCalories] = useState(0);
  const [weightChange, setWeightChange] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const username = await AsyncStorage.getItem('username');
      if (!username) {
        console.log('No username found');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5001/api/users/user/${username}`);
        if (!response.ok) throw new Error('Failed to fetch user details');
        
        const data = await response.json();
        if (data.weights && data.weights.length > 0) {
          data.weights.sort((a, b) => new Date(b.date) - new Date(a.date));
          data.mostRecentWeight = data.weights[0].weight;
          data.startingWeight = data.weights[data.weights.length - 1].weight;
        }
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && userData.mostRecentWeight && userData.fitnessGoals && userData.currentActivityLevel) {
      setMacros(calculateMacros(userData));
      setCalories(calculateCalories(userData));
      setWeightChange(calculateWeightChange(userData));
    }
  }, [userData]);

  const calculateMacros = (user) => {
    const { mostRecentWeight: weight, fitnessGoals } = user;
    let protein = 0, carbs = 0, fats = 0;
    
    switch (fitnessGoals) {
      case 'gain muscle':
        protein = weight * 1.0;
        carbs = weight * 3.5;
        fats = weight * 0.8;
        break;
      case 'lose weight':
        protein = weight * 1.2;
        carbs = weight * 1.5;
        fats = weight * 0.4;
        break;
      case 'improve stamina':
        protein = weight * 1.0;
        carbs = weight * 3.0;
        fats = weight * 0.6;
        break;
      default:
        protein = weight * 1.0;
        carbs = weight * 2.0;
        fats = weight * 0.5;
        break;
    }

    return { protein: Math.round(protein), carbs: Math.round(carbs), fats: Math.round(fats) };
  };

  const calculateCalories = (user) => {
    const { mostRecentWeight: weight, currentActivityLevel, fitnessGoals } = user;
    let bmr = weight * 12;

    switch (currentActivityLevel) {
      case 'sedentary':
        bmr *= 1.2;
        break;
      case 'active':
        bmr *= 1.5;
        break;
      case 'very active':
        bmr *= 1.75;
        break;
      default:
        bmr *= 1.3;
        break;
    }

    switch (fitnessGoals) {
      case 'gain muscle':
        bmr += 300;
        break;
      case 'lose weight':
        bmr -= 500;
        break;
    }

    return Math.round(bmr);
  };

  const calculateWeightChange = (user) => {
    switch (user.fitnessGoals) {
      case 'gain muscle':
        return 'You will gain weight by building muscle.';
      case 'lose weight':
        return 'You will lose weight.';
      case 'improve stamina':
        return 'You will maintain your weight but improve stamina.';
      default:
        return 'You will maintain your weight.';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF8C00" />;
  }

  return (
    <View style={styles.widget}>
      <Text style={styles.title}>Personal Goal</Text>
      <Text style={styles.text}>Starting Weight: {userData?.startingWeight} LB</Text>
      <Text style={styles.text}>Most Recent Weight: {userData?.mostRecentWeight} LB</Text>
      <Text style={styles.text}>Total Calories: {calories} kcal/day</Text>
      <Text style={styles.text}>Weight Change: {weightChange}</Text>
    </View>
  );
};

export default Goals;

const styles = StyleSheet.create({
  widget: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
});
