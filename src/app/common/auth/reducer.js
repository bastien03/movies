const initialState = {};
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        isAuthenticated: action.response,
      };
    case 'LOGOUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
}

export default reducer;
