import { movies } from './movies.data';

export function getMovieById(id) {
  return movies.find(movie => movie.id === id);
}

export function getAllMovies() {
  return movies;
}

