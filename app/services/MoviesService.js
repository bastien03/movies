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
    };

    var getMovie = function(movieId) {
        return db.getCollection('movies').get(movieId);
    };

    var addMovie = function(movieDto) {
        var movie = {
            title: movieDto.title,
            year: movieDto.year,
            url: movieDto.url,
            director: movieDto.director
        };
        db.getCollection('movies').insert(movie);
        db.saveDatabase();
    };

    var deleteMovie = function(id) {
        var movies = db.getCollection('movies'),
            movie = movies.get(id);

        movies.remove(movie);
        db.saveDatabase();
    };

    var editMovie = function(id, obj) {
        var movies = db.getCollection('movies'),
            movie = movies.get(id);

        obj.$loki = parseInt(id);
        obj.meta = movie.meta;
        movies.update(obj);
        db.saveDatabase();
    }

    return {
        getMovies: getMovies,
        getMovie: getMovie,
        addMovie: addMovie,
        deleteMovie: deleteMovie,
        editMovie: editMovie
    }
};