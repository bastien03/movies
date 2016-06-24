import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import { getUserById, login } from './services/LoginService.js';
import passport from 'passport';
import uris from '../uris';

const COOKIE_NAME = 'movies-app';

export function initAuthentication(app) {
  app.use(session({
    name: COOKIE_NAME,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // app.post(uris.loginApi(), passport.authenticate('local', {
  //     successRedirect: '/',
  //     failureRedirect: '/'
  // }));

  app.post(uris.loginApi(), (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) { return next(err); }
      if (!user) { return res.status(400).send(); }
      return req.logIn(user, (loginError) => {
        if (loginError) {
          return next(err);
        }

        return res.status(201).send(user);
      });
    })(req, res, next);
  });

  app.get(uris.logoutApi(), (req, res) => {
    req.logout();
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
  });

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    getUserById(id, (user) => { done(null, user); });
  });

  passport.use(new LocalStrategy(
    (username, password, done) => {
      login(username, password, (user) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false, { message: 'Incorrect credentials' });
      });
    }
  ));
}
