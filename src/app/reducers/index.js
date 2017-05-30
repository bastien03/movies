import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import auth from '../common/auth/reducer';
import config from '../common/config/reducer';
import movies from '../pages/movies/reducers/movies';
import settings from './settings';
import countries from './countries';

export default combineReducers({
  movies,
  auth,
  config,
  settings,
  loadingBar: loadingBarReducer,
  countries
});
