import {
  editMovie as editMovieApi,
  loadMovie as loadMovieApi,
} from '../../api/movies';

export const fetchCurrentMovie = movieId => loadMovieApi(movieId);
export const saveCurrentMovie = (id, movie, router) => {
  editMovieApi(id, movie).then(() => {
    router.push('/');
  });
};
