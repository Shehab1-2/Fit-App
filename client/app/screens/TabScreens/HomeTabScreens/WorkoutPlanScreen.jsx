import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const WorkoutPlanScreen = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isPlanReady, setIsPlanReady] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState({
    split: {
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
    },
  });
  const [calendar, setCalendar] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isChatVisible, setIsChatVisible] = useState(false);

  // Generate the days for the selected month and year
  const generateCalendarDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const calendarDays = Array.from({ length: daysInMonth }, (_, index) => ({
      day: index + 1,
      completed: false,
    }));
    return { days: calendarDays, firstDayOfMonth };
  };

  // Initialize calendar days for the selected month and year
  const { days: daysInMonth, firstDayOfMonth } = generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());

  // Update the month or year
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

  const toggleWorkoutLog = (day) => {
    setCalendar((prevCalendar) => ({
      ...prevCalendar,
      [`${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`]: !prevCalendar[`${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Workout Split & Calendar</Text>

      {/* Workout Split with Edit Option */}
      <View style={styles.splitContainer}>
        {Object.entries(workoutPlan.split).map(([day, workout], index) => (
          <View key={index} style={styles.splitRow}>
            <Text style={styles.dayText}>{day}:</Text>
            <TextInput
              style={styles.workoutInput}
              value={workout}
              placeholder="Add workout"
              placeholderTextColor="#888"
              onChangeText={(text) =>
                setWorkoutPlan((prevPlan) => ({
                  ...prevPlan,
                  split: { ...prevPlan.split, [day]: text },
                }))
              }
            />
          </View>
        ))}
      </View>

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

      {/* Calendar to Log Completed Workouts */}
      <View style={styles.calendarContainer}>
        <Text style={styles.sectionTitle}>Monthly Workout Log</Text>
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
              onPress={() => toggleWorkoutLog(day)}
            >
              <Text style={styles.calendarDayText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Chat with GPT Agent */}
      <TouchableOpacity style={styles.chatToggle} onPress={() => setIsChatVisible(!isChatVisible)}>
        <Text style={styles.chatToggleText}>{isChatVisible ? 'Hide Chat' : 'Talk to GPT'}</Text>
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
              placeholder="Ask about your fitness goals..."
              placeholderTextColor="#888"
              value={userInput}
              onChangeText={setUserInput}
            />
            <TouchableOpacity style={styles.sendButton} onPress={() => setChatHistory([...chatHistory, { sender: 'User', message: userInput }])}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Generate Workout Plan Button */}
      {!isPlanReady && (
        <TouchableOpacity style={styles.generateButton} onPress={() => setIsPlanReady(true)}>
          <Text style={styles.generateButtonText}>Generate Plan</Text>
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
    marginVertical: 10,
  },
  splitContainer: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  dayText: {
    color: '#FFFFFF',
    width: 100,
    fontSize: 16,
  },
  workoutInput: {
    flex: 1,
    backgroundColor: '#333',
    color: '#FFFFFF',
    padding: 8,
    borderRadius: 5,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  navText: {
    color: '#FF8C00',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  calendarContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FF8C00',
    marginBottom: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarDay: {
    width: '13%',
    aspectRatio: 1,
    marginVertical: 3,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  calendarDayEmpty: {
    width: '13%',
    aspectRatio: 1,
    marginVertical: 3,
  },
  calendarDayText: {
    color: '#FFFFFF',
  },
  completed: {
    backgroundColor: '#4CAF50',
  },
  chatToggle: {
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  chatToggleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  chatContainer: {
    maxHeight: 300,
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
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
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    color: '#FFFFFF',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#FFFFFF',
  },
  generateButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default WorkoutPlanScreen;
