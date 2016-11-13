import mongoose from 'mongoose';
import { config } from '../config';
import mockgoose from 'mockgoose';

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
    });
  } else {
    createMongooseConnection();
  }
};

export default init;
