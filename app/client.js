import React from 'react'
import { render } from 'react-dom'
import {Router, Route} from 'react-router'
import routes from './routes'

render(
    <Router routes={routes} />,
    document.getElementById('app')
);