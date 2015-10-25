module.exports = function() {

    var getMovies = function() {
        return [
            {title: "Life aquatic", director: "Wes Anderson", year: 2004, url:"http://youtube.com"},
            {title: "Buffet froid", director: "Bertrand Blier", year: 1979, url:"http://youtube.com"}
        ]
    }

    return {
        getMovies: getMovies
    }
}();