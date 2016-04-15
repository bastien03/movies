import jade from 'jade';
import path from 'path';
import {linkTo} from '../../../link';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import LoginComponent from './LoginComponent';

export function renderLoginPage(req, res) {
    //var configuration = {
    //    url: {
    //        login: linkTo('login')
    //    }
    //};
    //var html = jade.renderFile(path.join(__dirname,'login.jade'), configuration);
    //return res.send(html);

    let loginUrl = linkTo('login');
    res.send(
        ReactDOMServer.renderToString(
            <LoginComponent url={loginUrl}/>
        )
    );
}
