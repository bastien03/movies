import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import IndexComponent from './pages/index/IndexContainer';
import LoginComponent from './components/login/LoginContainer';
import InsertMovieComponent from './pages/insert/InsertMovieContainer';
import EditMovieComponent from './pages/edit/EditMovieContainer';
import uris from '../uris';

module.exports = (
  <Route path={'/'} component={App}>
    <IndexRoute component={IndexComponent} />
    <Route path={uris.moviesPage()} component={IndexComponent} />
    <Route path={uris.loginPage()} component={LoginComponent} />
    <Route path={uris.newMoviePage()} component={InsertMovieComponent} />
    <Route path={uris.editMoviePage(':id')} component={EditMovieComponent} />
  </Route>
);
