import {ObjectID} from 'mongodb';

module.exports = function(db) {

    var getMoviesByDirector = function(director, callback) {
        db.collection('movies').find({
            director: director
        }).toArray(function(err, docs) {
            callback(docs);
        });
    };

    var getAllMovies = function(callback) {
        db.collection('movies').find().toArray(function(err, docs) {
            callback(docs);
        });
    };

    var getMovies = function(filter, callback) {
        if (filter.director) {
            getMoviesByDirector(filter.director, callback);
        } else {
            getAllMovies(callback);
        }
    };

    var getMovie = function(movieId, callback) {
        db.collection('movies').find({_id:ObjectID(movieId)}).toArray(function(err, doc) {
            callback(doc[0]);
        });
    };

    var addMovie = function(movieDto) {
        var movie = {
            title: movieDto.title,
            year: movieDto.year,
            url: movieDto.url,
            director: movieDto.director
        };
        db.collection('movies').insert(movie);
    };

    var deleteMovie = function(id) {
        db.collection('movies').findOneAndDelete({_id: ObjectID(id)});
    };

    var editMovie = function(id, obj) {
        db.collection('movies').findOneAndUpdate({_id: ObjectID(id)},obj);
    };

    return {
        getMovies: getMovies,
        getMovie: getMovie,
        addMovie: addMovie,
        deleteMovie: deleteMovie,
        editMovie: editMovie
    }
};