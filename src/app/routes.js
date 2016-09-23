import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import IndexPage from './pages/index/IndexContainer';
import LoginComponent from './pages/login/LoginContainer';
import InsertMoviePage from './pages/insert/InsertMovieContainer';
import EditMoviePage from './pages/edit/EditMovieContainer';
import uris from '../uris';

export function routes() {
  return (dispatch, getState) => {
    const requireAuth = (nextState, replace) => {
      if (!getState().auth.isAuthenticated) {
        replace({
          pathname: uris.loginPage(),
          state: { nextPathname: nextState.location.pathname },
        });
      }
    };

    return (
      <Route path={'/'} component={App}>
        <IndexRoute component={IndexPage} />
        <Route path={uris.moviesPage()} component={IndexPage} />
        <Route path={uris.loginPage()} component={LoginComponent} />
        <Route onEnter={requireAuth}>
          <Route path={uris.newMoviePage()} component={InsertMoviePage} />
          <Route path={uris.editMoviePage(':id')} component={EditMoviePage} />
        </Route>
      </Route>
    );
  };
}
