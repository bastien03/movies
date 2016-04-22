require("babel-core").transform("code");

import 'source-map-support/register'; // use source maps in node-js

import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
import assert from 'assert';
import {config} from './config';
import {initDb} from './dbManager';
import React from 'react';
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import routes from './routes'
import reducer from './reducers/movies'
import {addMovieRequest, getMovieRequest, editMovieRequest, deleteMovieRequest} from './api/http/MoviesController';
import {initAuthentication, loginRequest, logoutRequest} from './authenticationManager'
import {loadMovies, loadUser, loadCurrentMovie} from './actions/index'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import IndexComponentServer from './components/IndexComponentServer'
import EditComponentServer from './components/EditComponentServer'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import {fetchCurrentMovie} from './actions/index'

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

initAuthentication(app);

app.post('/movies', addMovieRequest);
app.get('/movies/:id', getMovieRequest);
app.delete('/movies/:id', deleteMovieRequest);
app.post('/editmovies/:id', editMovieRequest);


MongoClient.connect(config.DATABASE_URL, (err, db) => {
    assert.equal(null, err);

    initDb(db);

    const loggerMiddleware = createLogger()

    let store = createStore(
        reducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware)
    );

    app.get('*', function (req, res) {
        match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message)
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {

                let route = renderProps.routes[1];
                if (renderProps.components[1] && renderProps.components[1].WrappedComponent) {
                    let componentName = renderProps.components[1].WrappedComponent.name;
                    if (componentName == 'IndexComponent') {
                        IndexComponentServer.loadData(route, renderProps.params, req, (data) => {
                            store.dispatch(loadMovies(data));
                            store.dispatch(loadUser(req.user));

                            buildAndReturnPage(res, renderProps, store);
                        });
                    } else if (componentName == 'EditMovieComponent') {
                        EditComponentServer.loadData(renderProps.params, (data) => {
                            store.dispatch(loadCurrentMovie(data));
                            store.dispatch(loadUser(req.user));

                            buildAndReturnPage(res, renderProps, store);
                        });
                    }
                } else {
                    buildAndReturnPage(res, renderProps, store);
                }
            } else {
                res.status(404).send('Not found')
            }
        })
    });

    console.log('Go to http://localhost:3000');
    app.listen(3000);
});

function buildAndReturnPage(res, renderProps, store) {
    let html = renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps}/>
        </Provider>);
    res.status(200).send(renderHTML(html, store));
}

function renderHTML(appHtml, store) {
    let storeJson = JSON.stringify(store.getState());
    return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>Movies</title>
    <link rel=stylesheet href=/styles.css>
    <div id=app>${appHtml}</div>
    <script>window.__INITIAL_STATE__=${storeJson}</script>
    <script src="/client.bundle.js"></script>
   `
}
