import {
  addMovie as addMovieApi,
} from '../../api/movies';

export function addMovie(movie) {
  return {
    API: {
      types: ['ADD_MOVIE_REQUEST', 'ADD_MOVIE_SUCCESS', 'ADD_MOVIE_ERROR'],
      callAPI: () => addMovieApi(movie),
    },
  };
}
