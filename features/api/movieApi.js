import axios from 'axios';
import { z } from 'zod';

const API_KEY = '1bfdbff05c2698dc917dd28c08d41096';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  release_date: z.string(),
  genre_ids: z.array(z.number()).optional(),
});

const MoviesResponseSchema = z.object({
  results: z.array(MovieSchema),
  page: z.number(),
  total_pages: z.number(),
});

export async function fetchPopularMovies() {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });

    const validation = MoviesResponseSchema.safeParse(response.data);

    if (!validation.success) {
      console.error('Validation error:', validation.error);
      throw new Error('Invalid data format from API');
    }

    return validation.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export async function fetchMovieDetails(movieId) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });

    const DetailedMovieSchema = MovieSchema.extend({
      runtime: z.number().nullable(),
      genres: z.array(z.object({
        id: z.number(),
        name: z.string(),
      })),
      tagline: z.string().nullable(),
    });

    const validation = DetailedMovieSchema.safeParse(response.data);

    if (!validation.success) {
      console.error('Validation error:', validation.error);
      throw new Error('Invalid movie details format');
    }

    return validation.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

export function getImageUrl(path, size = 'w500') {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}