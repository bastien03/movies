module.exports = function () {

    var jade = require('jade');

    var render = function (req, res) {
        var configuration = {};
        var html = jade.renderFile('app/api/html/insertmovie/InsertMovie.jade', configuration);
        return res.send(html);
    };

    return {
        render: render
    }
}();