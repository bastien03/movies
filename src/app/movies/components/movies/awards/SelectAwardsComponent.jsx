import React from 'react';
import { AWARDS } from '../../../../../MovieAwards';

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

// Search for an award with the given award name in the given award list
const searchAward = (awardList, awardName) => {
  if (!awardList) {
    return undefined;
  }
  const searchedAwards = awardList.filter(award => awardName === award.name);
  return searchedAwards[0];
};

// create a new state object which contains the given movieAwards
const prepareState = (state, movieAwards, movieYear) => {
  const newState = Object.assign({}, state);
  AWARDS.forEach((award) => {
    // check whether the movie has recieved this award
    const movieAward = searchAward(movieAwards, award);
    newState[award] = {
      checked: !!movieAward,
      year: movieAward ? movieAward.year : movieYear,
    };
  });
  return newState;
};

class SelectAwardsComponent extends React.Component {

  constructor(props) {
    super(props);
    const initialState = prepareState({}, props.movieAwards, props.movieYear);
    this.state = Object.assign({}, initialState);
  }

  componentWillReceiveProps(props) {
    const newState = prepareState(this.state, props.movieAwards, props.movieYear);
    this.setState(newState);
  }

  onSelectionChange(awardName) {
    const year = this.state[awardName].year;
    const checked = !this.state[awardName].checked;
    this.setOneAwardInState(awardName, year, checked);
    this.props.onChange({ name: awardName, year }, checked);
  }

  onYearChange(e, awardName, offset) {
    e.preventDefault();
    const award = this.state[awardName];
    if (award && award.year) {
      const newYear = award.year + offset;
      const checked = award.checked;
      this.setOneAwardInState(awardName, newYear, checked);
      this.props.onChange({ name: awardName, year: newYear }, checked);
    }
  }

  setOneAwardInState(awardName, year, checked) {
    const newState = Object.assign({}, this.state, {
      [awardName]: {
        checked,
        year,
      },
    });
    this.setState(newState);
  }

  render() {
    return (
      <div>
        {AWARDS.map((awardName) => {
          const award = this.state[awardName];
          return (
            <div key={awardName} className={awardName}>
              <label htmlFor={awardName}>
                <input
                  type="checkbox"
                  id={awardName}
                  value={awardName}
                  checked={award.checked}
                  onChange={() => this.onSelectionChange(awardName)}
                />
                {translate(awardName)}
              </label>
              <span className="awardYear">
                {'year: '}{award.year}
              </span>
              {award.year &&
                <span className="awardYearButton">
                  <button
                    className="btn btn-xs awardYearButton"
                    onClick={e => this.onYearChange(e, awardName, 1)}
                  >{'+'}</button>
                  <button
                    className="btn btn-xs awardYearButton"
                    onClick={e => this.onYearChange(e, awardName, -1)}
                  >{'-'}</button>
                </span>
              }
            </div>
          );
        },
        )}
      </div>
    );
  }
}

SelectAwardsComponent.propTypes = {
  movieAwards: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string,
      year: React.PropTypes.number,
    }),
  ),
  movieYear: React.PropTypes.number,
  onChange: React.PropTypes.func,
};

export default SelectAwardsComponent;
