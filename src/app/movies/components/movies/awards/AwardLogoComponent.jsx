import React from 'react';
import uris from '../../../../../uris';

const AwardLogoComponent = ({ award }) => {
  if (award && award.name) {
    const moduleName = award.name.toLowerCase();
    return (
      <img
        src={uris.img(`img/awards/${moduleName}-logo.svg`)}
        alt="presentation"
        className="logo"
        key={moduleName}
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
