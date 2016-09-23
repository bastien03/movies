import { login as loginApi } from '../../api/auth';

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
