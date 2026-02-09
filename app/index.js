import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '../components/Screen';
import Title from '../components/Title';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Title>Welcome to CineMax</Title>
        <AppText style={[styles.subtitle, { color: theme.textSecondary }]}>
          Your favorite movies, all in one place
        </AppText>
      </View>

      <View style={styles.content}>
        <AppText style={styles.description}>
          Discover the latest blockbusters, browse popular movies from around the world, and book your tickets easily.
        </AppText>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton 
          title="Popular Movies" 
          onPress={() => router.push('/api-movies')}
        />
        <AppButton 
          title="Book Tickets" 
          onPress={() => router.push('/form')}
          secondary
        />
        
        <View style={styles.themeToggle}>
          <ThemeToggle />
        </View>
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
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 20,
  },
  themeToggle: {
    marginTop: 10,
    alignItems: 'center',
  },
});