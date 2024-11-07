// src/components/Collapsible.js
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const Collapsible = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    const initialValue = expanded ? 1 : 0;
    const finalValue = expanded ? 0 : 1;
    setExpanded(!expanded);

    Animated.timing(animationController, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const height = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust this value based on your content height
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.toggle}>{expanded ? '-' : '+'}</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height }]}>
        <View style={styles.innerContent}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FF8C00',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    overflow: 'hidden',
  },
  innerContent: {
    padding: 15,
    backgroundColor: '#121212',
  },
});

export default Collapsible;
