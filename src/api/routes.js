import {
  addMovieRequest, getMovieRequest, getAllMoviesRequest,
  editMovieRequest, deleteMovieRequest } from './http/MoviesController';
import { loginRequest, logoutRequest } from './http/SessionController';
import uris from '../uris';

export function initRoute(app) {
  // movies
  app.get(uris.getAllMoviesApi(), getAllMoviesRequest);
  app.post(uris.addMovieApi(), addMovieRequest);
  app.get(uris.getMovieApi(':id'), getMovieRequest);
  app.delete(uris.deleteMovieApi(':id'), deleteMovieRequest);
  app.put(uris.editMovieApi(':id'), editMovieRequest);

  // session
  app.post(uris.loginApi(), loginRequest);
  app.delete(uris.logoutApi(), logoutRequest);
}
