module.exports = function (db) {

    var moviesService = require('../../services/MoviesService.js')(db);

    var addMovie = function (req, res) {
        moviesService.addMovie(req.body);
        return res.redirect('/');
    };

    var deleteMovie = function (req, res) {
        moviesService.deleteMovie(req.params.id);
        return res.status(200).send();
    };

    return {
        addMovie: addMovie,
        deleteMovie: deleteMovie
    }
};