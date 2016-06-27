function reducer(state = {}, action) {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return {
        isAuthenticated: action.user,
      };
    default:
      return state;
  }
}

export default reducer;
