module.exports = function () {

    var jade = require('jade'),
        path = require('path'),
        linkTo = require('../../../link.js');

    var render = function (req, res) {
        var configuration = {
            isAuthenticated: req.user,
            url: {
                addMovie: linkTo('movies')
            },
            baseUrl: '.',
            link: {
                login: linkTo('login')
            }
        };
        var html = jade.renderFile(path.join(__dirname,'InsertMovie.jade'), configuration);
        return res.send(html);
    };

    return {
        render: render
    }
}();