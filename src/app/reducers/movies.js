function reducer(state = {}, action) {
  if (action.type === 'LOAD_MOVIES') {
    return {
      movies: action.data.movies,
      directors: action.data.directors,
      links: action.data.links,
      config: state.config,
    };
  } else if (action.type === 'LOAD_MOVIE') {
    return {
      movies: state.movies,
      directors: state.directors,
      links: state.links,
      movie: action.data,
      config: state.config,
    };
  } else if (action.type === 'USER') {
    return {
      movies: state.movies,
      movie: state.movie,
      directors: state.directors,
      links: state.links,
      isAuthenticated: action.data,
      config: state.config,
    };
  } else if (action.type === 'REQUEST_CURRENT_MOVIE') {
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
      config: state.config,
    });
  } else if (action.type === 'RECEIVE_CURRENT_MOVIE') {
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      movie: action.movie,
      lastUpdated: action.receivedAt,
      config: state.config,
    });
  } else if (action.type === 'MOVIE_ADDED') {
    return Object.assign({}, state, {
      movies: [
        ...state.movies,
        action.movie,
      ],
    });
  } else if (action.type === 'USER_LOGGED_IN') {
    return Object.assign({}, state, {
      isAuthenticated: action.user,
    });
  }

  return state;
}

export default reducer;
