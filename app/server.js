require("babel-core").transform("code");

import 'source-map-support/register'; // use source maps in node-js
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
import {MongoClient} from 'mongodb';
import assert from 'assert';
import {linkTo} from './link';
import {config} from './config';
import {initDb} from './dbManager';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(linkTo(), express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'movies',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Use connect method to connect to the Server
MongoClient.connect(config.DATABASE_URL, (err, db) => {
    assert.equal(null, err);

    initDb(db);
    require('./authenticationManager')();
    require('./routes')(app, passport);

    console.log('Go to http://localhost:3000' + linkTo());
    app.listen(3000);
});
