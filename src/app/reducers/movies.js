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
      isFetching: false,
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
      all: state.all.filter((movie) => movie.id !== action.response.movieId),
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
