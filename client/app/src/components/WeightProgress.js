// src/components/WeightProgress.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import WeightGraph from './WeightGraph';
import SideNav from './SideNav';
import WeightUpdate from './WeightUpdate';

const { width, height } = Dimensions.get('window');

const WeightProgress = () => {
  return (
    <View style={styles.container}>
      <SideNav />  {/* Use ScrollView if you have a longer list */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Weight Progress</Text>
        <View style={styles.widgetContainer}>
          <View style={styles.chartContainer}>
            <WeightGraph />
          </View>
          <WeightUpdate />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    flexDirection: 'row',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    width: width - 250,  // Assuming SideNav takes 250px
    marginLeft: 'auto',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  widgetContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  chartContainer: {
    backgroundColor: '#33354a',
    borderRadius: 10,
    width: '90%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default WeightProgress;
