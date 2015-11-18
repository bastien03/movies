module.exports = function (db) {

    var jade = require('jade');
    var moviesService = require('../../../services/MoviesService.js')(db);
    var path = require('path');

    var render = function (req, res) {
        var configuration = {
            movie: moviesService.getMovie(req.params.id)
        };
        var html = jade.renderFile(path.join(__dirname,'edit.jade'), configuration);
        return res.send(html);
    };

    return {
        render: render
    }
};