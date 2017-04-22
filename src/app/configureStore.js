import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducers/';
import callAPIMiddleware from './api/util/callApiMiddleware';
import { isProd } from './common/config/reducer';

export default function (initialState) {
  const middlewares = [
    thunkMiddleware,
    callAPIMiddleware,
  ];
  const isProdMode = isProd(initialState);

  // Create Redux store with initial state
  const store = createStore(
      reducer,
      initialState,
      compose(
        applyMiddleware(...middlewares),
        !isProdMode && window.devToolsExtension ? window.devToolsExtension() : f => f,
      ),
  );

  return store;
}
