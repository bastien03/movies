module.exports = function(db) {

    var jade = require('jade');
    var moviesService = require('../../../services/MoviesService.js')(db);

    var render = function(req, res) {
        var configuration = {
            movies: moviesService.getMovies(req.query)
        };
        var html = jade.renderFile('app/api/html/index/index.jade', configuration);
        return res.send(html);
    };

    var deleteMovie = function(req, res) {
        moviesService.deleteMovie();
        return res.redirect('/');
    }

    return {
        render: render,
        deleteMovie: deleteMovie
    }
};