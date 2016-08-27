import {
  loadMovies as loadMoviesApi,
  loadMovie as loadMovieApi,
  addMovie as addMovieApi,
  editMovie as editMovieApi,
} from '../api/movies';
import { history } from '../AppHistory';

const getDirectors = (movies) => {
  const tmpDirectors = [];
  const directors = [];
  movies.map((movie) => {
    const director = movie.director;
    if (tmpDirectors[director]) {
      tmpDirectors[director] = tmpDirectors[director] + 1;
    } else {
      tmpDirectors[director] = 1;
    }
    return movie;
  });

  tmpDirectors.map((director) => {
    if (name === 'undefined') return director;

    directors.push({
      name,
      numberMovies: parseInt(tmpDirectors[name], 10),
    });
    return director;
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
