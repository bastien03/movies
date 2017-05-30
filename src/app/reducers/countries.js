import countries from '../../countries';

function reducer(state = countries) {
  return state;
}

export function getCountryCodes(state) {
  return Object.keys(state);
}

export function getCountryName(countriesState, code) {
  return countriesState[code];
}

export function getCountries(state) {
  return state.countries;
}

export default reducer;
