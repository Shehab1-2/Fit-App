// src/screens/DashboardTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ExerciseScreen from './TabScreens/ExerciseScreen'; // Placeholder screens
import QuestionScreen from './TabScreens/QuestionScreen';
import UserDetailsScreen from './TabScreens/UserDetailsScreen';
import WeightProgressScreen from './TabScreens/WeightProgressScreen';

const Tab = createBottomTabNavigator();

const DashboardTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Exercise"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Exercise') {
            iconName = 'fitness';
          } else if (route.name === 'Questions') {
            iconName = 'help-circle';
          } else if (route.name === 'User Details') {
            iconName = 'person';
          } else if (route.name === 'Weight Progress') {
            iconName = 'barbell';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF8C00',
        tabBarInactiveTintColor: '#555',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Exercise" component={ExerciseScreen} />
      <Tab.Screen name="Questions" component={QuestionScreen} />
      <Tab.Screen name="User Details" component={UserDetailsScreen} />
      <Tab.Screen name="Weight Progress" component={WeightProgressScreen} />
    </Tab.Navigator>
  );
};

export default DashboardTabs;
