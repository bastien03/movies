app = function() {
    var deleteMovie = function(id) {
        alert('app wants to remove the movie: ' + id);
    };
    return {
        deleteMovie: deleteMovie
    }
}();