import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './app/reducers';
import uris from './uris';

import { initHistory, history } from './app/AppHistory';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

// Grab the state from a global injected into server-generated HTML
const initialState = window.INITIAL_STATE;
uris.setContext(initialState.config.context);
initHistory(initialState.config.context);


// load routes after context has been set
let routes = require('./app/routes');

const loggerMiddleware = createLogger();
// Create Redux store with initial state
const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware)
);

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
