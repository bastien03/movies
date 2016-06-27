import { connect } from 'react-redux';
import MovieComponent from './MovieComponent';

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(MovieComponent);
