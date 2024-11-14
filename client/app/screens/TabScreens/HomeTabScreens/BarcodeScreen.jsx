import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const BarcodeScreen = () => {
  const [barcodeData, setBarcodeData] = useState('');
  const [scannedItem, setScannedItem] = useState(null);

  // Simulate barcode scan and ingredient analysis
  const handleScanBarcode = () => {
    // Placeholder data simulating a barcode scan
    const itemData = {
      name: 'Organic Oats',
      ingredients: [
        { name: 'Oats', quality: 'Good' },
        { name: 'Sugar', quality: 'Moderate' },
        { name: 'Preservative (E220)', quality: 'Bad' },
      ],
    };
    setScannedItem(itemData);
    setBarcodeData('');
  };

  // Function to handle input for testing (replace this with actual scanner functionality)
  const handleBarcodeInput = (input) => {
    setBarcodeData(input);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Scan or Enter Barcode</Text>

      {/* Placeholder for Barcode Scanning */}
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
    backgroundColor: '#121212',
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
    backgroundColor: '#1E1E1E',
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
    backgroundColor: '#1E1E1E',
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
  good: {
    backgroundColor: '#4CAF50',
  },
  moderate: {
    backgroundColor: '#FFC107',
  },
  bad: {
    backgroundColor: '#FF5252',
  },
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
