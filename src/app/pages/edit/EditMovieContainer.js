import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import { fetchCurrentMovie, saveCurrentMovie } from './actions';
import { getCurrentMovie } from '../../reducers/movies';
import { getLanguage } from '../../reducers/settings';
import EditMoviePage from './EditMoviePage';

const mapStateToProps = state => ({
  movie: getCurrentMovie(state),
  lang: getLanguage(state),
});

const mapDispatchToProps = () => ({
  loadMovie: movieId => fetchCurrentMovie(movieId),
  saveMovie: (movieId, movie, router) => { saveCurrentMovie(movieId, movie, router); },
});

const page = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMoviePage);

export default withRouter(page);
