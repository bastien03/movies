import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import IndexPage from './IndexPage';

const page = connect()(IndexPage);

export default withRouter(page);
