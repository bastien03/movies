import fetch from 'isomorphic-fetch';

import uris from '../../uris';

export function login(credentials) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  const body = credentials ? JSON.stringify(credentials) : undefined;
  const request = new Request(
    uris.loginApi(),
    {
      method: 'POST',
      headers,
      body,
    }
  );

  return fetch(request)
    .then(response => {
      console.log('login response', response);
      return response.json();
    })
    .catch(error => error.json());
}
