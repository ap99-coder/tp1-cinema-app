import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { useTheme } from '../../contexts/ThemeContext';
import { fetchMovieDetails, getImageUrl } from '../../features/api/movieApi';

export default function ApiMovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovieDetails();
  }, [id]);

  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMovieDetails(parseInt(id));
      setMovie(data);
    } catch (err) {
      setError('Failed to load movie details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Screen style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <AppText>Loading movie details...</AppText>
        </View>
      </Screen>
    );
  }

  if (error || !movie) {
    return (
      <Screen style={styles.container}>
        <View style={styles.centerContainer}>
          <AppText style={{ color: theme.error }}>{error || 'Movie not found'}</AppText>
          <AppButton title="Go Back" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  const imageUrl = getImageUrl(movie.backdrop_path || movie.poster_path, 'w780');

  return (
    <Screen>
      <ScrollView>
        {imageUrl && (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.backdrop}
            resizeMode="cover"
          />
        )}
        
        <View style={styles.content}>
          <Title style={styles.title}>{movie.title}</Title>
          
          {movie.tagline && (
            <AppText style={[styles.tagline, { color: theme.textSecondary }]}>
              "{movie.tagline}"
            </AppText>
          )}
          
          <View style={[styles.infoSection, { backgroundColor: theme.card }]}>
            <View style={styles.infoRow}>
              <AppText style={styles.label}>Rating:</AppText>
              <AppText style={{ color: theme.primary }}>
                ⭐ {movie.vote_average.toFixed(1)}/10
              </AppText>
            </View>

            <View style={styles.infoRow}>
              <AppText style={styles.label}>Release Date:</AppText>
              <AppText>{movie.release_date}</AppText>
            </View>

            {movie.runtime && (
              <View style={styles.infoRow}>
                <AppText style={styles.label}>Runtime:</AppText>
                <AppText>{movie.runtime} minutes</AppText>
              </View>
            )}

            <View style={styles.infoRow}>
              <AppText style={styles.label}>Genres:</AppText>
              <AppText>{movie.genres.map(g => g.name).join(', ')}</AppText>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <AppText style={styles.descriptionLabel}>Overview:</AppText>
            <AppText style={styles.description}>{movie.overview}</AppText>
          </View>

          <AppButton
            title="Book Tickets"
            onPress={() => router.push('/form')}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  infoSection: {
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
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
});