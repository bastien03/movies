var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    loki = require('lokijs'),
    path = require('path'),
    usersDb = new loki(path.join(__dirname,'usersDb.json')),
    passport = require('passport'),
    linkTo = require('./app/link'),
    app = express();

usersDb.loadDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(linkTo(), express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'movies',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://127.0.0.1:27017/moviesApp';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    require('./app/bootstrap-data')(usersDb);
    require('./app/passport')(usersDb, passport);
    require('./app/routes')(app, passport, db);

    console.log('Go to http://localhost:3000' + linkTo());
    app.listen(3000);

});
