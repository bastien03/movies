import React from 'react'
import {render} from 'react-dom'
import {Router} from 'react-router'
import {browserHistory} from 'react-router'
import routes from './routes'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/movies'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;
const loggerMiddleware = createLogger();
// Create Redux store with initial state
const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware)
);

render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory}/>
    </Provider>,
    document.getElementById('app')
);