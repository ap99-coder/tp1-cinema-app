import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function AppButton({ title, onPress, disabled, secondary }) {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: theme.primary },
        secondary && { 
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: theme.primary,
        },
        disabled && { 
          backgroundColor: theme.border,
          borderColor: theme.border,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        styles.text,
        secondary && { color: theme.primary },
        disabled && { color: theme.textSecondary },
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});