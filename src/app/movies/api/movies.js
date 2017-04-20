import fetch from 'isomorphic-fetch';
import uris from '../../../uris';

const headers = new Headers({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

export function loadMovies() {
  const request = new Request(
    uris.getAllMoviesApi(),
    {
      method: 'GET',
      headers,
    },
  );

  return fetch(request)
    .then(response => response.json())
    .catch(error => error.json());
}

export function loadMoviesWithMissingTitles() {
  const request = new Request(
    `${uris.getAllMoviesApi()}?filter=MISSING_TITLE`,
    {
      method: 'GET',
      headers,
    },
  );

  return fetch(request)
    .then(response => response.json())
    .catch(error => error.json());
}

export function loadMoviesWithMissingCountry() {
  const request = new Request(
    `${uris.getAllMoviesApi()}?filter=MISSING_COUNTRY`,
    {
      method: 'GET',
      headers,
    },
  );

  return fetch(request)
    .then(response => response.json())
    .catch(error => error.json());
}

export function loadMovie(movieId) {
  const request = new Request(
    uris.getMovieApi(movieId),
    {
      method: 'GET',
      headers,
    },
  );

  return fetch(request)
    .then(response => response.json())
    .catch(error => error.json());
}

export function addMovie(movie) {
  const request = new Request(
    uris.addMovieApi(),
    {
      method: 'POST',
      headers,
      body: JSON.stringify(movie),
      credentials: 'same-origin',
    },
  );

  return fetch(request)
    .then(response => response.json())
    .catch(error => error.json());
}

export function editMovie(id, movie) {
  const request = new Request(
    uris.editMovieApi(id),
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(movie),
      credentials: 'same-origin',
    },
  );

  return fetch(request)
    .then(response => response.json())
    .catch(error => error.json());
}

export function patchMovie(id, patch) {
  const request = new Request(
    uris.editMovieApi(id),
    {
      method: 'PATCH',
      headers,
      body: JSON.stringify(patch),
      credentials: 'same-origin',
    },
  );

  return fetch(request)
    .then(response => response.json())
    .catch(error => error.json());
}

export function removeMovie(id) {
  const request = new Request(
    uris.deleteMovieApi(id),
    {
      method: 'DELETE',
      headers,
      credentials: 'same-origin',
    },
  );

  return fetch(request)
    .catch(error => error.text());
}

export function statistics() {
  const request = new Request(
    uris.statisticsApi(),
    {
      method: 'GET',
      headers,
    },
  );

  return fetch(request)
    .then(response => response.json())
    .catch(error => error.json());
}
