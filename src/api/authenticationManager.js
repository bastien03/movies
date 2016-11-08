import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import { getUserById, getUserByUserName } from './services/LoginService.js';
import passport from 'passport';

const COOKIE_NAME = 'movies-app';

export function login(req, res, next, successCallback, errorCallback) {
  passport.authenticate('local', (err, user) => {
    if (err) { return next(err); }

    if (!user) {
      errorCallback('USER_NOT_FOUND');
      return null;
    }

    return req.logIn(user, loginError => {
      if (loginError) {
        return next(err);
      }

      return successCallback(user);
    });
  })(req, res, next);
}

export function logout(req, res, successCallback) {
  req.logout();
  res.clearCookie(COOKIE_NAME);
  successCallback();
}

export function initAuthentication(app) {
  app.use(session({
    name: COOKIE_NAME,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    getUserById(id).then(user => { done(null, user); });
  });

  passport.use(new LocalStrategy(
    (username, password, done) => {
      getUserByUserName(username, password).then(user => {
        if (user) {
          return done(null, user);
        }

        return done(null, false, { message: 'Incorrect credentials' });
      });
    }
  ));
}
