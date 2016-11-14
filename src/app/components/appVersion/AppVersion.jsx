import React from 'react';
import moment from 'moment';

const AppVersion = ({ style, appVersion, deploymentDate, isProd }) => {
  const absoluteDate = moment(deploymentDate).format('MMMM Do YYYY, h:mm:ss a');
  const relativeDate = moment(deploymentDate).fromNow();
  const date = `${absoluteDate} - ${relativeDate}`;
  const mode = isProd ? 'production' : 'development';
  return (
    <ul style={style} className="appVersionContainer">
      <li>Mode: {mode}</li>
      <li>Version: {appVersion}</li>
      <li>Deployed on: {date}</li>
    </ul>
  );
};
AppVersion.propTypes = {
  style: React.PropTypes.shape({
    display: React.PropTypes.string.isRequired,
  }).isRequired,
  appVersion: React.PropTypes.string.isRequired,
  deploymentDate: React.PropTypes.number.isRequired,
  isProd: React.PropTypes.bool.isRequired,
};

export default AppVersion;
