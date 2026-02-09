import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function AppInput({ label, value, onChangeText, placeholder, keyboardType }) {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          { 
            backgroundColor: theme.inputBg,
            borderColor: theme.inputBorder,
            color: theme.text,
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={theme.placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
});