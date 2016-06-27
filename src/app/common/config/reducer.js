import uris from '../../../uris';

function reducer(state = {
  context: uris.getContext(),
}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
