import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SideNav = () => {
  const [username, setUsername] = useState('Guest');
  const router = useRouter();

  useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1));
      }
    };
    getUsername();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('username');
    router.replace('/screens/Login');
  };

  return (
    <View style={styles.sidenav}>
      <View style={styles.navItems}>
        <TouchableOpacity onPress={() => router.push('/screens/Dashboard')}>
          <Text style={styles.navText}>Welcome, {username}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/screens/Exercise')}>
          <Text style={styles.navText}>Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/screens/Question')}>
          <Text style={styles.navText}>Question</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/screens/UserDetails')}>
          <Text style={styles.navText}>User Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/screens/WeightProgress')}>
          <Text style={styles.navText}>Weight Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.navText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidenav: {
    backgroundColor: '#1a1a2e',
    width: 250,
    paddingVertical: 20,
    paddingHorizontal: 10,
    height: '100%',
  },
  navItems: {
    marginTop: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 18,
    paddingVertical: 10,
    marginBottom: 10,
  },
});

export default SideNav;
