import jade from 'jade';
import path from 'path';
import linkTo from '../../../link';

module.exports = function () {

    var render = function (req, res) {
        var configuration = {
            url: {
                login: linkTo('login')
            }
        };
        var html = jade.renderFile(path.join(__dirname,'login.jade'), configuration);
        return res.send(html);
    };

    return {
        render: render
    }
}();