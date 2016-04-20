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

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {renderToString} from 'react-dom/server'
import {Router, Route, match, RouterContext} from 'react-router';

import routes from './routes'
import {addMovieRequest, editMovieRequest, deleteMovieRequest} from './api/http/MoviesController';

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

    app.post(linkTo('movies'), addMovieRequest);
    app.delete(linkTo('movies/:id'), deleteMovieRequest);
    app.post(linkTo('editmovies/:id'), editMovieRequest);

    app.post(linkTo('login'), passport.authenticate('local', {
        successRedirect: linkTo(),
        failureRedirect: linkTo('login')
    }));

    app.get(linkTo('logout'), function (req, res) {
        req.logout();
        res.clearCookie('movies');
        res.redirect(linkTo());
    });

    app.get('*', function(req, res) {
        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message)
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                let route = renderProps.routes[1];
                if (route.component.loadData) {
                    route.component.loadData(route, renderProps.params, req, (data) => {
                        renderProps.routes[1].data = data;
                        res.status(200).send(renderToString(<RouterContext {...renderProps}/>));
                    });
                } else {
                    res.status(200).send(renderToString(<RouterContext {...renderProps}/>));
                }
            } else {
                res.status(404).send('Not found')
            }
        })
    });

    console.log('Go to http://localhost:3000' + linkTo());
    app.listen(3000);
});
