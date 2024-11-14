// app/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTab from './screens/TabScreens/HomeTab';
import WorkoutPlanScreen from './screens/TabScreens/HomeTabScreens/WorkoutPlanScreen';
import DietPlanScreen from './screens/TabScreens/HomeTabScreens/DietPlanScreen';
import BarcodeScreen from './screens/TabScreens/HomeTabScreens/BarcodeScreen';
import ProgressScreen from './screens/TabScreens/HomeTabScreens/ProgressScreen';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeTab} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="WorkoutPlan" 
        component={WorkoutPlanScreen} 
        options={{ title: 'Workout Plan' }} 
      />

      <Stack.Screen 
        name="DietPlan" 
        component={DietPlanScreen} 
        options={{ title: 'Workout Plan' }} 
      />

      <Stack.Screen 
        name="Barcode" 
        component={BarcodeScreen} 
        options={{ title: 'Workout Plan' }} 
      />


    </Stack.Navigator>
  );
}