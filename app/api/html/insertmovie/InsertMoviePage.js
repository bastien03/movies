module.exports = function () {

    var jade = require('jade'),
        path = require('path'),
        linkTo = require('../../../link.js');

    var render = function (req, res) {
        var configuration = {
            url: {
                addMovie: linkTo('movies')
            }
        };
        var html = jade.renderFile(path.join(__dirname,'InsertMovie.jade'), configuration);
        return res.send(html);
    };

    return {
        render: render
    }
}();