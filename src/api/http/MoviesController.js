import {
  addMovie, getMovie, getMovies, deleteMovie, editMovie,
} from '../services/MoviesService.js';
import uris from '../../uris';

function notAuthenticated(res) {
  return res.status(401).send('You have to be authenticated to perform this request.');
}

export function addMovieRequest(req, res) {
  if (!req.user) {
    return notAuthenticated(res);
  }

  return addMovie(req.body, (movie) => res.status(201).send(movie));
}

export function getMovieRequest(req, res) {
  if (!req.user) {
    return notAuthenticated(res);
  }

  return getMovie(req.params.id, (movie) => res.status(200).send(movie));
}

export function getAllMoviesRequest(req, res) {
  return getMovies(null, (movies) => res.status(200).send(movies));
}

export function deleteMovieRequest(req, res) {
  if (!req.user) {
    return notAuthenticated(res);
  }
  deleteMovie(req.params.id);
  return res.status(200).send();
}

export function editMovieRequest(req, res) {
  if (!req.user) {
    return notAuthenticated(res);
  }
  editMovie(req.params.id, req.body);
  return res.redirect(uris.indexPage());
}
