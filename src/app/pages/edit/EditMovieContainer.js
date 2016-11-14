import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import { fetchCurrentMovie, saveCurrentMovie } from './actions';
import { getCurrentMovie } from '../../reducers/movies';
import EditMoviePage from './EditMoviePage';

const mapStateToProps = state => ({
  movie: getCurrentMovie(state),
});

const mapDispatchToProps = dispatch => ({
  loadMovie: (movieId) => {
    dispatch(fetchCurrentMovie(movieId));
  },
  saveMovie: (movieId, movie, router) => {
    dispatch(saveCurrentMovie(movieId, movie, router));
  },
});

const page = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMoviePage);

export default withRouter(page);
