import fetch from 'isomorphic-fetch';
import uris from '../../uris';

const headers = new Headers({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

export function login(credentials) {
  const body = credentials ? JSON.stringify(credentials) : undefined;
  const request = new Request(
    uris.loginApi(),
    {
      method: 'POST',
      headers,
      body,
      credentials: 'same-origin',
    }
  );

  return fetch(request)
    .then(response => response.json())
    .catch(error => error.json());
}

export function logout() {
  const request = new Request(
    uris.logoutApi(),
    {
      method: 'DELETE',
      headers,
      credentials: 'same-origin',
    }
  );

  return fetch(request)
    .catch(error => error.json());
}
