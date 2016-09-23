import reducer from '../../../../src/app/common/config/reducer';

describe('Config reducer', () => {
  let state;
  let action;
  beforeEach(() => {
    state = {
      a: 'b',
      c: 'd',
    };
    action = {};
  });

  it('does nothing', () => {
    action = {
      type: 'WHATEVER',
    };
    const newState = reducer(state, action);

    expect(newState).toEqual(state);
  });
});
