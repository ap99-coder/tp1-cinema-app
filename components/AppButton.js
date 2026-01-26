import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AppButton({ title, onPress, disabled, secondary }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        secondary && styles.secondaryButton,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, secondary && styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e74c3c',
  },
  disabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#e74c3c',
  },
});