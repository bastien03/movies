import React from 'react';
import {Route, IndexRoute} from 'react-router'

import App from './components/App'
import IndexComponent from './components/IndexComponent'
import LoginComponent from './components/LoginComponent'
import InsertMovieComponent from './components/InsertMovieComponent'
import EditMovieComponent from './components/EditMovieComponent'

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={IndexComponent}/>
        <Route path='login' component={LoginComponent}/>
        <Route path='new-movie' component={InsertMovieComponent}/>
        <Route path='edit/:id' component={EditMovieComponent}/>
    </Route>
);
