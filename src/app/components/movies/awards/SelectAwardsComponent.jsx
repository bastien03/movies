import React from 'react';
import { AWARDS } from '../../../../MovieAwards';

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

const AwardsComponent = ({ awards, onChange }) => {
  const isChecked = award => !!awards && awards.includes(award);
  return (
    <div>
      {AWARDS.map((award) => {
        let checked = isChecked(award);
        const change = () => { checked = !checked; onChange(award, checked); };
        return (
          <div key={award}>
            <label htmlFor={award}>
              <input
                type="checkbox"
                id={award}
                value={award}
                defaultChecked={checked}
                onChange={change}
              />
              {translate(award)}
            </label>
          </div>
        );
      })}
    </div>
  );
};

AwardsComponent.propTypes = {
  awards: React.PropTypes.arrayOf(
    React.PropTypes.string,
  ),
  onChange: React.PropTypes.func,
};

export default AwardsComponent;
