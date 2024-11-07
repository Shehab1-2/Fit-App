// src/components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logoLink}>
        <Text style={styles.logo}>Fit.IO</Text>
      </TouchableOpacity>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.navButton}>
          <Text style={styles.navButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.navButton}>
          <Text style={styles.navButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#121212',
    width: '100%',
  },
  logoLink: {
    flex: 1,
  },
  logo: {
    fontSize: 24,
    color: '#FF8C00',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  navigation: {
    flexDirection: 'row',
  },
  navButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#FF8C00',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});
