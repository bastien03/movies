import { connect } from 'react-redux';
import AdminPage from './AdminPage';
import { getLanguage } from '../../../reducers/settings';

const mapStateToProps = state => ({
  lang: getLanguage(state),
});

const page = connect(
  mapStateToProps,
)(AdminPage);

export default page;
