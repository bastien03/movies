import { MongoClient } from 'mongodb';
import { config } from '../config';
import co from 'co';

// connect to the db and return a promise with the db connection
// don't forget to close db.close() in your your promise.then
export default () => co(function* gen() {
  if (config.dbManager) {
    return yield config.dbManager();
  }

  const db = yield MongoClient.connect(config.DATABASE_URL);
  return db;
});
