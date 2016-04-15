import React from 'react';

module.exports = function (app, passport, db) {
    var linkTo = require('./link.js'),
        indexPage = require('./api/html/index/IndexPage.js')(db),
        insertMoviePage = require('./api/html/insertmovie/InsertMoviePage.js'),
        loginPage = require('./api/html/login/LoginPage.js'),
        editPage = require('./api/html/edit/EditPage.js')(db),
        moviesController = require('./api/http/MoviesController.js')(db);

    app.get(linkTo(), indexPage.render);
    app.get(linkTo('new-movie'), insertMoviePage.render);
    app.get(linkTo('login'), loginPage.render);
    app.get(linkTo('edit/:id'), editPage.render);
    app.get(linkTo('react'), function(req, res) {
       res.send(React.renderToStaticMarkup('test'));
    });

    app.post(linkTo('movies'), moviesController.addMovie);
    app.delete(linkTo('movies/:id'), moviesController.deleteMovie);
    app.post(linkTo('editmovies/:id'), moviesController.editMovie);

    app.post(linkTo('login'), passport.authenticate('local', {
        successRedirect: linkTo(),
        failureRedirect: linkTo('login')
    }));

    app.get(linkTo('logout'), function (req, res) {
        req.logout();
        res.clearCookie('movies');
        res.redirect(linkTo());
    });
};
