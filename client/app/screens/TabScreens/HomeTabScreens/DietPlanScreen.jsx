import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const DietPlanScreen = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendar, setCalendar] = useState({});
  const [isChatVisible, setIsChatVisible] = useState(false);

  // Generate calendar days for selected month and year
  const generateCalendarDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const calendarDays = Array.from({ length: daysInMonth }, (_, index) => ({
      day: index + 1,
      completed: false,
    }));
    return { days: calendarDays, firstDayOfMonth };
  };

  const { days: daysInMonth, firstDayOfMonth } = generateCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  // Update month or year
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const changeYear = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + direction);
    setCurrentDate(newDate);
  };

  const toggleDietLog = (day) => {
    setCalendar((prevCalendar) => ({
      ...prevCalendar,
      [`${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`]: !prevCalendar[`${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`],
    }));
  };

  const handleSendMessage = () => {
    if (userInput) {
      const newChatEntry = { sender: 'User', message: userInput };
      const updatedChat = [...chatHistory, newChatEntry];
      setChatHistory(updatedChat);
      setUserInput('');

      const gptResponse = { sender: 'GPT', message: 'Simulated GPT response based on user input.' };
      setChatHistory([...updatedChat, gptResponse]);
    }
  };

  const handleGeneratePlan = () => {
    const generatedPlan = {
      meals: {
        Breakfast: ['Oatmeal', 'Banana', 'Almonds'],
        Lunch: ['Grilled chicken', 'Quinoa', 'Salad'],
        Dinner: ['Salmon', 'Steamed broccoli', 'Sweet potatoes'],
        Snacks: ['Greek yogurt', 'Mixed nuts', 'Apple'],
      },
      overview: 'This is a customized diet plan based on your goals and dietary preferences.',
    };
    setDietPlan(generatedPlan);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diet Plan & Calendar</Text>

      {/* Diet Plan */}
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

      {/* Month & Year Navigation */}
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={() => changeYear(-1)}>
          <Text style={styles.navText}>{'<<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.navText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.navText}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeYear(1)}>
          <Text style={styles.navText}>{'>>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Text style={styles.sectionTitle}>Monthly Diet Log</Text>
        <View style={styles.calendarGrid}>
          {[...Array(firstDayOfMonth)].map((_, index) => (
            <View key={`empty-${index}`} style={styles.calendarDayEmpty} />
          ))}
          {daysInMonth.map(({ day }) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.calendarDay,
                calendar[`${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`] && styles.completed,
              ]}
              onPress={() => toggleDietLog(day)}
            >
              <Text style={styles.calendarDayText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Chat with GPT */}
      <TouchableOpacity style={styles.chatToggle} onPress={() => setIsChatVisible(!isChatVisible)}>
        <Text style={styles.chatToggleText}>{isChatVisible ? 'Hide Chat' : 'Chat with GPT Nutrition Coach'}</Text>
      </TouchableOpacity>
      {isChatVisible && (
        <View style={styles.chatContainer}>
          {chatHistory.map((chat, index) => (
            <View key={index} style={[styles.chatBubble, chat.sender === 'User' ? styles.userBubble : styles.gptBubble]}>
              <Text style={styles.chatText}>{chat.message}</Text>
            </View>
          ))}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask about your diet..."
              placeholderTextColor="#888"
              value={userInput}
              onChangeText={setUserInput}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Generate Plan Button */}
      {!isReady && (
        <TouchableOpacity style={styles.readyButton} onPress={() => setIsReady(true)}>
          <Text style={styles.readyButtonText}>Ready to Create Plan</Text>
        </TouchableOpacity>
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
  calendarContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarDay: {
    width: '13%',
    padding: 8,
    marginVertical: 5,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
  },
  completed: {
    backgroundColor: '#4CAF50',
  },
  calendarDayText: {
    color: '#FFFFFF',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  navText: {
    fontSize: 16,
    color: '#FF8C00',
  },
  dateText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  chatToggle: {
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  chatToggleText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default DietPlanScreen;
