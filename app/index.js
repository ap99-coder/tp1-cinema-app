import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '../components/Screen';
import Title from '../components/Title';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Title>Welcome to CineMax</Title>
        <AppText style={styles.subtitle}>
          Find a movie, pick a time, and enjoy the show!
        </AppText>
      </View>

      <View style={styles.content}>
        <AppText style={styles.description}>
          Discover the latest blockbusters, book your tickets, and enjoy the ultimate cinema experience.
        </AppText>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton 
          title="Browse Movies" 
          onPress={() => router.push('/movies')}
        />
        <AppButton 
          title="Book Tickets" 
          onPress={() => router.push('/form')}
          secondary
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
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 20,
  },
});