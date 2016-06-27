import { connect } from 'react-redux';
import HeaderComponent from './HeaderComponent';

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(HeaderComponent);
