import jade from 'jade';
import path from 'path';
import {linkTo} from '../../../link';
import {getMovie} from '../../../services/MoviesService.js';

export function renderEditPage(req, res) {
    getMovie(req.params.id, function (movie) {
        var configuration = {
            movie: movie,
            url: {
                edit: linkTo('editmovies/' + req.params.id)
            },
            baseUrl: '..',
            isAuthenticated: req.user,
            link: {
                login: linkTo('login')
            }
        };

        var html = jade.renderFile(path.join(__dirname, 'edit.jade'), configuration);
        return res.send(html);
    });
}
