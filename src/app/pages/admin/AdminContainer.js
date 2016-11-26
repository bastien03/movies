import { connect } from 'react-redux';
import AdminPage from './AdminPage';
import { fetchMovies, saveMovie } from './actions';

const mapDispatchToProps = () => ({
  loadMoviesWithMissingTitles: () => fetchMovies(),
  saveMovie: (id, movie) => saveMovie(id, movie),
});

const page = connect(
  null,
  mapDispatchToProps,
)(AdminPage);

export default page;
