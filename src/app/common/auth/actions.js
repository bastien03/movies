import { login as loginApi } from '../../api/auth';

export const userLoggedIn = (user) => ({
  type: 'USER_LOGGED_IN',
  user,
});

export function login(credentials) {
  return (dispatch) => {
    loginApi(credentials).then(response => dispatch(userLoggedIn(response)));
  };
}
