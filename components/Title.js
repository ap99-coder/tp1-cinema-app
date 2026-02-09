import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function Title({ children, style }) {
  const { theme } = useTheme();
  
  return (
    <Text style={[styles.title, { color: theme.text }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});