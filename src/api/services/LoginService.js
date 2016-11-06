import dbInstance from '../dbManager';
import { ObjectID } from 'mongodb';
import co from 'co';
import { login as authLogin } from '../authenticationManager';

const fromDbUser = (dbUser) => {
  const user = Object.assign({}, dbUser, {
    id: dbUser._id.toString(), // eslint-disable-line no-underscore-dangle
  });

  delete user._id; // eslint-disable-line no-underscore-dangle
  delete user.password;

  return user;
};

export const login = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return Promise.reject('DTO_VALIDATION');
  }

  // return co(function* gen() {
  //   return yield authLogin(req, res, next);
  // });

  const result = authLogin(req, res, next);
  console.error('LoginService', result);
  return result;
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
