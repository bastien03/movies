import {
  editMovie as editMovieApi,
  loadMovie as loadMovieApi,
} from '../../api/movies';
import { history } from '../../AppHistory';

export const receiveCurrentMovie = (movieId, json) => ({
  type: 'RECEIVE_CURRENT_MOVIE',
  movieId,
  movie: json,
  receivedAt: Date.now(),
});

export function fetchCurrentMovie(movieId) {
  return (dispatch) => {
    loadMovieApi(movieId).then(response => dispatch(receiveCurrentMovie(movieId, response)));
  };
}

export function saveCurrentMovie(id, movie) {
  return () => {
    editMovieApi(id, movie).then(() => history().push('/'));
  };
}
