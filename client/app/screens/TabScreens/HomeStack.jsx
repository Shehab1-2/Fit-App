// src/screens/TabScreens/HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FitnessDashboardScreen from './HomeTabScreens/FitnessDashboardScreen';
import WorkoutPlanScreen from './HomeTabScreens/WorkoutPlanScreen';
import DietPlanScreen from './HomeTabScreens/DietPlanScreen';
import BarcodeScreen from './HomeTabScreens/BarcodeScreen';
import ProgressScreen from './HomeTabScreens/ProgressScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="FitnessDashboard">
      <Stack.Screen 
        name="FitnessDashboard" 
        component={FitnessDashboardScreen} 
        options={{ title: 'My Fitness', headerShown: false }} 
      />
      <Stack.Screen name="WorkoutPlan" component={WorkoutPlanScreen} />
      <Stack.Screen name="DietPlan" component={DietPlanScreen} />
      <Stack.Screen name="Barcode" component={BarcodeScreen} />
      <Stack.Screen name="Progress" component={ProgressScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
