import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { getMovieById } from '../../features/movies/movies.logic';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const movie = getMovieById(parseInt(id));

  if (!movie) {
    return (
      <Screen style={styles.container}>
        <View style={styles.errorContainer}>
          <Title>Movie Not Found</Title>
          <AppText style={styles.errorText}>
            Sorry, we couldn't find this movie.
          </AppText>
          <AppButton title="Go Back" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>{movie.title}</Title>
        
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <AppText style={styles.label}>Genre:</AppText>
            <AppText style={styles.value}>{movie.genre}</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.label}>Director:</AppText>
            <AppText style={styles.value}>{movie.director}</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.label}>Duration:</AppText>
            <AppText style={styles.value}>{movie.duration}</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.label}>Rating:</AppText>
            <AppText style={styles.value}>⭐ {movie.rating}/10</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.label}>Year:</AppText>
            <AppText style={styles.value}>{movie.year}</AppText>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <AppText style={styles.descriptionLabel}>Synopsis:</AppText>
          <AppText style={styles.description}>{movie.description}</AppText>
        </View>

        <AppButton
          title="Book Tickets"
          onPress={() => router.push('/form')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#1a1a2e',
  },
  descriptionSection: {
    flex: 1,
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a2e',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});