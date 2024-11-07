// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SideNav from './SideNav';
import Goal from './Goal';
import MacroWidget from './MacroWidget';
import WeightInputWidget from './WeightInputWidget';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => {
    const loadUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername || 'Guest');
    };
    loadUsername();
    fetchWorkoutPlan();
  }, []);

  const fetchWorkoutPlan = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/api/users/get-workout-plan/${username}`);
      if (!response.ok) throw new Error('Failed to fetch workout plan');
      const data = await response.json();
      setWorkoutPlan(parseWorkoutPlan(data.workoutPlan || ''));
    } catch (error) {
      setError('Failed to fetch workout plan.');
    }
    setLoading(false);
  };

  const parseWorkoutPlan = (plan) => {
    const planByDay = {};
    let currentDay = null;
    plan.split('\n').forEach(line => {
      if (daysOfWeek.includes(line.trim().replace(':', ''))) {
        currentDay = line.trim().replace(':', '');
        planByDay[currentDay] = [];
      } else if (currentDay && line.trim()) {
        planByDay[currentDay].push(line.trim());
      }
    });
    return planByDay;
  };

  const toggleDay = (day) => setExpandedDay(expandedDay === day ? null : day);

  return (
    <View style={styles.dashboard}>
      <SideNav username={username} />
      <View style={styles.dashboardContent}>
        <ScrollView style={styles.mainContent}>
          <View style={styles.widget}>
            <Text style={styles.widgetTitle}>Weekly Workout</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#FF8C00" />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              daysOfWeek.map(day => (
                <View key={day} style={styles.workoutDay}>
                  <TouchableOpacity onPress={() => toggleDay(day)} style={styles.workoutDayHeader}>
                    <Text style={styles.workoutDayTitle}>{day}</Text>
                    <Text style={styles.toggleIcon}>{expandedDay === day ? '-' : '+'}</Text>
                  </TouchableOpacity>
                  {expandedDay === day && (
                    <View style={styles.workoutDayContent}>
                      {workoutPlan[day]?.length ? workoutPlan[day].map((exercise, index) => (
                        <Text key={index} style={styles.exerciseText}>{exercise}</Text>
                      )) : (
                        <Text style={styles.exerciseText}>No workout for {day}</Text>
                      )}
                    </View>
                  )}
                </View>
              ))
            )}
          </View>
          <View style={styles.widget}>
            <Goal />
          </View>
          <View style={styles.widget}>
            <MacroWidget />
          </View>
          <View style={styles.widget}>
            <Text style={styles.widgetTitle}>Check-In</Text>
            <WeightInputWidget />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
    dashboard: {
      flex: 1,
      backgroundColor: '#121212',
    },
    dashboardContent: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    mainContent: {
      flex: 1,
    },
    widget: {
      backgroundColor: '#1E1E1E',
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
    },
    widgetTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FF8C00',
      marginBottom: 10,
    },
    errorText: {
      color: '#FF8C00',
      textAlign: 'center',
    },
    workoutDay: {
      marginBottom: 10,
    },
    workoutDayHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: '#1E1E1E',
      borderRadius: 6,
    },
    workoutDayTitle: {
      fontSize: 18,
      color: '#FFFFFF',
    },
    toggleIcon: {
      fontSize: 18,
      color: '#FF8C00',
    },
    workoutDayContent: {
      paddingHorizontal: 10,
      paddingTop: 5,
    },
    exerciseText: {
      color: '#B3B3B3',
      marginBottom: 5,
    },
  });
  