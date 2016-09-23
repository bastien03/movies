import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducers';
import callAPIMiddleware from './api/util/callApiMiddleware';

export default function (initialState) {
  const middlewares = [
    thunkMiddleware,
    callAPIMiddleware,
  ];

  // Create Redux store with initial state
  const store = createStore(
      reducer,
      initialState,
      compose(
        applyMiddleware(...middlewares),
        !initialState.isProd && window.devToolsExtension ? window.devToolsExtension() : f => f
      )
  );

  return store;
}
