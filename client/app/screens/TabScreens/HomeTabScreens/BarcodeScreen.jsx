import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BarcodeScreen = () => {
  const [barcodeData, setBarcodeData] = useState('');
  const [scannedItem, setScannedItem] = useState(null);

  // Simulate barcode scan and ingredient analysis
  const handleScanBarcode = () => {
    // Placeholder data simulating a barcode scan
    const itemData = {
      name: 'Organic Oats',
      rating: 'Good', // Could also be Moderate or Bad
      ingredients: [
        { name: 'Oats', quality: 'Good' },
        { name: 'Sugar', quality: 'Moderate' },
        { name: 'Preservative (E220)', quality: 'Bad' },
      ],
    };
    setScannedItem(itemData);
    setBarcodeData('');
  };

  const handleBarcodeInput = (input) => {
    setBarcodeData(input);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={28} color="#FFFFFF" onPress={() => alert("Go Back")} />
        <Text style={styles.headerTitle}>Product Scanner</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Scan or Enter Barcode</Text>

      {/* Barcode Scanner Placeholder */}
      <View style={styles.scannerContainer}>
        <TextInput
          style={styles.barcodeInput}
          placeholder="Enter barcode manually"
          placeholderTextColor="#888"
          value={barcodeData}
          onChangeText={handleBarcodeInput}
        />
        <TouchableOpacity style={styles.scanButton} onPress={handleScanBarcode}>
          <Text style={styles.scanButtonText}>Simulate Scan</Text>
        </TouchableOpacity>
      </View>

      {/* Display Scanned Item */}
      {scannedItem && (
        <View style={styles.resultContainer}>
          <Text style={styles.itemName}>{scannedItem.name}</Text>
          <Text style={[styles.rating, styles[scannedItem.rating.toLowerCase()]]}>{scannedItem.rating}</Text>

          <Text style={styles.sectionTitle}>Ingredients Analysis:</Text>
          {scannedItem.ingredients.map((ingredient, index) => (
            <View
              key={index}
              style={[
                styles.ingredientContainer,
                ingredient.quality === 'Good'
                  ? styles.good
                  : ingredient.quality === 'Moderate'
                  ? styles.moderate
                  : styles.bad,
              ]}
            >
              <Text style={styles.ingredientText}>{ingredient.name}</Text>
              <Text style={styles.ingredientQuality}>{ingredient.quality}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1C1C1C',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    color: '#FF8C00',
    textAlign: 'center',
    marginVertical: 15,
  },
  scannerContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  barcodeInput: {
    padding: 10,
    width: '80%',
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 10,
  },
  scanButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  itemName: {
    fontSize: 20,
    color: '#FF8C00',
    marginBottom: 10,
    textAlign: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    borderRadius: 4,
    marginVertical: 10,
  },
  good: { backgroundColor: '#4CAF50', color: '#FFFFFF' },
  moderate: { backgroundColor: '#FFC107', color: '#FFFFFF' },
  bad: { backgroundColor: '#FF5252', color: '#FFFFFF' },
  sectionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  ingredientContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  good: { backgroundColor: '#4CAF50' },
  moderate: { backgroundColor: '#FFC107' },
  bad: { backgroundColor: '#FF5252' },
  ingredientText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  ingredientQuality: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BarcodeScreen;
