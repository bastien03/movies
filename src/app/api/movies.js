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

export function loadMovie(movieId) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  const request = new Request(
    uris.getMovieApi(movieId),
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
      credentials: 'same-origin',
    }
  );

  return fetch(request)
    // .then(response => response.json())
    .catch(error => error.text());
}


export function editMovie(id, movie) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  const request = new Request(
    uris.editMovieApi(id),
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(movie),
      credentials: 'same-origin',
    }
  );

  return fetch(request)
    // .then(response => response.json())
    .catch(error => error.text());
}
