import routes from '../../routes';
import linkTo from '../../link';

module.exports = function (db) {

    var moviesService = require('../../services/MoviesService.js')(db);

    var addMovie = function (req, res) {
        if (!req.user) {
            return res.status(401).send();
        }
        moviesService.addMovie(req.body);
        return res.redirect(linkTo());
    };

    var deleteMovie = function (req, res) {
        if (!req.user) {
            return res.status(401).send();
        }
        moviesService.deleteMovie(req.params.id);
        return res.status(200).send();
    };

    var editMovie = function (req, res) {
        if (!req.user) {
            return res.status(401).send();
        }
        moviesService.editMovie(req.params.id, req.body);
        return res.redirect(linkTo());
    };

    return {
        addMovie: addMovie,
        deleteMovie: deleteMovie,
        editMovie: editMovie
    }
};