import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import IndexPage from './pages/index/IndexContainer';
import LoginComponent from './pages/login/LoginContainer';
import movieRoutes from './pages/movies/routes';
import uris from '../uris';
import { isAuthenticated } from './common/auth/reducer';

export default function routes() {
  return (dispatch, getState) => {
    const requireAuth = (nextState, replace) => {
      if (!isAuthenticated(getState())) {
        replace({
          pathname: uris.loginPage(),
          state: { nextPathname: nextState.location.pathname },
        });
      }
    };
    return (
      <Route path={'/'} component={App}>
        <IndexRoute component={IndexPage} />
        <Route path={uris.loginPage()} component={LoginComponent} />
        {movieRoutes(requireAuth)}
      </Route>
    );
  };
}
