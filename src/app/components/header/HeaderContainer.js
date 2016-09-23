import { connect } from 'react-redux';
import HeaderComponent from './HeaderComponent';
import { logout as logoutAction } from '../../common/auth/actions';
import withRouter from 'react-router/lib/withRouter';
import { isAuthenticated } from '../../common/auth/reducer';

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
  logout: (router) => dispatch(logoutAction(router)),
});

const component = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

export default withRouter(component);
