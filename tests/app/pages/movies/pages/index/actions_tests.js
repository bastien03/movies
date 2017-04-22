import fetchMovies from '../../../../../../src/app/pages/movies/pages/index/actions';

describe('Index Page actions', () => {
  it('processes directors with an empty movie list', () => {
    const fetchActions = fetchMovies();
    const result = fetchActions.API.responseProcessor([]);

    expect(result.movies).toEqual([]);
    expect(result.directors).toEqual([]);
  });

  it('processes directors with an undefined movie list', () => {
    const fetchActions = fetchMovies();
    const result = fetchActions.API.responseProcessor(undefined);

    expect(result.movies).toEqual(undefined);
    expect(result.directors).toEqual([]);
  });

  it('processes directors with a non array movie list ', () => {
    const fetchActions = fetchMovies();
    const result = fetchActions.API.responseProcessor({});

    expect(result.movies).toEqual({});
    expect(result.directors).toEqual([]);
  });

  it('processes directors from a movies list', () => {
    const fetchActions = fetchMovies();
    const result = fetchActions.API.responseProcessor([
      { director: 'a', title: 'a-1' },
      { director: 'a', title: 'a-2' },
      { director: 'b', title: 'b-1' },
    ]);

    expect(result.directors).toEqual([
      { name: 'a', numberMovies: 2 },
      { name: 'b', numberMovies: 1 },
    ]);
  });

  it('processes directors from a list of one movie', () => {
    const fetchActions = fetchMovies();
    const result = fetchActions.API.responseProcessor([
      { director: 'a', title: 'a-1' },
    ]);

    expect(result.directors).toEqual([
      { name: 'a', numberMovies: 1 },
    ]);
  });
});
