import { shallow, mount } from 'enzyme';
import React from 'react';
import SelectAwards from '../../../../../../../src/app/pages/movies/components/movies/awards/SelectAwardsComponent.jsx';
import { AWARDS } from '../../../../../../../src/MovieAwards';

const movieYear = 2007;

describe('<SelectAwards />', () => {
  const props = {
    movieYear,
  };

  beforeEach(() => {
    props.onChange = jasmine.createSpy('onChange');
  });

  afterEach(() => {
    props.onChange.calls.reset();
  });

  it('should render all the awards', () => {
    const wrapper = shallow(<SelectAwards {...props} />);
    const awards = wrapper.find('input');
    expect(awards).not.toBe(null);
    expect(awards.length).toBe(3);
  });

  it('should change the clicked award', () => {
    const wrapper = shallow(<SelectAwards {...props} />);
    const firstAward = wrapper.find('input').at(0);
    expect(firstAward).not.toBe(null);

    // select the award
    firstAward.simulate('change');
    expect(props.onChange).toHaveBeenCalledWith({
      name: 'cannes',
      year: movieYear,
    }, true);
    props.onChange.calls.reset();

    // unselect the award
    firstAward.simulate('change');
    expect(props.onChange).toHaveBeenCalledWith({
      name: 'cannes',
      year: movieYear,
    }, false);
  });

  AWARDS.forEach((awardName) => {
    it(`should change the ${awardName} award year`, () => {
      const wrapper = mount(<SelectAwards {...props} />);
      const award = wrapper.find(`.${awardName}`).first();
      const firstAwardYear = award.find('.awardYear').at(0);
      expect(firstAwardYear.text()).toBe(`year: ${movieYear}`);

      // increase the date
      award.find('button').at(0).simulate('click');
      expect(wrapper.state(awardName)).toEqual({ checked: false, year: movieYear + 1 });

      // decrease the date
      award.find('button').at(1).simulate('click');
      expect(wrapper.state(awardName)).toEqual({ checked: false, year: movieYear });
    });

    it(`should check the ${awardName} award when it is given as parameter`, () => {
      props.movieAwards = [
        { name: awardName, year: 2010 },
      ];
      const wrapper = mount(<SelectAwards {...props} />);
      expect(wrapper.state(awardName)).toEqual({ checked: true, year: 2010 });
    });
  });
});
