import getDbInstance from '../dbManager';
import {ObjectID} from 'mongodb';

let db = getDbInstance();

function getMoviesByDirector(director, callback) {
    db.collection('movies').find({
        director: director
    }).toArray(function(err, docs) {
        callback(docs);
    });
}

function getAllMovies(callback) {
    db.collection('movies').find().toArray(function(err, docs) {
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
    db.collection('movies').find({_id:ObjectID(movieId)}).toArray(function(err, doc) {
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
    db.collection('movies').insert(movie);
}

export function deleteMovie(id) {
    db.collection('movies').findOneAndDelete({_id: ObjectID(id)});
}

export function editMovie(id, obj) {
    db.collection('movies').findOneAndUpdate({_id: ObjectID(id)},obj);
}

export default {
    getMovies: getMovies,
    getMovie: getMovie,
    addMovie: addMovie,
    deleteMovie: deleteMovie,
    editMovie: editMovie
}