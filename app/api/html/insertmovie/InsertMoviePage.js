module.exports = function(db) {

    var moviesService = require('../../../services/MoviesService.js')(db);
    var jade = require('jade');

    var render = function(req, res) {
        var configuration = {

        }
        var html = jade.renderFile('app/api/html/insertmovie/InsertMovie.jade', configuration);
        return res.send(html);
    };

    var add = function(req, res) {
        moviesService.addMovie(req.body);
        return res.redirect('/');
    }

    return {
        render: render,
        add: add
    }
};