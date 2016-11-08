import {
  addMovie, getMovie, getAllMovies, deleteMovie, editMovie,
} from '../services/MoviesService.js';
import { error } from './ErrorHandler';

const notAuthenticated = res => res.status(401).send('You have to be authenticated.');

export function addMovieRequest(req, res) {
  if (!req.user) {
    return notAuthenticated(res);
  }

  return addMovie(req.body)
    .then(movie => res.status(201).send(movie))
    .catch(err => error(res, err));
}

export function getMovieRequest(req, res) {
  getMovie(req.params.id)
    .then(movie => res.status(200).send(movie))
    .catch(err => error(res, err));
}

export function getAllMoviesRequest(req, res) {
  getAllMovies()
    .then(movies => res.status(200).send(movies))
    .catch(err => error(res, err));
}

export function deleteMovieRequest(req, res) {
  if (!req.user) {
    return notAuthenticated(res);
  }
  return deleteMovie(req.params.id)
    .then(() => res.status(204).send())
    .catch(err => error(res, err));
}

export function editMovieRequest(req, res) {
  if (!req.user) {
    return notAuthenticated(res);
  }

  return editMovie(req.params.id, req.body)
    .then(movie => res.status(200).send(movie))
    .catch(err => error(res, err));
}
