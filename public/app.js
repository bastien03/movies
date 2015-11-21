app = function() {
    var makeHTTPRequest = function(id) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('DELETE', 'movies/' + id);
        httpRequest.send();

        function alertContents() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                console.log(httpRequest.status);
                if (httpRequest.status === 200) {
                    window.location = '';
                } else {
                    alert('Movie with id ' + id + ' could not be deleted.');
                }
            }
        }
    };

    var deleteMovie = function(id, title) {
        if (confirm("Do you really want to delete " + title + "?")) {
            makeHTTPRequest(id);
        }
    };

    return {
        deleteMovie: deleteMovie
    }
}();