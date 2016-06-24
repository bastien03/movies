import getDbInstance from '../dbManager';
import { ObjectID } from 'mongodb';

const fromDbUser = (dbUser) => {
  const user = dbUser;
  user.id = user._id.toString(); // eslint-disable-line no-underscore-dangle
  delete user._id; // eslint-disable-line no-underscore-dangle

  return user;
};

export function login(username, password, callback) {
  getDbInstance().collection('users')
    .find({ username })
    .limit(1)
    .next((err, dbUser) => {
      const user = fromDbUser(dbUser);
      callback(user);
    });
}

export function getUserById(id, callback) {
  getDbInstance().collection('users')
    .find({ _id: new ObjectID(id) })
    .limit(1)
    .next((err, dbUser) => {
      const user = fromDbUser(dbUser);
      callback(user);
    });
}
