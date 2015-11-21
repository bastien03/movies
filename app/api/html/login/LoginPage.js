module.exports = function () {

    var jade = require('jade');
    var path = require('path');

    var render = function (req, res) {
        var configuration = {};
        var html = jade.renderFile(path.join(__dirname,'login.jade'), configuration);
        return res.send(html);
    };

    return {
        render: render
    }
}();