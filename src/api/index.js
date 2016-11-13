import { initAuthentication } from './authenticationManager';
import initRoute from './routes';
import initDbConnection from './dbManager';

const initApi = (app) => {
  initDbConnection();
  initAuthentication(app);
  initRoute(app);
};

export default initApi;
