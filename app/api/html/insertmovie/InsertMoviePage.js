import jade from 'jade';
import path from 'path';
import {linkTo} from '../../../link';

export function renderInsertPage(req, res) {
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
    var html = jade.renderFile(path.join(__dirname, 'InsertMovie.jade'), configuration);
    return res.send(html);
}
