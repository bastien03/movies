import request from 'superagent';
import uris from '../../uris';

export const loadMovies = (movies) => ({
  type: 'LOAD_MOVIES',
  data: movies,
});

export const loadUser = (user) => ({
  type: 'USER',
  data: user,
});

export const loadCurrentMovie = (currentMovie) => ({
  type: 'LOAD_MOVIE',
  data: currentMovie,
});

export const requestCurrentMovie = (movieId) => ({
  type: 'REQUEST_CURRENT_MOVIE',
  movieId,
});

export const receiveCurrentMovie = (movieId, json) => ({
  type: 'RECEIVE_CURRENT_MOVIE',
  movieId,
  movie: json,
  receivedAt: Date.now(),
});

export const movieAdded = (movie) => ({
  type: 'MOVIE_ADDED',
  movie,
});

export const userLoggedIn = (user) => ({
  type: 'USER_LOGGED_IN',
  user,
});

export function fetchCurrentMovie(movieId) {
  return (dispatch) => {
    dispatch(requestCurrentMovie(movieId));
    return request
      .get(uris.getMovieApi(movieId))
      .set('Accept', 'application/json')
      .end((err, res) => {
        const currentMovie = JSON.parse(res.text);
        dispatch(receiveCurrentMovie(movieId, currentMovie));
      });
  };
}

export function addMovie(movie) {
  return (dispatch) => request
      .post(uris.addMovieApi())
      .set('Accept', 'application/json')
      .send(movie)
      .end((err, res) => {
        const addedMovie = JSON.parse(res.text);
        dispatch(movieAdded(addedMovie));
      });
}

export function login(credentials) {
  return (dispatch) => request
      .post(uris.loginApi())
      .set('Accept', 'application/json')
      .send(credentials)
      .end((err, res) => {
        const user = JSON.parse(res.text);
        dispatch(userLoggedIn(user));
      });
}
