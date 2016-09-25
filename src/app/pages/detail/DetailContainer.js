import { connect } from 'react-redux';
import DetailPage from './DetailPage';
import { getAllMovies, getAllDirectors, getDirectorMovies } from '../../reducers/movies';

const mapStateToProps = (state, ownProps) => {
  const director = ownProps.params.director;
  const movies = director ? getDirectorMovies(state, director) : getAllMovies(state);
  return {
    movies,
    directors: getAllDirectors(state),
  };
};

const page = connect(
  mapStateToProps
)(DetailPage);

export default page;
