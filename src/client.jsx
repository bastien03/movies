import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import uris from './uris';
import configureStore from './app/configureStore';
import { routes as initRoutes } from './app/routes';

import initHistory from './app/configureHistory';

// Grab the state from a global injected into server-generated HTML
const initialState = window.INITIAL_STATE;
uris.setContext(initialState.config.context);
const history = initHistory(initialState.config.context);

// load routes after context has been set
const store = configureStore(initialState);
const routes = store.dispatch(initRoutes());

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('app'),
);
