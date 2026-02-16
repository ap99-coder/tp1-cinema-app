import { z } from 'zod';
import { supabase } from './supabaseClient';

// Zod Schemas
export const ReviewSchema = z.object({
  id: z.number(),
  movie_title: z.string().min(1),
  reviewer_name: z.string().min(1),
  rating: z.number().min(1).max(10),
  comment: z.string().min(1),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ReviewsListSchema = z.array(ReviewSchema);

export const CreateReviewSchema = z.object({
  movie_title: z.string().min(1, 'Movie title is required'),
  reviewer_name: z.string().min(2, 'Name must be at least 2 characters'),
  rating: z.number().min(1).max(10),
  comment: z.string().min(5, 'Comment must be at least 5 characters'),
});

// GET all reviews
export async function getAllReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  const validation = ReviewsListSchema.safeParse(data);
  if (!validation.success) {
    console.error('Zod validation error:', validation.error);
    throw new Error('Invalid data format from database');
  }

  return validation.data;
}

// GET single review by id
export async function getReviewById(id) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  const validation = ReviewSchema.safeParse(data);
  if (!validation.success) {
    console.error('Zod validation error:', validation.error);
    throw new Error('Invalid review data');
  }

  return validation.data;
}

// POST - create new review
export async function createReview(reviewData) {
  const inputValidation = CreateReviewSchema.safeParse(reviewData);
  if (!inputValidation.success) {
    const msg = inputValidation.error.errors[0].message;
    throw new Error(msg);
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData])
    .select()
    .single();

  if (error) throw new Error(error.message);

  const validation = ReviewSchema.safeParse(data);
  if (!validation.success) throw new Error('Invalid response after creation');

  return validation.data;
}

// PUT - update existing review
export async function updateReview(id, reviewData) {
  const { data, error } = await supabase
    .from('reviews')
    .update({
      ...reviewData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  const validation = ReviewSchema.safeParse(data);
  if (!validation.success) throw new Error('Invalid response after update');

  return validation.data;
}

// DELETE - remove review
export async function deleteReview(id) {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);

  return true;
}