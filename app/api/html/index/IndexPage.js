var jade = require('jade');
var moviesService = require('../../../services/MoviesService.js');

module.exports = function() {

    var render = function(req, res) {
        var configuration = {
            movies: moviesService.getMovies()
        }
        var html = jade.renderFile('app/api/html/index/index.jade', configuration);
        return res.send(html)
    }

    return {
        render: render
    }
}();