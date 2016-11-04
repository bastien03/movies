import { MongoClient } from 'mongodb';
// var Db = require('tingodb')().Db;
import { config } from '../config';
import co from 'co';

// connect to the db and return a promise with the db connection
// don't forget to close db.close() in your your promise.then
export default () => co(function* gen() {
  const db = yield MongoClient.connect(config.DATABASE_URL);
  return db;
});

// export default () => co(function* gen() {
//   const db = new Db('./', {});
//   return Promise.resolve(db);
// });
