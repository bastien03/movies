import { connect } from 'react-redux';
import AdminPage from './AdminPage';
import { fetchMovies } from './actions';

const mapDispatchToProps = () => ({
  loadMoviesWithMissingTitles: () => fetchMovies(),
});

const page = connect(
  null,
  mapDispatchToProps,
)(AdminPage);

export default page;
