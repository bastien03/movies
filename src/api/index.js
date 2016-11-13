import { initAuthentication } from './authenticationManager';
import { initRoute } from './routes';
import initDbConnection from './dbManager';

export const initApi = app => {
  initDbConnection();
  initAuthentication(app);
  initRoute(app);
};
