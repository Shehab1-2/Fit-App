// src/layout.jsx
import { Slot } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Shared Header */}
      <View style={styles.header}>
        {/* Conditional Back Button */}
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Fit.IO</Text>
      </View>
      
      {/* Slot renders the current screen */}
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#121212",
  },
  backButton: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FF8C00",
    borderRadius: 5,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    color: "#FF8C00",
    fontWeight: "bold",
  },
});
