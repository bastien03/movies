import fetch from 'isomorphic-fetch';
import uris from '../../uris';

export function loadMovies() {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  const request = new Request(
    uris.getAllMoviesApi(),
    {
      method: 'GET',
      headers,
    }
  );

  return fetch(request)
    .then(response => response.json())
    .catch(error => error.json());
}

export function addMovie(movie) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  const request = new Request(
    uris.addMovieApi(),
    {
      method: 'POST',
      headers,
      body: JSON.stringify(movie),
    }
  );

  return fetch(request)
    .then(response => response.json())
    .catch(error => error.json());
}
