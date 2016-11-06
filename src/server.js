require('babel-core').transform('code');

import 'source-map-support/register'; // use source maps in node-js
import 'regenerator-runtime/runtime';

import express from 'express';
import bodyParser from 'body-parser';

import reducer from './app/reducers';
import {
  addMovieRequest, getMovieRequest, getAllMoviesRequest,
  editMovieRequest, deleteMovieRequest } from './api/http/MoviesController';
import { initAuthentication } from './api/authenticationManager';
import { createStore } from 'redux';
import uris from './uris';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import { version } from '../package';

const env = process.env.NODE_ENV;
const context = process.env.APP_PATH || '/';
const isProd = env === 'production';
const bundle = isProd ? 'prod.bundle.js' : 'bundle.js';

const app = express();
const port = env === 'test' ? 3001 : 3000;
const deploymentDate = isProd ? parseInt(process.env.DEPLOYMENT_DATE, 10) : Date.now();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/../public`));

console.log(`==> 🌎  Running app in ${env} mode`); // eslint-disable-line
if (!isProd) {
  console.log(`==> 🌎  Using webpack compiler with dev and hot middleware.`); // eslint-disable-line
  // Use this middleware to set up hot module reloading via webpack.
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

initAuthentication(app);

app.get(uris.getAllMoviesApi(), getAllMoviesRequest);
app.post(uris.addMovieApi(), addMovieRequest);
app.get(uris.getMovieApi(':id'), getMovieRequest);
app.delete(uris.deleteMovieApi(':id'), deleteMovieRequest);
app.put(uris.editMovieApi(':id'), editMovieRequest);

function renderHTML(reduxStore) {
  const storeJson = JSON.stringify(reduxStore);
  const title = isProd ? 'Movies' : 'Movies (dev)';
  // the browserSync tag is added only in dev mode and will connect to the
  // browser sync server
  const browserSync = isProd ? '' : `
    <script id="__bs_script__">
      var script = document.createElement('script');
      script.src="http://HOST:3001/browser-sync/browser-sync-client.2.14.3.js".replace("HOST", location.hostname);
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(script);
    </script>`;

  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>${title}</title>
    <link rel="shortcut icon" type="image/x-icon" href="${context}favicon.ico" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
    <link rel=stylesheet href=${context}styles.css>
    <body>
      ${browserSync}
      <div id='app'></div>
      <script>window.INITIAL_STATE=${storeJson}</script>
      <script src="${context}${bundle}"></script>
    </body>
    </html>
   `;
}

app.get('*', (req, res) => {
  const initialState = {
    auth: {
      isAuthenticated: req.user,
    },
    config: {
      context: uris.getContext(),
      isProd,
      version,
      deploymentDate,
    },
  };
  const store = createStore(
    reducer,
    initialState
  );
  res.status(200).send(renderHTML(store.getState()));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}${context} in your browser.`); // eslint-disable-line no-console
  }
});


export default app;
