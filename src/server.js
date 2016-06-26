require('babel-core').transform('code');

import 'source-map-support/register'; // use source maps in node-js

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import { config } from './config';
import { initDb } from './api/dbManager';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import reducer from './app/reducers/movies';
import {
  addMovieRequest, getMovieRequest,
  editMovieRequest, deleteMovieRequest } from './api/http/MoviesController';
import { initAuthentication } from './api/authenticationManager';
import { loadMovies, loadUser, loadCurrentMovie } from './app/actions/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import IndexComponentServer from './app/components/IndexComponentServer';
import EditComponentServer from './app/components/EditComponentServer';
import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
import uris from './uris';
import routes from './app/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

initAuthentication(app);

// const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  {
    config: {
      context: uris.getContext(),
    },
  },
  applyMiddleware(
    thunkMiddleware
  )
);

app.post(uris.addMovieApi(), addMovieRequest);
app.get(uris.getMovieApi(':id'), getMovieRequest);
app.delete(uris.deleteMovieApi(':id'), deleteMovieRequest);
app.put(uris.editMovieApi(':id'), editMovieRequest);
app.get(uris.healthCheck(), (req, res) => {
  res.status(200).send(true);
});

function renderHTML(appHtml, reduxStore) {
  const storeJson = JSON.stringify(reduxStore.getState());
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>Movies</title>
    <link rel=stylesheet href=./styles.css>
    <div id=app>${appHtml}</div>
    <script>window.INITIAL_STATE=${storeJson}</script>
    <script src="./client.bundle.js"></script>
   `;
}

function buildAndReturnPage(res, renderProps, reduxStore) {
  const html = renderToString(
    <Provider store={reduxStore}>
      <RouterContext {...renderProps} />
    </Provider>);
  res.status(200).send(renderHTML(html, reduxStore));
}

MongoClient.connect(config.DATABASE_URL, (err, db) => {
  assert.equal(null, err);

  initDb(db);

  app.get('*', (req, res) => {
    match(
      { routes, location: req.url, basename: uris.getContext() },
      (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
          const route = renderProps.routes[1];
          if (renderProps.components[1] && renderProps.components[1].WrappedComponent) {
            const componentName = renderProps.components[1].WrappedComponent.name;
            if (componentName === 'IndexComponent') {
              IndexComponentServer.loadData(route, renderProps.params, req, (data) => {
                store.dispatch(loadMovies(data));
                store.dispatch(loadUser(req.user));

                buildAndReturnPage(res, renderProps, store);
              });
            } else if (componentName === 'EditMovieComponent') {
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
          res.status(404).send('Not found');
        }
      });
  });
  console.log(`Go to http://localhost:3000${uris.getContext()}`); // eslint-disable-line no-console
  app.listen(3000);
});