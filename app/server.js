require("babel-core").transform("code");

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
import linkTo from './link';
import {MongoClient} from 'mongodb';
import assert from 'assert';
import {config} from './config';

var app = express();

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


// Use connect method to connect to the Server
MongoClient.connect(config.DATABASE_URL, (err, db) => {
    assert.equal(null, err);

    require('./passport')(db, passport);
    require('./routes')(app, passport, db);

    console.log('Go to http://localhost:3000' + linkTo());
    app.listen(3000);
});
