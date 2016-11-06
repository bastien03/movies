import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import { getUserById, getUserByUserName } from './services/LoginService.js';
import passport from 'passport';

export const COOKIE_NAME = 'movies-app';

export function login(req, res, next) {
  passport.authenticate('local', (err, user) => {
    if (err) { return next(err); }
    const { username, password } = req.body;
    if (!username || !password) {
      // dto validation fails
      return res.status(400).send();
    }
    if (!user) {
      // user not found
      return res.status(400).send();
    }

    return req.logIn(user, (loginError) => {
      if (loginError) {
        return next(err);
      }

      return res.status(201).send(user);
    });
  })(req, res, next);
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
