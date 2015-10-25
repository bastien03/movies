module.exports = function(db) {

    var getMoviesByDirector = function(director) {
        return db.getCollection('movies').find({
            director: director
        });
    };

    var getAllMovies = function() {
        return db.getCollection('movies').find();
    };

    var getMovies = function(filter) {
        if (filter.director) {
            return getMoviesByDirector(filter.director);
        } else {
            return getAllMovies();
        }
    }

    return {
        getMovies: getMovies
    }
};