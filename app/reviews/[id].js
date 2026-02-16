import { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { useTheme } from '../../contexts/ThemeContext';
import { getReviewById } from '../../features/api/reviewsApi';

export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReview();
  }, [id]);

  const loadReview = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getReviewById(parseInt(id));
      setReview(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Screen style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      </Screen>
    );
  }

  if (error || !review) {
    return (
      <Screen style={styles.container}>
        <View style={styles.center}>
          <AppText style={{ color: theme.error }}>{error || 'Review not found'}</AppText>
          <AppButton title="Go Back" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <Title>{review.movie_title}</Title>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.row}>
            <AppText style={styles.label}>Reviewer:</AppText>
            <AppText>{review.reviewer_name}</AppText>
          </View>
          <View style={styles.row}>
            <AppText style={styles.label}>Rating:</AppText>
            <AppText style={{ color: theme.primary }}>⭐ {review.rating}/10</AppText>
          </View>
          <View style={styles.row}>
            <AppText style={styles.label}>Date:</AppText>
            <AppText style={{ color: theme.textSecondary }}>
              {new Date(review.created_at).toLocaleDateString()}
            </AppText>
          </View>
        </View>

        <View style={styles.commentSection}>
          <AppText style={styles.label}>Review:</AppText>
          <AppText style={styles.comment}>{review.comment}</AppText>
        </View>

        <AppButton
          title="✏️ Edit Review"
          onPress={() => router.push(`/reviews/edit/${review.id}`)}
        />
        <AppButton
          title="← Back to Reviews"
          onPress={() => router.back()}
          secondary
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20, gap: 20 },
  card: { borderRadius: 12, padding: 16, gap: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontWeight: '600', fontSize: 16 },
  commentSection: { gap: 8 },
  comment: { fontSize: 16, lineHeight: 24 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 20,
  },
});