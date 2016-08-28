function reducer(state = {
  all: [],
  directors: [],
}, action) {
  if (action.type === 'LOAD_MOVIES') {
    return {
      all: action.data.movies,
      directors: action.data.directors,
    };
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
  } else if (action.type === 'MOVIE_REMOVED') {
    return Object.assign({}, state, {
      all: state.all.filter((movie) => movie.id !== action.movieId),
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
