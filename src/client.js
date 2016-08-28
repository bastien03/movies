import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import uris from './uris';
import configureStore from './app/configureStore';

import { initHistory, history } from './app/AppHistory';

// Grab the state from a global injected into server-generated HTML
const initialState = window.INITIAL_STATE;
uris.setContext(initialState.config.context);
initHistory(initialState.config.context);

// load routes after context has been set
let routes = require('./app/routes');

const store = configureStore(initialState);

// // Run our app under the /base URL.
// const appHistory = useRouterHistory(createBrowserHistory)({
//   basename: initialState.context
// })

render(
  <Provider store={store}>
    <Router routes={routes} history={history()} />
  </Provider>,
  document.getElementById('app')
);
