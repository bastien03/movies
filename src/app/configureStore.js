import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';

export default function (initialState) {
  const loggerMiddleware = createLogger();

  // Create Redux store with initial state
  const store = createStore(
      reducer,
      initialState,
      applyMiddleware(
          thunkMiddleware,
          loggerMiddleware)
  );

  return store;
}
