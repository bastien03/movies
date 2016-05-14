import React from 'react'
import {getMovie} from '../services/MoviesService.js'

export default class EditComponentServer extends React.Component {

    static loadData(params, cb) {
        getMovie(params.id, function (movie) {
            cb(movie);
        })
    }
}
