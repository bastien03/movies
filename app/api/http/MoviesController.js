import {addMovie, getMovie, deleteMovie, editMovie} from '../../services/MoviesService.js';
import uris from '../../uris';

function notAuthenticated(res) {
    return res.status(401).send('You have to be authenticated to perform this request.');
}

export function addMovieRequest(req, res) {
    if (!req.user) {
        return notAuthenticated(res);
    }

    addMovie(req.body, function (movie) {
      return res.status(201).send(movie);
    });
    // return res.redirect(uris.indexPage());
}

export function getMovieRequest(req, res) {
    if (!req.user) {
        return notAuthenticated(res);
    }
    getMovie(req.params.id, (movie) => {
        return res.status(200).send(movie);
    });
}

export function deleteMovieRequest(req, res) {
    if (!req.user) {
        return notAuthenticated(res);
    }
    deleteMovie(req.params.id);
    return res.status(200).send();
}

export function editMovieRequest(req, res) {
    if (!req.user) {
        return notAuthenticated(res);
    }
    editMovie(req.params.id, req.body);
    return res.redirect(uris.indexPage());
}
