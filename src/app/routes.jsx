import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import IndexPage from './pages/index/IndexContainer';
import DetailPage from './pages/detail/DetailContainer';
import LoginComponent from './pages/login/LoginContainer';
import InsertMoviePage from './pages/insert/InsertMovieContainer';
import EditMoviePage from './pages/edit/EditMovieContainer';
import AdminPage from './pages/admin/AdminContainer';
import uris from '../uris';
import { isAuthenticated } from './common/auth/reducer';

export function routes() {
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
        <Route path={uris.moviesPage()} component={IndexPage} />
        <Route path={uris.loginPage()} component={LoginComponent} />
        <Route path={uris.detailMoviePage(':id')} component={DetailPage} />
        <Route onEnter={requireAuth}>
          <Route path={uris.newMoviePage()} component={InsertMoviePage} />
          <Route path={uris.editMoviePage(':id')} component={EditMoviePage} />
          <Route path={uris.adminPage()} component={AdminPage} />
        </Route>
      </Route>
    );
  };
}
