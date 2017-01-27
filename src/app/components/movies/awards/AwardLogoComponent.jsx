import React from 'react';

const AwardLogoComponent = ({ award }) => {
  if (award) {
    const moduleName = award.toLowerCase();
    return (<img src={`/img/awards/${moduleName}-logo.svg`} role="presentation" className="logo" />);
  }

  return null;
};

AwardLogoComponent.propTypes = {
  award: React.PropTypes.string,
};

export default AwardLogoComponent;
