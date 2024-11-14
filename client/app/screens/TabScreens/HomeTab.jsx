// app/screens/TabScreens/HomeTab.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const HomeTab = ({ navigation }) => {  // Added navigation prop here
  const [weight, setWeight] = useState('');
  const [initialWeight] = useState(180);
  const [goalWeight] = useState(160);
  const [macros] = useState({ protein: 150, carbs: 200, fat: 50 });

  const weightData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [180, 177, 174, 170, 165, 162],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Fitness</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.icon}><Text>👤</Text></TouchableOpacity>
          <TouchableOpacity style={styles.icon}><Text>⚙️</Text></TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons for Workout and Diet Plans */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('WorkoutPlan')}
        >
          <Text style={styles.actionText}>🏋️ Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('DietPlan')}
        >
          <Text style={styles.actionText}>🏋️ Diet</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Barcode')}
        >
          <Text style={styles.actionText}>Barcode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Progress</Text>
        </TouchableOpacity>
      </View>

      {/* Weight Goals Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Weight Goals</Text>
        <View style={styles.goalContainer}>
          <Text style={styles.goalText}>Initial: {initialWeight} lbs</Text>
          <Text style={styles.goalText}>Goal: {goalWeight} lbs</Text>
        </View>
      </View>

      {/* Macros Section */}
      <View style={styles.macroContainer}>
        <Text style={styles.sectionTitle}>Macros</Text>
        <View style={styles.macroInfo}>
          <Text style={styles.macroText}>Protein: {macros.protein}g</Text>
          <Text style={styles.macroText}>Carbs: {macros.carbs}g</Text>
          <Text style={styles.macroText}>Fat: {macros.fat}g</Text>
        </View>
      </View>

      {/* Weight Input and Progress Graph */}
      <View style={styles.graphContainer}>
        <Text style={styles.sectionTitle}>Weight Progress</Text>
        <LineChart
          data={weightData}
          width={screenWidth * 0.9}
          height={200}
          yAxisSuffix=" lbs"
          chartConfig={{
            backgroundGradientFrom: "#121212",
            backgroundGradientTo: "#121212",
            color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          bezier
          style={styles.graph}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter today's weight"
            placeholderTextColor="#888888"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Add Entry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FF8C00",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  infoContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  goalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  goalText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  macroContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
  },
  macroInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  macroText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  graphContainer: {
    marginTop: 10,
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  graph: {
    borderRadius: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    color: "#FFFFFF",
    marginRight: 10,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default HomeTab;
