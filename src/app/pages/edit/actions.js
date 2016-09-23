import {
  editMovie as editMovieApi,
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

function saveCurrentMovieAction(id, movie) {
  return {
    API: {
      types: ['EDIT_MOVIE_REQUEST', 'EDIT_MOVIE_SUCCESS', 'EDIT_MOVIE_ERROR'],
      callAPI: () => editMovieApi(id, movie),
    },
  };
}

export function saveCurrentMovie(id, movie, router) {
  return dispatch => {
    dispatch(saveCurrentMovieAction(id, movie)).then(() => {
      router.push('/');
    });
  };
}
