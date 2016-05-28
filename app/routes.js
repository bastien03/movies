import React from 'react';
import {Route, IndexRoute} from 'react-router'

import App from './components/App'
import IndexComponent from './components/IndexComponent'
import LoginComponent from './components/LoginComponent'
import InsertMovieComponent from './components/InsertMovieContainer'
import EditMovieComponent from './components/EditMovieComponent'
import uris from './uris';


console.log('init routes', uris);
module.exports = (
    <Route path={uris.getContext()} component={App}>
        <IndexRoute component={IndexComponent}/>
        <Route path={uris.loginPage()} component={LoginComponent}/>
        <Route path={uris.newMoviePage()} component={InsertMovieComponent}/>
        <Route path={uris.editMoviePage(':id')} component={EditMovieComponent}/>
    </Route>
);
