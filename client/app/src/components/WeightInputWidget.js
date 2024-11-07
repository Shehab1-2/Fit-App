import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeightInputWidget = () => {
    const [weight, setWeight] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (date) setSelectedDate(date);
    };

    const handleSubmit = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            if (!username) {
                Alert.alert('Error', 'Username not found. Please log in.');
                return;
            }

            const response = await fetch(`http://localhost:5001/api/users/update-weight`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, weight, date: selectedDate }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Weight updated successfully!');
            } else {
                throw new Error('Failed to update weight');
            }
        } catch (error) {
            console.error('Error updating weight:', error);
            Alert.alert('Error', 'Failed to update weight.');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter your weight:</Text>
            <TextInput
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                placeholder="Weight in lbs"
                style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 20,
                }}
            />
            <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <Button title="Update Weight" onPress={handleSubmit} />
        </View>
    );
};

export default WeightInputWidget;
