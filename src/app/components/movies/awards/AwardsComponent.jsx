import React from 'react';

const translate = (award) => {
  if (award === 'Berlin') {
    return "Ours d'or - Berlin";
  } else if (award === 'Cannes') {
    return "Palme d'or - Cannes";
  } else if (award === 'Venice') {
    return "Lion d'or - Venise";
  }
  return 'Aucune';
};

const AwardsComponent = ({ awards }) =>
  <div>
    {awards.map(award =>
      <span key={award}>
        {translate(award)} {'  '}
      </span>,
    )}
  </div>
;

AwardsComponent.propTypes = {
  awards: React.PropTypes.arrayOf(
    React.PropTypes.string,
  ),
};

export default AwardsComponent;
