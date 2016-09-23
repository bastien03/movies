import get from 'lodash/get';

const initialState = {
  context: '',
  isProd: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;

export function isProd(state) {
  return get(state, 'config.isProd');
}
