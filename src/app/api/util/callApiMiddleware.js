import { showLoading, hideLoading } from 'react-redux-loading-bar';

function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    if (!action.API) {
      return next(action);
    }

    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
    } = action.API;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return next(action);
    }

    dispatch(showLoading());

    const [requestType, successType, failureType] = types;

    dispatch(Object.assign({}, payload, {
      type: requestType,
    }));

    return callAPI().then(
      response => {
        dispatch(Object.assign({}, payload, {
          response,
          type: successType,
        }));
        dispatch(hideLoading());
      },
      error => {
        dispatch(Object.assign({}, payload, {
          error,
          type: failureType,
        }));
        dispatch(hideLoading());
      }
    );
  };
}

export default callAPIMiddleware;
