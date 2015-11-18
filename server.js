var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    loki = require('lokijs'),
    path = require('path'),
    db = new loki(path.join(__dirname, 'db.json')),
    usersDb = new loki(path.join(__dirname,'usersDb.json')),
    passport = require('passport'),
    app = express();

db.loadDatabase();
usersDb.loadDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'movies',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

require('./app/bootstrap-data')(usersDb);
require('./app/passport')(usersDb, passport);
require('./app/routes')(app, passport, db);

console.log('Go to localhost:3000');
app.listen(3000);
