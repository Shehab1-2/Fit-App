// src/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';

// Import screens
import HomeScreen from '../src/components/HomeScreen';
import Signup from '../src/components/Signup';
import Login from '../src/components/Login';
import Dashboard from '../src/components/Dashboard';
import WeeklyWorkout from '../src/components/WeeklyWorkout';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="WeeklyWorkout" component={WeeklyWorkout} />
    </Stack.Navigator>
  </NavigationContainer>
);

// Register App as the root component
registerRootComponent(App);
