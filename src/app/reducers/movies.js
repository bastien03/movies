function reducer(state = {
  all: [],
  directors: [],
}, action) {
  if (action.type === 'LOAD_MOVIES') {
    return {
      all: action.data.movies,
      directors: action.data.directors,
    };
  } else if (action.type === 'LOAD_MOVIE') {
    return {
      all: state.all,
      directors: state.directors,
      movie: action.data,
    };
  } else if (action.type === 'REQUEST_CURRENT_MOVIE') {
    return Object.assign({}, state, {
      isFetching: true,
    });
  } else if (action.type === 'RECEIVE_CURRENT_MOVIE') {
    return Object.assign({}, state, {
      isFetching: false,
      movie: action.movie,
    });
  } else if (action.type === 'MOVIE_ADDED') {
    return Object.assign({}, state, {
      all: [
        ...state.all,
        action.movie,
      ],
    });
  }

  return state;
}

export default reducer;

export function getDirectorMovies(state, director) {
  const directorMovies = state.movies.all.filter(
    (movie) => movie.director === director
  );
  return directorMovies;
}
