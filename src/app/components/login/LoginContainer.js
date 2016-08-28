import { connect } from 'react-redux';
import LoginComponent from './LoginComponent';
import withRouter from 'react-router/lib/withRouter';
import { login } from '../../common/auth/actions';
// import { history } from '../../AppHistory';

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: (e, router, location, username, password) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return;
    }
    dispatch(login({ username, password }));
    const path = location.state ? location.state.nextPathname : '/';
    console.log('on login click', path);
    router.push(path);
  },
});

const Component = connect(
  null,
  mapDispatchToProps
)(LoginComponent);

export default withRouter(Component);
