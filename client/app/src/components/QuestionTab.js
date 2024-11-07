import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, StyleSheet } from 'react-native';
import SideNav from './SideNav'; // Assumes you have SideNav adapted for React Native

const QuestionTab = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        const prompt = `
        You are an AI assistant specializing exclusively in providing workout and fitness-related advice...
        `;

        try {
            const result = await fetch('http://localhost:5001/api/chatgpt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: `${prompt}\n${question}` }),
            });

            if (result.ok) {
                const data = await result.json();
                setResponse(data.response);
            } else {
                const errorData = await result.json();
                Alert.alert('Error', errorData.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Error fetching response:', error);
            Alert.alert('Error', 'An error occurred while fetching the response.');
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <SideNav /> {/* Replace with your actual SideNav component */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>Ask a Question</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Type your question here..."
                    placeholderTextColor="#B3B3B3"
                    multiline
                    numberOfLines={4}
                    value={question}
                    onChangeText={setQuestion}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                    {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Submit</Text>}
                </TouchableOpacity>
                {response ? (
                    <View style={styles.responseContainer}>
                        <Text style={styles.responseHeading}>Response:</Text>
                        <Text style={styles.responseText}>{response}</Text>
                    </View>
                ) : null}
            </ScrollView>
        </View>
    );
};

export default QuestionTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    content: {
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    textArea: {
        backgroundColor: '#1E1E1E',
        color: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
        textAlignVertical: 'top', // Ensures text aligns at the top
    },
    button: {
        backgroundColor: '#FF8C00',
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    responseContainer: {
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        padding: 15,
    },
    responseHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    responseText: {
        color: '#B3B3B3',
    },
});
