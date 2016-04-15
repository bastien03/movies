var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    path = require('path'),
    passport = require('passport'),
    linkTo = require('./app/link'),
    app = express();

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

var config;
if (process.env.APP_PROFILE === 'production') {
    config = require('./config/production.json');
} else {
    config = require('./config/development.json');
}

// Use connect method to connect to the Server
MongoClient.connect(config.DATABASE_URL, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    require('./app/passport')(db, passport);
    require('./app/routes')(app, passport, db);

    console.log('Go to http://localhost:3000' + linkTo());
    app.listen(3000);
});
