import getDbInstance from '../dbManager';
import {ObjectID} from 'mongodb';

function getMoviesByDirector(director, callback) {
    getDbInstance().collection('movies').find({
        director: director
    }).toArray(function(err, docs) {
        callback(docs);
    });
}

function getAllMovies(callback) {
    getDbInstance().collection('movies').find().toArray(function(err, docs) {
        callback(docs);
    });
}

export function getMovies(filter, callback) {
    if (filter.director) {
        getMoviesByDirector(filter.director, callback);
    } else {
        getAllMovies(callback);
    }
}

export function getMovie(movieId, callback) {
    getDbInstance().collection('movies').find({_id:ObjectID(movieId)}).toArray(function(err, doc) {
        callback(doc[0]);
    });
}

export function addMovie(movieDto) {
    var movie = {
        title: movieDto.title,
        year: movieDto.year,
        url: movieDto.url,
        director: movieDto.director
    };
    getDbInstance().collection('movies').insert(movie);
}

export function deleteMovie(id) {
    getDbInstance().collection('movies').findOneAndDelete({_id: ObjectID(id)});
}

export function editMovie(id, obj) {
    getDbInstance().collection('movies').findOneAndUpdate({_id: ObjectID(id)},obj);
}

export default {
    getMovies: getMovies,
    getMovie: getMovie,
    addMovie: addMovie,
    deleteMovie: deleteMovie,
    editMovie: editMovie
}