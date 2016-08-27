import { connect } from 'react-redux';
import MovieComponent from './MovieComponent';
import { removeCurrentMovie } from '../../actions';

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  removeMovie: (movieId) => { dispatch(removeCurrentMovie(movieId)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieComponent);
