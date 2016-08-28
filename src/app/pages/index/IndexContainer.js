import { connect } from 'react-redux';
import IndexPage from './IndexPage';
import { getDirectorMovies } from '../../reducers/movies';
import { fetchMovies } from './actions';

const mapStateToProps = (state, ownProps) => {
  const director = ownProps.params.director;
  const movies = director ? getDirectorMovies(state, director) : state.movies.all;
  return {
    movies,
    directors: state.movies.directors,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadAllMovies: () => dispatch(fetchMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
