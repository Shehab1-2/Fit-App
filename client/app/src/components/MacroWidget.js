// src/components/MacroWidget.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MacroWidget = () => {
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
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
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();

        if (data.weights && data.weights.length > 0) {
          data.weights.sort((a, b) => new Date(b.date) - new Date(a.date));
          data.mostRecentWeight = data.weights[0].weight;
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
    if (userData && userData.mostRecentWeight) {
      setMacros(calculateMacros(userData));
    }
  }, [userData]);

  const calculateMacros = (user) => {
    const { mostRecentWeight: weight, fitnessGoals } = user;
    let protein = 0, carbs = 0, fats = 0;

    switch (fitnessGoals) {
      case 'gain muscle':
        protein = weight * 2.2;
        carbs = weight * 4;
        fats = weight * 1;
        break;
      case 'lose weight':
        protein = weight * 1.8;
        carbs = weight * 2;
        fats = weight * 0.8;
        break;
      case 'improve stamina':
        protein = weight * 1.5;
        carbs = weight * 3;
        fats = weight * 0.9;
        break;
      default:
        protein = weight * 1.5;
        carbs = weight * 2;
        fats = weight * 0.75;
        break;
    }

    return { protein: Math.round(protein), carbs: Math.round(carbs), fats: Math.round(fats) };
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF8C00" />;
  }

  return (
    <View style={styles.widget}>
      <Text style={styles.title}>Macro Goals</Text>
      <Text style={styles.text}>Protein: {macros.protein}g</Text>
      <Text style={styles.text}>Carbs: {macros.carbs}g</Text>
      <Text style={styles.text}>Fats: {macros.fats}g</Text>
    </View>
  );
};

export default MacroWidget;

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
