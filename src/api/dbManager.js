// import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { config } from '../config';
import mockgoose from 'mockgoose';
// import co from 'co';

const createMongooseConnection = () => {
  const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  };

  // db connection
  mongoose.connect(config.DATABASE_URL, options);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
};

const init = () => {
  if (config.isTest()) {
    mockgoose(mongoose).then(() => {
      createMongooseConnection();
    });
  } else {
    createMongooseConnection();
  }
};

export default init;

// // connect to the db and return a promise with the db connection
// // don't forget to close db.close() in your your promise.then
// export default () => co(function* gen() {
//   if (config.dbManager) {
//     return yield config.dbManager();
//   }
//
//   const db = yield MongoClient.connect(config.DATABASE_URL);
//   return db;
// });
