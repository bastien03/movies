import {
  loadMovie as loadMovieApi,
} from '../../api/movies';

export function fetchCurrentMovie(movieId) {
  return {
    API: {
      types: ['FETCH_MOVIE_REQUEST', 'FETCH_MOVIE_SUCCESS', 'FETCH_MOVIE_ERROR'],
      callAPI: () => loadMovieApi(movieId),
    },
  };
}
