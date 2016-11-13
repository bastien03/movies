import mongoose from 'mongoose';
import { config } from '../config';
import mockgoose from 'mockgoose';
import User from './domain/User';

const createMongooseConnection = () => {
  const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  };

  // Use native promises
  mongoose.Promise = global.Promise;

  // db connection
  mongoose.connect(config.DATABASE_URL, options);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
};

const init = () => {
  if (config.isTestEnv) {
    mockgoose(mongoose).then(() => {
      createMongooseConnection();

      // in test env, we use a inmemory version of mongoose
      // so we need to create one user in order to be able to login
      new User({ username: 'testUser' }).save();
    });
  } else {
    createMongooseConnection();
  }
};

export default init;
