import { connect } from 'react-redux';
import HeaderComponent from './HeaderComponent';

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const component = connect(mapStateToProps)(HeaderComponent);

export default component;
