import { login as loginApi } from '../../api/auth';

export function login(credentials) {
  return {
    API: {
      types: ['LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_ERROR'],
      callAPI: () => loginApi(credentials),
    },
  };
}
