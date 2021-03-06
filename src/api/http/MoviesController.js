import {
  addMovie, getMovie, getMovies, statistics,
  deleteMovie, editMovie, patchMovie,
} from '../services/MoviesService';
import error from './ErrorHandler';
import asJson from './RequestHeader';

const notAuthenticated = res => res.status(401).send('You have to be authenticated.');

export function addMovieRequest(req, res) {
  if (!req.user) {
    return notAuthenticated(res);
  }

  return addMovie(req.body)
    .then(movie => asJson(res).status(201).send(movie))
    .catch(err => error(res, err));
}

export function getMovieRequest(req, res) {
  getMovie(req.params.id)
    .then(movie => asJson(res).status(200).send(movie))
    .catch(err => error(res, err));
}

export function getAllMoviesRequest(req, res) {
  const filter = req.query ? req.query.filter : undefined;
  getMovies(filter)
    .then(movies => asJson(res).status(200).send(movies))
    .catch(err => error(res, err));
}

export function statisticsRequest(req, res) {
  return statistics()
    .then(stats => asJson(res).status(200).send(stats))
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
    .then(movie => asJson(res).status(200).send(movie))
    .catch(err => error(res, err));
}

export function patchMovieRequest(req, res) {
  if (!req.user) {
    return notAuthenticated(res);
  }

  return patchMovie(req.params.id, req.body)
    .then(movie => asJson(res).status(200).send(movie))
    .catch(err => error(res, err));
}
