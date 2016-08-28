import {
  addMovie as addMovieApi,
} from '../../api/movies';

export const movieAdded = (movie) => ({
  type: 'MOVIE_ADDED',
  movie,
});

export function addMovie(movie) {
  return (dispatch) => {
    addMovieApi(movie).then(response => dispatch(movieAdded(response)));
  };
}
