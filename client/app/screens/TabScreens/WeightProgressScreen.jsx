// src/screens/ExerciseScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeightProgressScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Exercise Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WeightProgressScreen;
