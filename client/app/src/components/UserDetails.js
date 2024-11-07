// src/components/UserDetails.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const dummyUserData = {
  username: 'guest',
  gender: 'female',
  height: 5.5,
  weights: [{ weight: 150, date: '2023-01-01' }],
  fitnessGoals: 'maintain',
  currentActivityLevel: 'active',
  dietaryPreferences: 'vegetarian',
};

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const username = await AsyncStorage.getItem('username');
      if (!username) {
        console.log('No username found');
        setUserData(dummyUserData);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5001/api/users/user/${username}`);
        let data;

        if (!response.ok) {
          data = dummyUserData;
        } else {
          data = await response.json();
        }

        if (data.weights && data.weights.length > 0) {
          data.weights.sort((a, b) => new Date(b.date) - new Date(a.date));
          data.mostRecentWeight = data.weights[0].weight;
        }
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData(dummyUserData);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');

  if (loading) {
    return <ActivityIndicator size="large" color="#FF8C00" style={styles.loading} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userDetails}>
        <Text style={styles.header}>User Details</Text>
        <Text style={styles.info}>Username: {capitalize(userData.username)}</Text>
        <Text style={styles.info}>Gender: {capitalize(userData.gender)}</Text>
        <Text style={styles.info}>Height: {userData.height} ft</Text>
        <Text style={styles.info}>Most Recent Weight: {userData.mostRecentWeight || 'No recent weight'} lb</Text>
        <Text style={styles.info}>Fitness Goal: {capitalize(userData.fitnessGoals)}</Text>
        <Text style={styles.info}>Current Fitness Level: {capitalize(userData.currentActivityLevel)}</Text>
        <Text style={styles.info}>Diet: {capitalize(userData.dietaryPreferences)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  userDetails: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#FF8C00',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 5,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default UserDetails;
