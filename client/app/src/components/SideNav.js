// src/components/SideNav.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SideNav = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the username from AsyncStorage when the component mounts
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    fetchUsername();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('username');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.sidebarNav}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.navItem}>
        <Text style={styles.navText}>Welcome {username ? `${username.charAt(0).toUpperCase()}${username.slice(1)}` : 'Guest'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Exercise')} style={styles.navItem}>
        <Text style={styles.navText}>Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('QuestionTab')} style={styles.navItem}>
        <Text style={styles.navText}>Question</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserDetails')} style={styles.navItem}>
        <Text style={styles.navText}>User Details</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('WeightProgress')} style={styles.navItem}>
        <Text style={styles.navText}>Weight Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.navItem}>
        <Text style={styles.navText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SideNav;

const styles = StyleSheet.create({
  sidebarNav: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#121212',
  },
  navItem: {
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#1E1E1E',
  },
  navText: {
    color: '#FF8C00',
    fontSize: 18,
    fontWeight: '600',
  },
});
