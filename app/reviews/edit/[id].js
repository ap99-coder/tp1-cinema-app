import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Screen from '../../../components/Screen';
import Title from '../../../components/Title';
import AppText from '../../../components/AppText';
import AppInput from '../../../components/AppInput';
import AppButton from '../../../components/AppButton';
import { useTheme } from '../../../contexts/ThemeContext';
import { getReviewById, updateReview } from '../../../features/api/reviewsApi';
import { set } from 'zod';

export default function EditReviewScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    movie_title: '',
    reviewer_name: '',
    rating: '',
    comment: '',
  });

  useEffect(() => {
    loadReview();
  }, [id]);

  const loadReview = async () => {
    try {
      setLoading(true);
      const data = await getReviewById(parseInt(id));
      setForm({
        movie_title: data.movie_title,
        reviewer_name: data.reviewer_name,
        rating: data.rating.toString(),
        comment: data.comment,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const isValid = () => {
    if (!form.movie_title.trim()) return false;
    if (form.reviewer_name.trim().length < 2) return false;
    const r = parseInt(form.rating);
    if (isNaN(r) || r < 1 || r > 10) return false;
    if (form.comment.trim().length < 5) return false;
    return true;
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      setError('');

      await updateReview(parseInt(id), {
        movie_title: form.movie_title.trim(),
        reviewer_name: form.reviewer_name.trim(),
        rating: parseInt(form.rating),
        comment: form.comment.trim(),
      });

      setsuccess(true);

      router.push('/reviews');

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Title>Edit Review</Title>

        <View style={styles.form}>
          <AppInput
            label="Movie Title"
            placeholder="Enter movie title"
            value={form.movie_title}
            onChangeText={v => updateField('movie_title', v)}
          />
          <AppInput
            label="Your Name"
            placeholder="Your name"
            value={form.reviewer_name}
            onChangeText={v => updateField('reviewer_name', v)}
          />
          <AppInput
            label="Rating (1-10)"
            placeholder="Enter rating 1-10"
            value={form.rating}
            onChangeText={v => updateField('rating', v)}
            keyboardType="numeric"
          />
          <AppInput
            label="Comment"
            placeholder="Write your review..."
            value={form.comment}
            onChangeText={v => updateField('comment', v)}
          />

          {error ? (
            <AppText style={[styles.error, { color: theme.error }]}>
              {error}
            </AppText>
          ) : null}

          <AppButton
            title={saving ? 'Saving...' : 'Update Review'}
            onPress={handleUpdate}
            disabled={!isValid() || saving}
          />
          <AppButton
            title="Cancel"
            onPress={() => router.back()}
            secondary
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 20 },
  form: { gap: 16 },
  error: { fontSize: 14 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});