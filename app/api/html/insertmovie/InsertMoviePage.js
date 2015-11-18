module.exports = function () {

    var jade = require('jade');
    var path = require('path');

    var render = function (req, res) {
        var configuration = {};
        var html = jade.renderFile(path.join(__dirname,'InsertMovie.jade'), configuration);
        return res.send(html);
    };

    return {
        render: render
    }
}();