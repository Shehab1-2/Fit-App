// src/screens/DashboardTabs.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeTab from './TabScreens/HomeTab';

const Tab = createBottomTabNavigator();

// Placeholder screen component for testing each tab
const PlaceholderScreen = ({ route }) => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>{route.name} Screen</Text>
  </View>
);

// Floating button component
const FloatingButton = ({ onPress }) => (
  <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
    <Ionicons name="add" size={30} color="white" />
  </TouchableOpacity>
);

const DashboardTabs = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Notifications') {
              iconName = 'notifications';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF8C00',
          tabBarInactiveTintColor: '#555',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: styles.tabBar,
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Search" component={PlaceholderScreen} />
        <Tab.Screen name="Notifications" component={PlaceholderScreen} />
        <Tab.Screen name="Settings" component={PlaceholderScreen} />
      </Tab.Navigator>
      <FloatingButton onPress={() => alert("Floating Button Pressed")} />
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 10,
    paddingTop: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#d1d1d1',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80, // Adjusted to be above the tab bar
    alignSelf: 'center',
    backgroundColor: '#FF8C00',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
});

export default DashboardTabs;
