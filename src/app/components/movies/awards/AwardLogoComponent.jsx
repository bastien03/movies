import React from 'react';

const AwardLogoComponent = ({ award }) => {
  if (award && award.name) {
    const moduleName = award.name.toLowerCase();
    return (
      <img
        src={`/img/awards/${moduleName}-logo.svg`}
        role="presentation"
        className="logo"
      />);
  }

  return null;
};

AwardLogoComponent.propTypes = {
  award: React.PropTypes.shape({
    name: React.PropTypes.string,
    year: React.PropTypes.number,
  }),
};

export default AwardLogoComponent;
