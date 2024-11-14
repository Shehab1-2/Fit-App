import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProgressScreen = () => {
  const [photos, setPhotos] = useState({});
  const [weightLogs, setWeightLogs] = useState({});
  const [currentWeight, setCurrentWeight] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Function to add photo
  const addPhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const photoUri = result.uri;
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [selectedMonth]: [...(prevPhotos[selectedMonth] || []), { uri: photoUri, date: new Date().toLocaleDateString() }],
      }));
    }
  };

  // Function to log weight
  const logWeight = () => {
    const logDate = new Date().toLocaleDateString();
    setWeightLogs((prevLogs) => ({
      ...prevLogs,
      [selectedMonth]: [...(prevLogs[selectedMonth] || []), { weight: currentWeight, date: logDate }],
    }));
    setCurrentWeight('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Progress Tracker</Text>

      {/* Month Selector */}
      <View style={styles.monthSelector}>
        {months.map((month) => (
          <TouchableOpacity
            key={month}
            style={[styles.monthButton, selectedMonth === month && styles.selectedMonthButton]}
            onPress={() => setSelectedMonth(month)}
          >
            <Text style={styles.monthButtonText}>{month}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Log Weight Section */}
      <View style={styles.logWeightContainer}>
        <Text style={styles.sectionTitle}>Log Your Weight</Text>
        <TextInput
          style={styles.weightInput}
          placeholder="Enter weight (lbs)"
          placeholderTextColor="#888"
          value={currentWeight}
          onChangeText={setCurrentWeight}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.logButton} onPress={logWeight}>
          <Text style={styles.logButtonText}>Log Weight</Text>
        </TouchableOpacity>
      </View>

      {/* Add Photo Section */}
      <View style={styles.photoContainer}>
        <Text style={styles.sectionTitle}>Add Progress Photo</Text>
        <TouchableOpacity style={styles.addPhotoButton} onPress={addPhoto}>
          <Text style={styles.addPhotoButtonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Display Weight Logs */}
      <View style={styles.logsContainer}>
        <Text style={styles.sectionTitle}>Weight Logs for {selectedMonth}</Text>
        {weightLogs[selectedMonth] && weightLogs[selectedMonth].length > 0 ? (
          weightLogs[selectedMonth].map((log, index) => (
            <Text key={index} style={styles.logText}>
              {log.date}: {log.weight} lbs
            </Text>
          ))
        ) : (
          <Text style={styles.noDataText}>No weight logs for {selectedMonth}.</Text>
        )}
      </View>

      {/* Display Photos */}
      <View style={styles.photosContainer}>
        <Text style={styles.sectionTitle}>Photos for {selectedMonth}</Text>
        {photos[selectedMonth] && photos[selectedMonth].length > 0 ? (
          photos[selectedMonth].map((photo, index) => (
            <Image key={index} source={{ uri: photo.uri }} style={styles.photo} />
          ))
        ) : (
          <Text style={styles.noDataText}>No photos for {selectedMonth}.</Text>
        )}
      </View>
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
  monthSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  monthButton: {
    padding: 8,
    margin: 4,
    borderRadius: 5,
    backgroundColor: '#1E1E1E',
  },
  selectedMonthButton: {
    backgroundColor: '#FF8C00',
  },
  monthButtonText: {
    color: '#FFFFFF',
  },
  logWeightContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FF8C00',
    marginBottom: 10,
  },
  weightInput: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'center',
  },
  logButton: {
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logButtonText: {
    color: '#FFFFFF',
  },
  photoContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  addPhotoButton: {
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 5,
  },
  addPhotoButtonText: {
    color: '#FFFFFF',
  },
  logsContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  logText: {
    color: '#FFFFFF',
    marginVertical: 2,
  },
  noDataText: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  photosContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
});

export default ProgressScreen;
