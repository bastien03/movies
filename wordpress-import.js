
// run this script to import movies from data.xml to a loki database.
// data.xml is coming from a wordpress export.
// run node wordpress-import.js

var db = new loki('db.json'),
    parseString = require('xml2js').parseString,
    fs = require('fs'),
    xml = fs.readFileSync('data.xml'),
    movies = db.addCollection('movies');

db.loadDatabase();
parseString(xml, function (err, result) {
    console.log(result.rss.channel[0].item.length, 'movies in the db');
    result.rss.channel[0].item.map(function (item) {
        if ('Sample Page' == item.title
            || 'Home' == item.title
            || '' == item.title) {
            return;
        }
        var categories = [];
        item.category.map(function (category) {
            categories.push(category['$'].nicename);
        });
        var year = item.title[0].substring(item.title[0].length - 7);
        year = year.substring(2, year.length - 1);

        var title = item.title[0].substring(0, item.title[0].length - 7);
        var director = categories[1];

        movies.insert({
            title: title,
            year: year,
            url: item['content:encoded'][0],
            director: director
        });
    });

    db.saveDatabase();
});