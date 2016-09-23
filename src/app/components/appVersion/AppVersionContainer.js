import AppVersion from './AppVersion';
import { connect } from 'react-redux';
import { getVersion, getDeploymentDate, isProd } from '../../common/config/reducer';

const mapStateToProps = (state, ownProps) => ({
  appVersion: getVersion(state),
  deploymentDate: getDeploymentDate(state),
  isProd: isProd(state),
  style: ownProps.style,
});

export default connect(mapStateToProps)(AppVersion);
