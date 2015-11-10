module.exports = function(usersDb, passport) {
    var loginService = require('./services/LoginService.js')(usersDb),
        LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {
        done(null, user.$loki);
    });

    passport.deserializeUser(function (id, done) {
        var user = loginService.getUserById(id);
        done(null, user);
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            var user = loginService.login(username, password);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Incorrect credentials'});
            }
        }
    ));
};