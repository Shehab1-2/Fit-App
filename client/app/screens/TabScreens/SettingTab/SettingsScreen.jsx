// SettingsScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {
  const router = useRouter(); // Using router from expo-router

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Log Out",
          onPress: () => {
            router.push("/screens/HomeScreen"); // Navigate to HomeScreen after logout
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Account Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.option} onPress={() => alert('Edit Profile')}>
          <Text style={styles.optionText}>Profile Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Change Password')}>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Privacy Settings')}>
          <Text style={styles.optionText}>Privacy Settings</Text>
        </TouchableOpacity>
        {/* Logout Option */}
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* App Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <TouchableOpacity style={styles.option} onPress={() => alert('Toggle Notifications')}>
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Choose Units')}>
          <Text style={styles.optionText}>Units & Measurements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Change Theme')}>
          <Text style={styles.optionText}>Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Select Language')}>
          <Text style={styles.optionText}>Language</Text>
        </TouchableOpacity>
      </View>

      {/* Fitness Goals Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fitness Goals</Text>
        <TouchableOpacity style={styles.option} onPress={() => alert('Set Daily Goals')}>
          <Text style={styles.optionText}>Daily Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Set Weight Goal')}>
          <Text style={styles.optionText}>Weight Goal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Workout Preferences')}>
          <Text style={styles.optionText}>Workout Preferences</Text>
        </TouchableOpacity>
      </View>

      {/* Subscription & Billing Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription & Billing</Text>
        <TouchableOpacity style={styles.option} onPress={() => alert('Manage Subscription')}>
          <Text style={styles.optionText}>Subscription Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Update Billing Info')}>
          <Text style={styles.optionText}>Billing Information</Text>
        </TouchableOpacity>
      </View>

      {/* Data & Security Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data & Security</Text>
        <TouchableOpacity style={styles.option} onPress={() => alert('Export Data')}>
          <Text style={styles.optionText}>Export Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Delete Account')}>
          <Text style={styles.optionText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Security Options')}>
          <Text style={styles.optionText}>Security Options</Text>
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.option} onPress={() => alert('Help Center')}>
          <Text style={styles.optionText}>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Contact Support')}>
          <Text style={styles.optionText}>Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('About the App')}>
          <Text style={styles.optionText}>About the App</Text>
        </TouchableOpacity>
      </View>

      {/* Connected Apps & Devices Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connected Apps & Devices</Text>
        <TouchableOpacity style={styles.option} onPress={() => alert('Sync with Health Apps')}>
          <Text style={styles.optionText}>Sync with Health Apps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => alert('Connect Wearable Device')}>
          <Text style={styles.optionText}>Wearable Device Connection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
    color: '#555',
  },
});

export default SettingsScreen;
