import { combineReducers } from 'redux';
import auth from './common/auth/reducer';
import config from './common/config/reducer';
import movies from './reducers/movies';

export default combineReducers({
  movies,
  auth,
  config,
});
