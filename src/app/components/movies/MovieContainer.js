import { connect } from 'react-redux';
import MovieComponent from './MovieComponent';

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(MovieComponent);
