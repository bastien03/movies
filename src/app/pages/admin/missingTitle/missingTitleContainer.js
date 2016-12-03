import { connect } from 'react-redux';
import MissingTitleComponent from './missingTitleComponent';
import { fetchMovies, saveMovie } from './actions';

const mapDispatchToProps = () => ({
  loadMoviesWithMissingTitles: () => fetchMovies(),
  saveMovie: (id, movie) => saveMovie(id, movie),
});

const component = connect(
  null,
  mapDispatchToProps,
)(MissingTitleComponent);

export default component;
