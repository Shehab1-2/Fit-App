// app/index.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardTabs from './screens/DashboardTabs';
import WorkoutPlanScreen from './screens/TabScreens/HomeTabScreens/WorkoutPlanScreen';
import DietPlanScreen from './screens/TabScreens/HomeTabScreens/DietPlanScreen';
import BarcodeScreen from './screens/TabScreens/HomeTabScreens/BarcodeScreen';
import ProgressScreen from './screens/TabScreens/HomeTabScreens/ProgressScreen';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={DashboardTabs}
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
        options={{ title: 'Diet Plan' }}
      />
      <Stack.Screen
        name="Barcode"
        component={BarcodeScreen}
        options={{ title: 'Barcode Scanner' }}
      />
      <Stack.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ title: 'Progress' }}
      />
    </Stack.Navigator>
  );
}
