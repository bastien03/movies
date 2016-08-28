import {
  removeMovie as removeMovieApi,
} from '../../api/movies';

const movieRemoved = (movieId) => ({
  type: 'MOVIE_REMOVED',
  movieId,
});

export function removeCurrentMovie(movieId) {
  return (dispatch) => {
    removeMovieApi(movieId).then(() => dispatch(movieRemoved(movieId)));
  };
}
