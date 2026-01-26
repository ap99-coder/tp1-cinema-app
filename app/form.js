import { View, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import Screen from '../components/Screen';
import Title from '../components/Title';
import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

export default function FormScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    if (name.trim().length < 2) {
      setErrorMessage('Name must be at least 2 characters');
      return false;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      Alert.alert('Success', `Booking confirmed for ${name}!`);
      setName('');
      setEmail('');
      setErrorMessage('');
    }
  };

  const canSubmit = name.trim().length >= 2 && validateEmail(email);

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Title>Book Your Tickets</Title>
        <AppText style={styles.subtitle}>
          Fill in your details to reserve seats
        </AppText>
      </View>

      <View style={styles.form}>
        <AppInput
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <AppInput
          label="Email Address"
          placeholder="example@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {errorMessage ? (
          <AppText style={styles.error}>{errorMessage}</AppText>
        ) : null}

        <AppButton
          title="Confirm Booking"
          onPress={handleSubmit}
          disabled={!canSubmit}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    color: '#666',
  },
  form: {
    gap: 20,
  },
  error: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: -10,
  },
});