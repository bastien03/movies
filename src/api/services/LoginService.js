import dbInstance from '../dbManager';
import { ObjectID } from 'mongodb';
import co from 'co';
import { login as authLogin, logout as authLogout } from '../authenticationManager';

const fromDbUser = (dbUser) => {
  const user = Object.assign({}, dbUser, {
    id: dbUser._id.toString(), // eslint-disable-line no-underscore-dangle
  });

  delete user._id; // eslint-disable-line no-underscore-dangle
  delete user.password;

  return user;
};

export const login = (req, res, next, successCallback, errorCallback) => {
  const { username, password } = req.body;

  if (!username || !password) {
    errorCallback('DTO_VALIDATION');
  } else {
    authLogin(req, res, next, successCallback, errorCallback);
  }
};

export const logout = (req, res, successCallback) => {
  authLogout(req, res, successCallback);
};

export const getUserByUserName = (username) => dbInstance().then(db => co(function* gen() {
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
