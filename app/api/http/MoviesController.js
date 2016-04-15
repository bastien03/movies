import routes from '../../routes';
import {linkTo} from '../../link';
import {addMovie, deleteMovie, editMovie} from '../../services/MoviesService.js';

export function addMovieRequest(req, res) {
    if (!req.user) {
        return res.status(401).send();
    }
    addMovie(req.body);
    return res.redirect(linkTo());
}

export function deleteMovieRequest(req, res) {
    if (!req.user) {
        return res.status(401).send();
    }
    deleteMovie(req.params.id);
    return res.status(200).send();
}

export function editMovieRequest(req, res) {
    if (!req.user) {
        return res.status(401).send();
    }
    editMovie(req.params.id, req.body);
    return res.redirect(linkTo());
}
