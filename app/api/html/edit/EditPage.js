module.exports = function (db) {

    var jade = require('jade'),
        moviesService = require('../../../services/MoviesService.js')(db),
        path = require('path'),
        linkTo = require('../../../link');

    var render = function (req, res) {
        var configuration = {
            movie: moviesService.getMovie(req.params.id),
            endpointUrl: linkTo('editmovies/'+parseInt(req.params.id))
        };
        var html = jade.renderFile(path.join(__dirname,'edit.jade'), configuration);
        return res.send(html);
    };

    return {
        render: render
    }
};