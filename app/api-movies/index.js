import { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { useTheme } from '../../contexts/ThemeContext';
import { fetchPopularMovies, getImageUrl } from '../../features/api/movieApi';

export default function ApiMoviesListScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPopularMovies();
      setMovies(data);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
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
          <AppText style={styles.loadingText}>Loading popular movies...</AppText>
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen style={styles.container}>
        <View style={styles.centerContainer}>
          <AppText style={[styles.errorText, { color: theme.error }]}>{error}</AppText>
          <AppButton title="Retry" onPress={loadMovies} />
        </View>
      </Screen>
    );
  }

  const renderMovie = ({ item }) => {
    const imageUrl = getImageUrl(item.poster_path);
    
    return (
      <TouchableOpacity
        style={[styles.movieCard, { backgroundColor: theme.card }]}
        onPress={() => router.push(`/api-movies/${item.id}`)}
      >
        {imageUrl && (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.poster}
            resizeMode="cover"
          />
        )}
        <View style={styles.movieInfo}>
          <AppText style={styles.movieTitle}>{item.title}</AppText>
          <AppText style={[styles.movieDate, { color: theme.textSecondary }]}>
            {item.release_date}
          </AppText>
          <AppText style={[styles.movieRating, { color: theme.primary }]}>
            ⭐ {item.vote_average.toFixed(1)}/10
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen style={styles.container}>
      <Title style={styles.header}>Popular Movies</Title>
      <AppText style={[styles.subtitle, { color: theme.textSecondary }]}>
        From The Movie Database (TMDB)
      </AppText>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 5,
  },
  subtitle: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontSize: 14,
  },
  list: {
    padding: 20,
    paddingTop: 10,
  },
  movieCard: {
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  poster: {
    width: 100,
    height: 150,
  },
  movieInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    gap: 8,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieDate: {
    fontSize: 14,
  },
  movieRating: {
    fontSize: 16,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  loadingText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});