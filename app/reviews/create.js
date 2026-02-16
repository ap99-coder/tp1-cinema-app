import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import AppText from '../../components/AppText';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { useTheme } from '../../contexts/ThemeContext';
import { createReview } from '../../features/api/reviewsApi';

export default function CreateReviewScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { prefill_title } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    movie_title: '',
    reviewer_name: '',
    rating: '',
    comment: '',
  });

  
  useEffect(() => {
    if (prefill_title) {
      setForm(prev => ({ ...prev, movie_title: prefill_title }));
    }
  }, [prefill_title]);

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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      await createReview({
        movie_title: form.movie_title.trim(),
        reviewer_name: form.reviewer_name.trim(),
        rating: parseInt(form.rating),
        comment: form.comment.trim(),
      });

      setSuccess(true);
      router.push('/reviews');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Title>Add Review</Title>

        {success ? (
          <AppText style={{ color: 'green', fontSize: 16 }}>
            ✅ Review submitted successfully!
          </AppText>
        ) : null}

        <View style={styles.form}>
          <AppInput
            label="Movie Title"
            placeholder="Enter movie title"
            value={form.movie_title}
            onChangeText={v => updateField('movie_title', v)}
          />
          <AppInput
            label="Your Name"
            placeholder="Your name (min 2 characters)"
            value={form.reviewer_name}
            onChangeText={v => updateField('reviewer_name', v)}
          />
          <AppInput
            label="Rating (1-10)"
            placeholder="Enter a number between 1 and 10"
            value={form.rating}
            onChangeText={v => updateField('rating', v)}
            keyboardType="numeric"
          />
          <AppInput
            label="Comment"
            placeholder="Write your review (min 5 characters)"
            value={form.comment}
            onChangeText={v => updateField('comment', v)}
          />

          {error ? (
            <AppText style={[styles.error, { color: theme.error }]}>
              ❌ {error}
            </AppText>
          ) : null}

          <AppButton
            title={loading ? 'Saving...' : 'Submit Review'}
            onPress={handleSubmit}
            disabled={!isValid() || loading}
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
});