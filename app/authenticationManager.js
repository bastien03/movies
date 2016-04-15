import {Strategy as LocalStrategy} from 'passport-local';
import {getUserById, login} from './services/LoginService.js';
import passport from 'passport';

module.exports = function() {

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
};