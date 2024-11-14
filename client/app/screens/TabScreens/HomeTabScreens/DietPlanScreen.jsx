import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const DietPlanScreen = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);

  // Function to handle user input and GPT response
  const handleSendMessage = () => {
    if (userInput) {
      const newChatEntry = { sender: 'User', message: userInput };
      const updatedChat = [...chatHistory, newChatEntry];
      setChatHistory(updatedChat);
      setUserInput('');

      // Simulate GPT response (Replace this with actual GPT API call)
      const gptResponse = { sender: 'GPT', message: 'Simulated GPT response based on user input.' };
      setChatHistory([...updatedChat, gptResponse]);
    }
  };

  // Function to trigger diet plan generation
  const handleGeneratePlan = () => {
    const generatedPlan = {
      // Simulated diet plan structure
      meals: {
        Breakfast: ['Oatmeal', 'Banana', 'Almonds'],
        Lunch: ['Grilled chicken', 'Quinoa', 'Salad'],
        Dinner: ['Salmon', 'Steamed broccoli', 'Sweet potatoes'],
        Snacks: ['Greek yogurt', 'Mixed nuts', 'Apple']
      },
      overview: 'This is a customized diet plan based on your goals and dietary preferences.',
    };
    setDietPlan(generatedPlan);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chat with GPT Nutrition Coach</Text>

      {/* Chat Interface */}
      <View style={styles.chatContainer}>
        {chatHistory.map((chat, index) => (
          <View key={index} style={[styles.chatBubble, chat.sender === 'User' ? styles.userBubble : styles.gptBubble]}>
            <Text style={styles.chatText}>{chat.message}</Text>
          </View>
        ))}
      </View>

      {/* Input Field for Chat */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask the GPT nutrition coach..."
          placeholderTextColor="#888"
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Generate Plan Button */}
      {!isReady && (
        <TouchableOpacity style={styles.readyButton} onPress={() => setIsReady(true)}>
          <Text style={styles.readyButtonText}>Ready to Create Plan</Text>
        </TouchableOpacity>
      )}

      {/* Display Generated Diet Plan */}
      {isReady && dietPlan ? (
        <View style={styles.planContainer}>
          <Text style={styles.planTitle}>Your Diet Plan</Text>
          {Object.entries(dietPlan.meals).map(([meal, items], index) => (
            <Text key={index} style={styles.planText}>{meal}: {items.join(', ')}</Text>
          ))}
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Plan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        isReady && (
          <TouchableOpacity style={styles.generateButton} onPress={handleGeneratePlan}>
            <Text style={styles.generateButtonText}>Generate Plan</Text>
          </TouchableOpacity>
        )
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
  chatContainer: {
    maxHeight: 400,
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginVertical: 10,
  },
  chatBubble: {
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
  userBubble: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
  },
  gptBubble: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
  },
  chatText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    borderRadius: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#FFFFFF',
  },
  readyButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  readyButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  planContainer: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  planTitle: {
    fontSize: 20,
    color: '#FF8C00',
    marginBottom: 10,
  },
  planText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginVertical: 2,
  },
  editButton: {
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
  },
  generateButton: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  generateButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default DietPlanScreen;
