import {Strategy as LocalStrategy} from 'passport-local';

module.exports = function(usersDb, passport) {
    var loginService = require('./services/LoginService.js')(usersDb);

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        loginService.getUserById(id, function(user) {done(null, user)});
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            loginService.login(username, password, function(user) {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect credentials'});
                }
            });
        }
    ));
};