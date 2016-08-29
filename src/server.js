require('babel-core').transform('code');

import 'source-map-support/register'; // use source maps in node-js

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import { config } from './config';
import { initDb } from './api/dbManager';

import reducer from './app/reducers';
import {
  addMovieRequest, getMovieRequest, getAllMoviesRequest,
  editMovieRequest, deleteMovieRequest } from './api/http/MoviesController';
import { initAuthentication } from './api/authenticationManager';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import uris from './uris';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

initAuthentication(app);

app.get(uris.getAllMoviesApi(), getAllMoviesRequest);
app.post(uris.addMovieApi(), addMovieRequest);
app.get(uris.getMovieApi(':id'), getMovieRequest);
app.delete(uris.deleteMovieApi(':id'), deleteMovieRequest);
app.put(uris.editMovieApi(':id'), editMovieRequest);
app.get(uris.healthCheck(), (req, res) => {
  res.status(200).send(true);
});

function renderHTML(reduxStore) {
  const storeJson = JSON.stringify(reduxStore);
  const context = reduxStore.config.context;
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>Movies</title>
    <link rel=stylesheet href=${context}styles.css>
    <div id='app'></div>
    <script>window.INITIAL_STATE=${storeJson}</script>
    <script src="${context}client.bundle.js"></script>
   `;
}

MongoClient.connect(config.DATABASE_URL, (err, db) => {
  assert.equal(null, err);

  initDb(db);

  app.get('*', (req, res) => {
    const initialState = {
      auth: {
        isAuthenticated: req.user,
      },
    };
    const store = createStore(
      reducer,
      initialState,
      applyMiddleware(
        thunkMiddleware
      )
    );
    res.status(200).send(renderHTML(store.getState()));
  });

  console.log(`Go to http://localhost:3000${uris.getContext()}`); // eslint-disable-line no-console
  app.listen(3000);
});
