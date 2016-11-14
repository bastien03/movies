import fetchMovies from '../../../../src/app/pages/index/actions';

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
});
