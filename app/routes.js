module.exports = function (app, passport, db) {
    var indexPage = require('./api/html/index/IndexPage.js')(db),
        insertMoviePage = require('./api/html/insertmovie/InsertMoviePage.js'),
        loginPage = require('./api/html/login/LoginPage.js'),
        editPage = require('./api/html/edit/EditPage.js')(db),
        moviesController = require('./api/http/MoviesController.js')(db);

    app.get('/', indexPage.render);
    app.get('/new-movie', insertMoviePage.render);
    app.get('/login', loginPage.render);
    app.get('/edit/:id', editPage.render);

    app.post('/movies', moviesController.addMovie);
    app.delete('/movies/:id', moviesController.deleteMovie);
    app.post('/editmovies/:id', moviesController.editMovie);

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.clearCookie('movies');
        res.redirect('/');
    });
};
