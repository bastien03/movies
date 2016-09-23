import {
  removeMovie as removeMovieApi,
} from '../../api/movies';

export function removeCurrentMovie(movieId) {
  return {
    API: {
      types: ['REMOVE_MOVIE_REQUEST', 'REMOVE_MOVIE_SUCCESS', 'REMOVE_MOVIE_ERROR'],
      callAPI: () => removeMovieApi(movieId),
      payload: {
        movieId,
      },
    },
  };
}
