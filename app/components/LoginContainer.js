import { connect } from 'react-redux'
import LoginComponent from './LoginComponent'
import { login } from '../actions'
import { history } from '../AppHistory';

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: (e, username, password) => {
      e.preventDefault();
      if (!username.trim() || !password.trim()) {
            return;
          }
      dispatch(login({username, password}));
      console.log('go to index');
      history().push('/');
    }
  }
}

const Component = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)

export default Component
