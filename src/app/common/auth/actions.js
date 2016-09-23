import {
  login as loginApi,
  logout as logoutApi,
} from '../../api/auth';

function loginAction(credentials) {
  return {
    API: {
      types: ['LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_ERROR'],
      callAPI: () => loginApi(credentials),
    },
  };
}

export function login(credentials, router, locationState) {
  return (dispatch) => {
    dispatch(loginAction(credentials)).then(() => {
      const path = locationState ? locationState.nextPathname : '/';
      router.push(path);
    });
  };
}

function logoutAction() {
  return {
    API: {
      types: ['LOGOUT_REQUEST', 'LOGOUT_SUCCESS', 'LOGOUT_ERROR'],
      callAPI: () => logoutApi(),
    },
  };
}

export function logout(router) {
  return dispatch => {
    dispatch(logoutAction()).then(() => {
      router.push('/');
    });
  };
}
