import reducer, { getDirectorMovies } from '../../../../../src/app/pages/movies/reducers/movies';

describe('Movies reducer', () => {
  let action;
  let state;
  beforeEach(() => {
    action = {};
    state = {};
  });

  it('saves movies and directors on loading movies request', () => {
    action = {
      type: 'LOAD_MOVIES_SUCCESS',
      response: {
        movies: 'movies',
        directors: 'directors',
      },
    };
    const newState = reducer(state, action);

    expect(newState).toEqual({
      all: 'movies',
      directors: 'directors',
    });

    expect(state).toEqual({}); // state has not be mutated
  });

  it('saves current movie on loading one movie request', () => {
    action = {
      type: 'FETCH_MOVIE_SUCCESS',
      response: 'current-movie',
    };
    const newState = reducer(state, action);

    expect(newState).toEqual({
      movie: 'current-movie',
    });

    expect(state).toEqual({}); // state has not be mutated
  });

  it('add new movie to current list on adding movie request', () => {
    state = {
      all: ['movie-1', 'movie-2'],
    };

    action = {
      type: 'ADD_MOVIE_SUCCESS',
      response: 'new-movie',
    };
    const newState = reducer(state, action);

    expect(newState).toEqual({
      all: ['movie-1', 'movie-2', 'new-movie'],
    });

    expect(state).toEqual({
      all: ['movie-1', 'movie-2'],
    }); // state has not be mutated
  });

  describe('while removing one movie', () => {
    beforeEach(() => {
      state = {
        all: [{ id: 'movie-id-1' }, { id: 'movie-id-2' }],
      };
    });

    it('remove one movie to current list on deleting movie request', () => {
      action = {
        type: 'REMOVE_MOVIE_SUCCESS',
        movieId: 'movie-id-1',
      };
      const newState = reducer(state, action);

      expect(newState).toEqual({
        all: [{ id: 'movie-id-2' }],
      });

      expect(state).toEqual({
        all: [{ id: 'movie-id-1' }, { id: 'movie-id-2' }],
      }); // state has not be mutated
    });

    it('does not remove anything if movie is not in the list', () => {
      action = {
        type: 'REMOVE_MOVIE_SUCCESS',
        movieId: 'non-existing-id',
      };
      const newState = reducer(state, action);

      expect(newState).toEqual({
        all: [{ id: 'movie-id-1' }, { id: 'movie-id-2' }],
      });

      expect(state).toEqual({
        all: [{ id: 'movie-id-1' }, { id: 'movie-id-2' }],
      }); // state has not be mutated
    });
  });

  describe('handles movies by directors', () => {
    beforeEach(() => {
      state = {
        movies: {
          all: [
            { director: 'john', id: 'movie-id-1' },
            { director: 'alfred', id: 'movie-id-2' },
            { director: 'john', id: 'movie-id-3' },
          ],
        },
      };
    });

    it('returns only movies of a given director', () => {
      const movies = getDirectorMovies(state, 'john');
      expect(movies).toEqual([
        { director: 'john', id: 'movie-id-1' },
        { director: 'john', id: 'movie-id-3' },
      ]);
    });

    it('returns an empty list if there are no movies for a given director', () => {
      const movies = getDirectorMovies(state, 'non-existing-director');
      expect(movies).toEqual([]);
    });

    it('returns an empty list if there are no movies at all', () => {
      state.movies.all = undefined;

      const movies = getDirectorMovies(state, 'john');
      expect(movies).toEqual([]);
    });
  });
});
