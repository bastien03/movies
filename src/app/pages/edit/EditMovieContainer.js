import { connect } from 'react-redux';
import { fetchCurrentMovie, saveCurrentMovie } from './actions';
import EditMoviePage from './EditMoviePage';
import withRouter from 'react-router/lib/withRouter';

const mapStateToProps = state => ({
  movie: state.movies.movie,
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
  mapDispatchToProps
)(EditMoviePage);

export default withRouter(page);
