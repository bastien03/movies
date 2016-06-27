import { connect } from 'react-redux';
import LoginComponent from './LoginComponent';
import { login } from '../../common/auth/actions';
import { history } from '../../AppHistory';

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: (e, username, password) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return;
    }
    dispatch(login({ username, password }));
    history().push('/');
  },
});

const Component = connect(
  null,
  mapDispatchToProps
)(LoginComponent);

export default Component;
