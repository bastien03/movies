import { initAuthentication } from './authenticationManager';
import { initRoute } from './routes';
import { config } from '../config';
import mongoose from 'mongoose';

export const initApi = app => {
  const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  };

  // db connection
  mongoose.connect(config.DATABASE_URL, options);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  initAuthentication(app);
  initRoute(app);
};
