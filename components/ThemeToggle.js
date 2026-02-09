import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: theme.card, borderColor: theme.border }]} 
      onPress={toggleTheme}
    >
      <Text style={[styles.text, { color: theme.text }]}>
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});