module.exports = function(db) {

    var jade = require('jade');
    var moviesService = require('../../../services/MoviesService.js')(db);

    var render = function(req, res) {
        var configuration = {
            movies: moviesService.getMovies(req.query),
            isAuthenticated: req.user
        };
        var html = jade.renderFile('app/api/html/index/index.jade', configuration);
        return res.send(html);
    };

    return {
        render: render
    }
};