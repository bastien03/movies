import {linkTo} from './link.js';

import {renderLoginPage} from './api/html/login/LoginPage.js';
import {renderInsertPage} from './api/html/insertmovie/InsertMoviePage.js';
import {renderEditPage} from './api/html/edit/EditPage.js';
import {renderIndexPage} from './api/html/index/IndexPage.js';
import {addMovieRequest, editMovieRequest, deleteMovieRequest} from './api/http/MoviesController';

module.exports = function (app, passport) {

    app.get(linkTo(), renderIndexPage);
    app.get(linkTo('new-movie'), renderInsertPage);
    app.get(linkTo('login'), renderLoginPage);
    app.get(linkTo('edit/:id'), renderEditPage);

    app.post(linkTo('movies'), addMovieRequest);
    app.delete(linkTo('movies/:id'), deleteMovieRequest);
    app.post(linkTo('editmovies/:id'), editMovieRequest);

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
