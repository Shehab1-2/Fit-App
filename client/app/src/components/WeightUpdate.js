import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeightUpdate = ({ username }) => {
    const [weights, setWeights] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editForm, setEditForm] = useState({ weight: '', date: new Date() });
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        const fetchWeights = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/users/get-weights?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weights');
                }
                const data = await response.json();
                if (data && data.weights) {
                    setWeights(data.weights);
                } else {
                    console.log('No weight data found:', data);
                }
            } catch (error) {
                console.error('Error fetching weights:', error);
            }
        };
        fetchWeights();
    }, [username]);

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditForm({
            weight: weights[index].weight.toString(),
            date: new Date(weights[index].date),
        });
    };

    const handleSave = async (index) => {
        const updatedWeight = { ...weights[index], weight: editForm.weight, date: editForm.date.toISOString() };
        try {
            const response = await fetch(`http://localhost:5001/api/users/update-weight`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    weight: updatedWeight.weight,
                    date: updatedWeight.date
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update weight');
            }
            const updatedWeights = [...weights];
            updatedWeights[index] = updatedWeight;
            setWeights(updatedWeights);
            setEditIndex(-1);
        } catch (error) {
            console.error('Error updating weight:', error);
            Alert.alert('Error', 'Failed to update weight');
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setEditForm({ ...editForm, date: selectedDate });
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={weights}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.listItem}>
                        {editIndex === index ? (
                            <View style={styles.editContainer}>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={editForm.weight}
                                    onChangeText={(text) => setEditForm({ ...editForm, weight: text })}
                                />
                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <Text style={styles.dateText}>{editForm.date.toLocaleDateString()}</Text>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={editForm.date}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange}
                                    />
                                )}
                                <Button title="Save" onPress={() => handleSave(index)} />
                            </View>
                        ) : (
                            <View style={styles.viewContainer}>
                                <Text style={styles.dateText}>
                                    {new Date(item.date).toLocaleDateString()}: {item.weight} kg
                                </Text>
                                <Button title="Edit" onPress={() => handleEdit(index)} />
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

export default WeightUpdate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#121212',
    },
    listItem: {
        backgroundColor: '#444',
        borderRadius: 5,
        marginVertical: 8,
        padding: 10,
        justifyContent: 'space-between',
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        color: '#fff',
        padding: 8,
        borderRadius: 5,
        marginRight: 10,
    },
    dateText: {
        color: '#fff',
        padding: 8,
        backgroundColor: '#33354a',
        borderRadius: 5,
        marginRight: 10,
    }
});
