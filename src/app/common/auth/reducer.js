function reducer(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        isAuthenticated: action.response,
      };
    default:
      return state;
  }
}

export default reducer;
