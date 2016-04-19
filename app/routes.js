import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {renderToString} from 'react-dom/server'
import {Router, Route, match, RouterContext} from 'react-router';
import {linkTo} from './link.js';

import IndexComponent from './api/html/index/IndexComponent'
import LoginComponent from './api/html/login/LoginComponent'
import InsertMovieComponent from './api/html/insertmovie/InsertMovieComponent'
import EditMovieComponent from './api/html/edit/EditMovieComponent'

import {renderEditPage} from './api/html/edit/EditPage.js';
import {addMovieRequest, editMovieRequest, deleteMovieRequest} from './api/http/MoviesController';

module.exports = function (app, passport) {

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
        // Note that req.url here should be the full URL path from
        // the original request, including the query string.
        const routes = (
            <Route>
                <Route path={linkTo()} component={IndexComponent}/>
                <Route path={linkTo('new-movie')} component={InsertMovieComponent} />
                <Route path={linkTo('login')} component={LoginComponent} />
                <Route path={linkTo('edit/:id')} component={EditMovieComponent} />
            </Route>
        );
        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message)
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                let route = renderProps.routes[1];
                if (route.component.loadData) {
                    route.component.loadData(route, req, (data) => {
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
    })
};
