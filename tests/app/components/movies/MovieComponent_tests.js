import { shallow } from 'enzyme';
import React from 'react';
import Movie from '../../../../src/app/components/movies/MovieComponent';

describe('<Movie />', () => {
  const props = {
    title: 'movie-title',
    director: 'movie-director',
    year: 'movie-year',
    url: '',
    id: '',
    isAuthenticated: {},
    removeMovie: () => {},
  };

  beforeEach(() => {
    props.removeMovie = jasmine.createSpy('removeMovie');
  });

  afterEach(() => {
    props.removeMovie.calls.reset();
  });

  it('should display movie infos: title, director and year', () => {
    const wrapper = shallow(<Movie {...props} />);
    expect(wrapper.contains('movie-title')).toBeTruthy();
    expect(wrapper.contains('movie-director')).toBeTruthy();
    expect(wrapper.contains('movie-year')).toBeTruthy();
  });

  describe('logged in state', () => {
    it('should render an edit link', () => {
      const wrapper = shallow(<Movie {...props} />);
      expect(wrapper.contains('edit')).toBeTruthy();
    });

    it('should render a remove button', () => {
      const wrapper = shallow(<Movie {...props} />);
      expect(wrapper.contains('remove')).toBeTruthy();
    });
  });

  describe('logged out state', () => {
    beforeEach(() => {
      props.isAuthenticated = undefined;
    });

    it('should not render an edit link', () => {
      const wrapper = shallow(<Movie {...props} />);
      expect(wrapper.contains('edit')).toBeFalsy();
    });

    it('should not render a remove button', () => {
      const wrapper = shallow(<Movie {...props} />);
      expect(wrapper.contains('remove')).toBeFalsy();
    });
  });
});
