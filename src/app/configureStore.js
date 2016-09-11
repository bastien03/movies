import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';
import callAPIMiddleware from './api/util/callApiMiddleware';

export default function (initialState) {
  const loggerMiddleware = createLogger();

  // Create Redux store with initial state
  const store = createStore(
      reducer,
      initialState,
      applyMiddleware(
          thunkMiddleware,
          callAPIMiddleware,
          loggerMiddleware)
  );

  return store;
}
