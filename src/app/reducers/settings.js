import get from 'lodash/get';

function reducer(state = {
  language: 'en',
}, action) {
  if (action.type === 'SET_LANGUAGE') {
    return {
      language: action.data,
    };
  }

  return state;
}

export default reducer;

export function getLanguage(state) {
  return get(state, 'settings.language');
}
