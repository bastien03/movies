import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrentMovie } from '../actions/index';
import EditMoviePresentationalComponent from './EditMoviePresentationalComponent';

class EditMovieComponent extends React.Component {

}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  loadMovie: (movieId) => {
    dispatch(fetchCurrentMovie(movieId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMoviePresentationalComponent);
