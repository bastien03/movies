import {
  addMovie as addMovieApi,
} from '../../api/movies';

function addMovieAction(movie) {
  return {
    API: {
      types: ['ADD_MOVIE_REQUEST', 'ADD_MOVIE_SUCCESS', 'ADD_MOVIE_ERROR'],
      callAPI: () => addMovieApi(movie),
    },
  };
}

export function addMovie(movie, router) {
  return dispatch => {
    dispatch(addMovieAction(movie)).then(() => {
      router.push('/');
    });
  };
}
