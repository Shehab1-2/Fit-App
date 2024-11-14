// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Ensure NavigationContainer is imported
import { AuthProvider } from './app/screens/AuthContext';
import Index from './app/index';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Index />
      </NavigationContainer>
    </AuthProvider>
  );
}
