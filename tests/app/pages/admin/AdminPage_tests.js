import { shallow } from 'enzyme';
import React from 'react';
import Admin from '../../../../src/app/pages/admin/AdminPage';

fdescribe('<AdminPage />', () => {
  let movies;
  const props = {
    loadMoviesWithMissingTitles: () => {},
    saveMovie: () => movies,
  };

  beforeEach(() => {
    props.loadMoviesWithMissingTitles = jasmine.createSpy('loadMoviesWithMissingTitles');
  });

  afterEach(() => {
    props.loadMoviesWithMissingTitles.calls.reset();
  });

  it('should render movies', () => {
    movies = [
      { title: { de: 'de-1', en: 'en-1', fr: 'fr-1', default: 'default-1' }, id: 'id-1' },
      { title: { de: 'de-2', en: 'en-2', fr: 'fr-2', default: 'default-2' }, id: 'id-2' },
      { title: { de: 'de-3', en: 'en-3', fr: 'fr-3', default: 'default-3' }, id: 'id-3' },
    ];
    const wrapper = shallow(<Admin {...props} />);
  });
});
