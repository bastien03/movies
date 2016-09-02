import dbInstance from '../dbManager';
import { ObjectID } from 'mongodb';
import co from 'co';

const fromDbUser = (dbUser) => {
  const user = Object.assign({}, dbUser, {
    id: dbUser._id.toString(), // eslint-disable-line no-underscore-dangle
  });
  delete user._id; // eslint-disable-line no-underscore-dangle

  return user;
};

export const login = (username) => dbInstance().then(db => co(function* gen() {
  const user = yield db.collection('users')
    .find({ username })
    .limit(1)
    .next();

  db.close();

  return fromDbUser(user);
}));

export const getUserById = (id) => dbInstance().then(db => co(function* gen() {
  const user = yield db.collection('users')
    .find({ _id: new ObjectID(id) })
    .limit(1)
    .next();

  db.close();
  return fromDbUser(user);
}));
