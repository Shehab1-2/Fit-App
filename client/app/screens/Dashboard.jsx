import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardTabs from './DashboardTabs';

const Dashboard = () => {
  const router = useRouter();
  const [username, setUsername] = useState(''); // Ensure username is always a string
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (!storedUsername) {
          router.push('/screens/Login'); // Redirect to login if not logged in
        } else {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Failed to retrieve username:', error?.message || error);
      } finally {
        setLoading(false); // Stop loading after attempt to retrieve username
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
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {username || 'Guest'}</Text>
      <DashboardTabs /> {/* Integrate the DashboardTabs component */}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    paddingTop: 20, // Add padding if needed for layout
    backgroundColor: '#f0f0f0',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', // Center the greeting text
  },
});

export default Dashboard;
