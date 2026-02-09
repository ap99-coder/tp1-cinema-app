import { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const lightTheme = {
  background: '#f5f5f5',
  card: '#ffffff',
  text: '#1a1a2e',
  textSecondary: '#666',
  primary: '#e74c3c',
  border: '#ddd',
  error: '#e74c3c',
  headerBg: '#1a1a2e',
  headerText: '#fff',
  inputBg: '#fff',
  inputBorder: '#ddd',
  placeholder: '#999',
};

export const darkTheme = {
  background: '#1a1a2e',
  card: '#16213e',
  text: '#ffffff',
  textSecondary: '#aaa',
  primary: '#e74c3c',
  border: '#333',
  error: '#ff6b6b',
  headerBg: '#0f0f1e',
  headerText: '#fff',
  inputBg: '#16213e',
  inputBorder: '#333',
  placeholder: '#666',
};

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem('theme');
      if (saved !== null) {
        setIsDark(saved === 'dark');
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};