// src/screens/Dashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardTabs from './DashboardTabs';

const Dashboard = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (!storedUsername) {
          router.push('/screens/Login');
        } else {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Failed to retrieve username:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.fullContainer}>
      <Text style={styles.greeting}>Hello, {username}</Text>
      <View style={styles.tabsContainer}>
        <DashboardTabs />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  tabsContainer: {
    flex: 1,
  },
  greeting: {
    textAlign: 'center', // Center the greeting text only
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
});

export default Dashboard;