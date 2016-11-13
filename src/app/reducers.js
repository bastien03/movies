import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import auth from './common/auth/reducer';
import config from './common/config/reducer';
import movies from './reducers/movies';

export default combineReducers({
  movies,
  auth,
  config,
  loadingBar: loadingBarReducer,
});
