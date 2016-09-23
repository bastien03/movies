import { connect } from 'react-redux';
import MovieComponent from './MovieComponent';
import { removeCurrentMovie } from './actions';
import { isAuthenticated } from '../../common/auth/reducer';

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
  removeMovie: (movieId) => { dispatch(removeCurrentMovie(movieId)); },
});

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieComponent);

export default component;
