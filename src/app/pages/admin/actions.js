import {
  loadMoviesWithMissingTitles as loadMoviesApi,
} from '../../api/movies';

export const fetchMovies = () => loadMoviesApi();
