import get from 'lodash/get';

function reducer(state = {
  all: [],
  directors: [],
}, action) {
  if (action.type === 'LOAD_MOVIES_SUCCESS') {
    return {
      all: action.response.movies,
      directors: action.response.directors,
    };
  } else if (action.type === 'FETCH_MOVIE_SUCCESS') {
    return Object.assign({}, state, {
      movie: action.response,
    });
  } else if (action.type === 'ADD_MOVIE_SUCCESS') {
    return Object.assign({}, state, {
      all: [
        ...state.all,
        action.response,
      ],
    });
  } else if (action.type === 'REMOVE_MOVIE_SUCCESS') {
    return Object.assign({}, state, {
      all: state.all.filter(movie => movie.id !== action.movieId),
    });
  }

  return state;
}

export default reducer;

export function getAllMovies(state) {
  return get(state, 'movies.all');
}

export function getAllDirectors(state) {
  return get(state, 'movies.directors');
}

export function getCurrentMovie(state) {
  return get(state, 'movies.movie');
}

export function getDirectorMovies(state, director) {
  const movies = getAllMovies(state);
  if (!movies) {
    return [];
  }
  const directorMovies = movies.filter(
    movie => movie.director === director,
  );
  return directorMovies;
}
