import {Strategy as LocalStrategy} from 'passport-local';
import session from 'express-session';
import {getUserById, login} from './services/LoginService.js';
import passport from 'passport';
import uris from './uris';

const COOKIE_NAME = 'movies-app';

export function initAuthentication(app) {
    app.use(session({
        name: COOKIE_NAME,
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.post(uris.loginApi(), passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    }));
    app.get(uris.logoutApi(), function (req, res) {
        req.logout();
        res.clearCookie(COOKIE_NAME);
        res.redirect('/');
    });

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        getUserById(id, function(user) {done(null, user)});
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            login(username, password, function(user) {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect credentials'});
                }
            });
        }
    ));
}
