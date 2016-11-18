import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import auth from './common/auth/reducer';
import config from './common/config/reducer';
import movies from './reducers/movies';
import settings from './reducers/settings';

export default combineReducers({
  movies,
  auth,
  config,
  settings,
  loadingBar: loadingBarReducer,
});
