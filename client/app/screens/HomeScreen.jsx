// src/screens/HomeScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import HomeScreenHeader from '../components/HomeScreenHeader';

// Get device width and height
const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Function to handle button clicks
  const handleNavigation = (route) => {
    router.push(route); // Navigate to the provided route
  };

  return (
    <View style={styles.homepage}>
      {/* Display Header */}
      <HomeScreenHeader />

      {/* Main Content */}
      <View style={[styles.content, fadeIn && styles.fadeIn]}>
        <Text style={styles.title}>Embark on a fitness journey tailored by AI...</Text>
        <Text style={styles.subtitle}>Optimize your fitness regimen with the power of AI...</Text>
        
        {/* Start Now Button */}
        <TouchableOpacity 
          style={styles.startNowBtn} 
          onPress={() => handleNavigation('/signup')}
        >
          <Text style={styles.startNowText}>Start Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homepage: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    width: width,
    height: height,
  },
  content: {
    alignItems: 'center',
    opacity: 0,
    paddingHorizontal: 20,
    justifyContent: 'center', // Centers content vertically
    flex: 1, // Takes up remaining space below header
  },
  fadeIn: {
    opacity: 1,
    transitionDuration: '2s',
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#B3B3B3',
    marginBottom: 20,
    textAlign: 'center',
  },
  startNowBtn: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: '#FF8C00',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignItems: 'center',
    marginVertical: 5,
  },
  startNowText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
