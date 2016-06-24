import React from 'react';
import { getMovie } from '../../api/services/MoviesService.js';

export default class EditComponentServer extends React.Component {

  static loadData(params, cb) {
    getMovie(params.id, (movie) => {
      cb(movie);
    });
  }
}
