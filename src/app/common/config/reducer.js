import get from 'lodash/get';

const initialState = {
  context: '',
  isProd: true,
  version: '',
  deploymentDate: 0,
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

export function getVersion(state) {
  return get(state, 'config.version');
}

export function getDeploymentDate(state) {
  return get(state, 'config.deploymentDate');
}
