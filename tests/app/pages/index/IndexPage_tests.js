import { shallow } from 'enzyme';
import React from 'react';
import Index from '../../../../src/app/pages/index/IndexPage';
import Movie from '../../../../src/app/components/movies/MovieContainer';
import Director from '../../../../src/app/components/directors/DirectorComponent';

describe('<IndexPage />', () => {
  const props = {
    movies: [
      { id: 'id-1', title: 'c', director: 'a', year: 3 },
      { id: 'id-2', title: 'b', director: 'b', year: 1 },
      { id: 'id-3', title: 'a', director: 'a', year: 2 },
    ],
    directors: [
      { name: 'a', numberMovies: 2 },
      { name: 'b', numberMovies: 1 },
    ],
    loadAllMovies: () => {},
  };

  beforeEach(() => {
    props.loadAllMovies = jasmine.createSpy('loadAllMovies');
  });

  afterEach(() => {
    props.loadAllMovies.calls.reset();
  });

  describe('should render movies', () => {
    it('in default order', () => {
      const wrapper = shallow(<Index {...props} />);
      const moviesWrapper = wrapper.find(Movie);
      expect(moviesWrapper.length).toBe(3);

      expect(moviesWrapper.at(0).key()).toBe('id-1');
      expect(moviesWrapper.at(1).key()).toBe('id-2');
      expect(moviesWrapper.at(2).key()).toBe('id-3');
    });

    it('filtered according to the term given in the input field', () => {
      const wrapper = shallow(<Index {...props} />);

      // search for c
      wrapper.find('input').simulate('change', { target: { value: 'a' } });

      let moviesWrapper = wrapper.find(Movie);
      expect(moviesWrapper.length).toBe(2);

      expect(moviesWrapper.at(0).key()).toBe('id-1'); // director contains a
      expect(moviesWrapper.at(1).key()).toBe('id-3'); // title contains a

      // search for b
      wrapper.find('input').simulate('change', { target: { value: 'b' } });

      moviesWrapper = wrapper.find(Movie);
      expect(moviesWrapper.length).toBe(1);

      expect(moviesWrapper.at(0).key()).toBe('id-2'); // title and director contains b

      // search for x
      wrapper.find('input').simulate('change', { target: { value: 'x' } });

      moviesWrapper = wrapper.find(Movie);
      expect(moviesWrapper.length).toBe(0);
    });
  });

  describe('should render directors', () => {
    it('only if they have more than 1 movie', () => {
      let wrapper = shallow(<Index {...props} />);
      expect(wrapper.find(Director).length).toBe(1);

      // change number of movies of director 2
      props.directors[1].numberMovies = 3;
      wrapper = shallow(<Index {...props} />);
      expect(wrapper.find(Director).length).toBe(2);
    });
  });
});
