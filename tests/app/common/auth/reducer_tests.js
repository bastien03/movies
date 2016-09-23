import reducer from '../../../../src/app/common/auth/reducer';

describe('Auth reducer', () => {
  let state;
  let action;
  beforeEach(() => {
    state = {};
    action = {};
  });

  it('saves user on login request', () => {
    action = {
      type: 'LOGIN_SUCCESS',
      response: 'user',
    };
    const newState = reducer(state, action);

    expect(newState).toEqual({
      isAuthenticated: 'user',
    });

    expect(state).toEqual({});  // state did not mutate
  });

  it('cleans user on logout request', () => {
    action = {
      type: 'LOGOUT_SUCCESS',
    };
    state = {
      isAuthenticated: 'user',
    };
    const newState = reducer(state, action);

    expect(newState).toEqual({});

    expect(state).toEqual({
      isAuthenticated: 'user',
    }); // state did not mutate
  });
});
