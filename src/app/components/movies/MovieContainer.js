import { connect } from 'react-redux';
import MovieComponent from './MovieComponent';
import { removeCurrentMovie } from './actions';
import { isAuthenticated } from '../../common/auth/reducer';
import withRouter from 'react-router/lib/withRouter';

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

export default withRouter(component);
