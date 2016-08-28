import { connect } from 'react-redux';
import { fetchCurrentMovie, saveCurrentMovie } from './actions';
import EditMoviePage from './EditMoviePage';

const mapStateToProps = (state) => ({
  movie: state.movies.movie,
});

const mapDispatchToProps = (dispatch) => ({
  loadMovie: (movieId) => {
    dispatch(fetchCurrentMovie(movieId));
  },
  saveMovie: (movieId, movie) => {
    dispatch(saveCurrentMovie(movieId, movie));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMoviePage);
