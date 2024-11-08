// src/components/HomeScreenHeader.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const HomeScreenHeader = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.logoLink}>
          <Text style={styles.logo}>Fit.IO</Text>
        </TouchableOpacity>
        <View style={styles.navigation}>
          <TouchableOpacity onPress={() => router.push('/screens/Signup')} style={styles.navButton}>
            <Text style={styles.navButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/screens/Login')} style={styles.navButton}>
            <Text style={styles.navButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  logoLink: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    fontSize: 26,
    color: '#FF8C00',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    marginLeft: 15,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 25,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});
