import { connect } from 'react-redux';
import IndexPage from './IndexPage';
import { getAllMovies, getAllDirectors, getDirectorMovies } from '../../reducers/movies';
import { fetchMovies } from './actions';

const mapStateToProps = (state, ownProps) => {
  const director = ownProps.params.director;
  const movies = director ? getDirectorMovies(state, director) : getAllMovies(state);
  return {
    movies,
    directors: getAllDirectors(state),
  };
};

const mapDispatchToProps = dispatch => ({
  loadAllMovies: () => dispatch(fetchMovies()),
});

const page = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);

export default page;
