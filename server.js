var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');
var loki = require('lokijs');
var db = new loki('db.json');
db.loadDatabase();

var usersDb = new loki('usersDb.json');
usersDb.loadDatabase();
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    loginService = require('./app/services/LoginService.js')(usersDb);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(session({
    name: 'movies',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.$loki);
});

passport.deserializeUser(function (id, done) {
    var user = loginService.getUserById(id);
    done(null, user);
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        var user = loginService.login(username, password);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect credentials'});
        }
    }
));

var indexPage = require('./app/api/html/index/IndexPage.js')(db);
var insertMoviePage = require('./app/api/html/insertmovie/InsertMoviePage.js');
var loginPage = require('./app/api/html/login/loginPage.js');

var moviesController = require('./app/api/http/MoviesController.js')(db);

app.get('/', indexPage.render);
app.get('/new-movie', insertMoviePage.render);
app.get('/login', loginPage.render);

app.post('/movies', moviesController.addMovie);
app.delete('/movies/:id', moviesController.deleteMovie);

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/logout', function (req, res) {
    req.logout();
    res.clearCookie('movies');
    res.redirect('/');
});

console.log('Go to localhost:3000');
app.listen(3000);

//var parseString = require('xml2js').parseString;
//var fs = require('fs');
//var xml = fs.readFileSync('data.xml');
//var movies = db.addCollection('movies');
//parseString(xml, function (err, result) {
//    console.log(result.rss.channel[0].item.length, 'movies in the db');
//    result.rss.channel[0].item.map(function(item){
//        if ('Sample Page' == item.title
//            || 'Home' == item.title
//            || '' == item.title) {
//            return;
//        }
//        var categories = [];
//        item.category.map(function(category){
//            categories.push(category['$'].nicename);
//        });
//        var year = item.title[0].substring(item.title[0].length - 7);
//        year = year.substring(2,year.length -1);
//
//        var title = item.title[0].substring(0, item.title[0].length - 7);
//        var director = categories[1];
//
//        movies.insert({
//            title: title,
//            year: year,
//            url: item['content:encoded'][0],
//            director: director
//        });
//    });
//
//    db.saveDatabase();
//});