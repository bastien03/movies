import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import LoginComponent from './LoginPage';
import { login } from '../../common/auth/actions';

const mapDispatchToProps = dispatch => ({
  onLoginClick: (e, router, location, username, password) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return;
    }
    dispatch(login({ username, password }, router, location.state));
  },
});

const page = connect(
  null,
  mapDispatchToProps,
)(LoginComponent);

export default withRouter(page);
