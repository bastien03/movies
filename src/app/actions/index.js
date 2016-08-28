import {
  loadMovies as loadMoviesApi,
  loadMovie as loadMovieApi,
  addMovie as addMovieApi,
  editMovie as editMovieApi,
  removeMovie as removeMovieApi,
} from '../api/movies';
import { history } from '../AppHistory';

const getDirectors = (movies) => {
  const obj = movies.reduce((param1, param2) => {
    let reduced = {};
    if (param1.director) {
      reduced[param1.director] = reduced[param1.director] ? reduced[param1.director] + 1 : 1;
    } else {
      reduced = param1;
    }
    reduced[param2.director] = reduced[param2.director] ? reduced[param2.director] + 1 : 1;
    return reduced;
  });
  const directors = [];

  Object.keys(obj).map((key) => {
    directors.push({
      name: key,
      numberMovies: obj[key],
    });
    return key;
  });

  return directors.sort((a, b) => b.numberMovies - a.numberMovies);
};


export const loadMovies = (movies) => ({
  type: 'LOAD_MOVIES',
  data: {
    movies,
    directors: getDirectors(movies),
  },
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

export const movieRemoved = (movieId) => ({
  type: 'MOVIE_REMOVED',
  movieId,
});

export function fetchMovies() {
  return (dispatch) => {
    loadMoviesApi().then(response => dispatch(loadMovies(response)));
  };
}

export function addMovie(movie) {
  return (dispatch) => {
    addMovieApi(movie).then(response => dispatch(movieAdded(response)));
  };
}

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

export function removeCurrentMovie(movieId) {
  return (dispatch) => {
    removeMovieApi(movieId).then(() => dispatch(movieRemoved(movieId)));
  };
}
