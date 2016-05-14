import React from 'react'
import {getMovies} from '../services/MoviesService.js'

export default class IndexComponentServer extends React.Component {

    static loadData(route, params, request, cb) {
        getMovies(route.path, function (movies) {
            var configuration = {
                movies: movies,
                directors: IndexComponentServer.getDirectors(movies),
                isAuthenticated: request.user,
                baseUrl: '.'
            };
            cb(configuration);
        })
    }

    static getDirectors(movies) {
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

        return directors.sort(function (a, b) {
            return b.numberMovies - a.numberMovies
        });
    }
}
