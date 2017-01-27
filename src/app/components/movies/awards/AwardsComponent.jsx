import React from 'react';

import AwardLogo from './AwardLogoComponent';

const translate = (award) => {
  if (award === 'berlin') {
    return "Ours d'or - Berlin";
  } else if (award === 'cannes') {
    return "Palme d'or - Cannes";
  } else if (award === 'venice') {
    return "Lion d'or - Venise";
  }
  return 'Aucune';
};

const AwardsComponent = ({ awards }) =>
  <ul className="awards">
    {awards.map(award =>
      <li key={award}>
        <span>{translate(award)}</span>
        <span>
          <AwardLogo award={award} />
        </span>
      </li>,
    )}
  </ul>
;

AwardsComponent.propTypes = {
  awards: React.PropTypes.arrayOf(
    React.PropTypes.string,
  ),
};

export default AwardsComponent;
