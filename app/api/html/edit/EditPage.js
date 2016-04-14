module.exports = function (db) {

    var jade = require('jade'),
        moviesService = require('../../../services/MoviesService.js')(db),
        path = require('path'),
        linkTo = require('../../../link');

    var render = function (req, res) {
        moviesService.getMovie(req.params.id, function(movie){
            var configuration = {
                movie: movie,
                url: {
                    edit: linkTo('editmovies/'+req.params.id)
                },
                baseUrl: '..',
                isAuthenticated: req.user,
                link: {
                    login: linkTo('login')
                }
            };
            console.log(configuration);
            var html = jade.renderFile(path.join(__dirname,'edit.jade'), configuration);
            return res.send(html);
        });
    };

    return {
        render: render
    }
};