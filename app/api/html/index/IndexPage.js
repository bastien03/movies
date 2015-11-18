module.exports = function(db) {

    var jade = require('jade');
    var moviesService = require('../../../services/MoviesService.js')(db);
    var path = require('path');

    var getDirectors = function(movies) {
        var tmp_directors = [];
        var directors = [];
        for (var idx in movies) {
            var director = movies[idx].director;
            if (tmp_directors[director]) {
                tmp_directors[director] = tmp_directors[director] + 1;
            } else {
                tmp_directors[director] = 1;
            }
        }

        for (var name in tmp_directors) {
            //if (name == 'undefined') continue;

            directors.push({
                name: name,
                numberMovies: parseInt(tmp_directors[name])
            });
        }

        return directors.sort(function(a,b) {
            return b.numberMovies - a.numberMovies
        });
    };

    var render = function(req, res) {
        var movies = moviesService.getMovies(req.query);

        var configuration = {
            movies: movies,
            directors: getDirectors(movies),
            isAuthenticated: req.user
        };
        var html = jade.renderFile(path.join(__dirname,'index.jade'), configuration);
        return res.send(html);
    };

    return {
        render: render
    }
};