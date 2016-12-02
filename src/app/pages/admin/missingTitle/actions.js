import {
  loadMoviesWithMissingTitles as loadMoviesApi,
  editMovie as editMovieApi,
} from '../../../api/movies';

export const fetchMovies = () => loadMoviesApi();
export const saveMovie = (id, movie) => editMovieApi(id, movie);
