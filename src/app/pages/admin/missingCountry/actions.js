import {
  loadMoviesWithMissingCountry as loadMoviesApi,
  patchMovie as patchMovieApi,
} from '../../../api/movies';

export const fetchMovies = () => loadMoviesApi();
export const patchMovieCountry = (id, country) => patchMovieApi(id, { country });
