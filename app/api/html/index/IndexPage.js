import jade from 'jade';
import path from 'path';
import {linkTo} from '../../../link';
import {getMovies} from '../../../services/MoviesService.js';

function getDirectors(movies) {
    var tmp_directors = [];
    var directors = [];
    for (var idx in movies) {
        var director = movies[idx].director;
        if (tmp_directors[director]) {
            tmp_directors[director] = tmp_directors[director] + 1;
        } else {
            tmp_directors[director] = 1;
        }
    }

    for (var name in tmp_directors) {
        if (name == 'undefined') continue;

        directors.push({
            name: name,
            numberMovies: parseInt(tmp_directors[name])
        });
    }

    return directors.sort(function(a,b) {
        return b.numberMovies - a.numberMovies
    });
}

export function renderIndexPage(req, res) {
    getMovies(req.query, function(movies) {
        var configuration = {
            movies: movies,
            directors: getDirectors(movies),
            isAuthenticated: req.user,
            baseUrl: '.',
            link: {
                home: linkTo(),
                edit: linkTo('edit/'),
                login: linkTo('login'),
                logout: linkTo('logout'),
                newMovie: linkTo('new-movie')
            }
        };
        var html = jade.renderFile(path.join(__dirname,'index.jade'), configuration);
        return res.send(html);
    });
}
