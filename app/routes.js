import React from 'react';
import {Route} from 'react-router'

import {linkTo} from './link.js';

import App from './components/App'
import IndexComponent from './api/html/index/IndexComponent'
import LoginComponent from './api/html/login/LoginComponent'
import InsertMovieComponent from './api/html/insertmovie/InsertMovieComponent'
import EditMovieComponent from './api/html/edit/EditMovieComponent'


module.exports = (
    <Route path="/" component={App}>
        <Route path={linkTo()} component={IndexComponent}/>
        <Route path={linkTo('new-movie')} component={InsertMovieComponent}/>
        <Route path={linkTo('login')} component={LoginComponent}/>
        <Route path={linkTo('edit/:id')} component={EditMovieComponent}/>
    </Route>
);
