import { mount } from 'enzyme';
import React from 'react';
import EditMovie from '../../../../../../src/app/pages/movies/components/movies/EditMovieComponent.jsx';

describe('<EditMovie />', () => {
  const props = {
    countries: { countryCode: 'countryName' }
  };

  const setInputText = (wrapper, selector, value) => {
    wrapper.find(`.formGroup.${selector} input`)
      .simulate('change', { target: { value } });
  };

  beforeEach(() => {
    props.saveMovie = jasmine.createSpy('saveMovie');
  });

  afterEach(() => {
    props.saveMovie.calls.reset();
  });

  it('should return an empty movie', () => {
    const wrapper = mount(<EditMovie {...props} />);
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(props.saveMovie).toHaveBeenCalledWith({
      title: {
        de: '',
        en: '',
        fr: '',
      },
      url: '',
      director: '',
      country: '',
      year: 1970,
      awards: [],
    });
  });

  it('should return a non empty movie without awards', () => {
    const wrapper = mount(<EditMovie {...props} />);

    setInputText(wrapper, 'title-de', 'movie-title-de');
    setInputText(wrapper, 'title-en', 'movie-title-en');
    setInputText(wrapper, 'title-fr', 'movie-title-fr');
    setInputText(wrapper, 'year', 2013);
    setInputText(wrapper, 'url', 'movie-url');
    setInputText(wrapper, 'director', 'movie-director');

    const form = wrapper.find('form');
    form.simulate('submit');
    expect(props.saveMovie).toHaveBeenCalledWith({
      title: {
        de: 'movie-title-de',
        en: 'movie-title-en',
        fr: 'movie-title-fr',
      },
      url: 'movie-url',
      director: 'movie-director',
      country: '',
      year: 2013,
      awards: [],
    });
  });

  it('should return a movie with awards', () => {
    const wrapper = mount(<EditMovie {...props} />);
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(props.saveMovie).toHaveBeenCalledWith({
      title: {
        de: '',
        en: '',
        fr: '',
      },
      url: '',
      director: '',
      country: '',
      year: 1970,
      awards: [],
    });
  });
});
