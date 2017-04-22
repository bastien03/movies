import addMovie from '../../../../../../src/app/pages/movies/pages/insert/actions';
import { ROUTER_MOCK, DISPATCH, spyRouter, cleanRouter } from '../../../../../utils';

describe('Insert Page actions', () => {
  beforeEach(() => {
    spyRouter();
  });

  afterEach(() => {
    cleanRouter();
  });

  it('goes to start page after having successfully saved the movie', () => {
    addMovie('movie', ROUTER_MOCK)(DISPATCH);

    expect(ROUTER_MOCK.push).toHaveBeenCalledWith('/');
  });
});
