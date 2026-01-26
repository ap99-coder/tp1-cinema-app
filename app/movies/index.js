import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import AppText from '../../components/AppText';
import { movies } from '../../features/movies/movies.data';

export default function MoviesListScreen() {
  const router = useRouter();

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => router.push(`/movies/${item.id}`)}
    >
      <View style={styles.movieInfo}>
        <AppText style={styles.movieTitle}>{item.title}</AppText>
        <AppText style={styles.movieGenre}>{item.genre}</AppText>
        <AppText style={styles.movieRating}>⭐ {item.rating}/10</AppText>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen style={styles.container}>
      <Title style={styles.header}>Now Showing</Title>
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
    paddingBottom: 10,
  },
  list: {
    padding: 20,
    paddingTop: 10,
  },
  movieCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  movieInfo: {
    gap: 8,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  movieGenre: {
    fontSize: 14,
    color: '#666',
  },
  movieRating: {
    fontSize: 16,
    color: '#f39c12',
    fontWeight: '600',
  },
});