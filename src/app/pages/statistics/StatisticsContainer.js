import { connect } from 'react-redux';
import StatisticsPage from './StatisticsPage';
import { getLanguage } from '../../reducers/settings';
import { loadStatistics } from './actions';

const mapStateToProps = state => ({
  lang: getLanguage(state),
});

const mapDispatchToProps = () => ({
  loadStatistics: () => loadStatistics(),
});

const page = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatisticsPage);

export default page;
