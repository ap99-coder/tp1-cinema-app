import { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { useTheme } from '../../contexts/ThemeContext';
import { getAllReviews, deleteReview } from '../../features/api/reviewsApi';

export default function ReviewsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Reload when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadReviews();
    }, [])
  );

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllReviews();
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

   const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteReview(id);
      // Update UI immediately after delete
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <Screen style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.primary} />
          <AppText>Loading reviews...</AppText>
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen style={styles.container}>
        <View style={styles.center}>
          <AppText style={{ color: theme.error }}>{error}</AppText>
          <AppButton title="Retry" onPress={loadReviews} />
        </View>
      </Screen>
    );
  }

  const renderReview = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <TouchableOpacity onPress={() => router.push(`/reviews/${item.id}`)}>
        <AppText style={styles.movieTitle}>{item.movie_title}</AppText>
        <AppText style={[styles.reviewer, { color: theme.textSecondary }]}>
          by {item.reviewer_name}
        </AppText>
        <AppText style={[styles.rating, { color: theme.primary }]}>
          ⭐ {item.rating}/10
        </AppText>
        <AppText numberOfLines={2} style={[styles.comment, { color: theme.textSecondary }]}>
          {item.comment}
        </AppText>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.editBtn, { borderColor: theme.primary }]}
          onPress={() => router.push(`/reviews/edit/${item.id}`)}
        >
          <AppText style={[styles.editText, { color: theme.primary }]}>✏️ Edit</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item.id, item.movie_title)}
        >
          <AppText style={styles.deleteText}>🗑️ Delete</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Title>Movie Reviews</Title>
        <AppButton
          title="+ Add Review"
          onPress={() => router.push('/reviews/create')}
        />
      </View>

      {reviews.length === 0 ? (
        <View style={styles.center}>
          <AppText>No reviews yet. Add one!</AppText>
        </View>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, gap: 15 },
  list: { padding: 20, paddingTop: 0 },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    gap: 8,
  },
  movieTitle: { fontSize: 18, fontWeight: 'bold' },
  reviewer: { fontSize: 14 },
  rating: { fontSize: 16, fontWeight: '600' },
  comment: { fontSize: 14, lineHeight: 20 },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  editBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  editText: { fontWeight: '600' },
  deleteBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
  },
  deleteText: { color: '#fff', fontWeight: '600' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 20,
  },
});