import * as actions from '../../../../src/app/common/auth/actions';
import { ROUTER_MOCK, DISPATCH, spyRouter, cleanRouter } from '../../../utils';

describe('Auth actions', () => {
  beforeEach(() => {
    spyRouter();
  });

  afterEach(() => {
    cleanRouter();
  });

  describe('login', () => {
    let credentials;
    let locationState;

    beforeEach(() => {
      credentials = {};
      locationState = {};
    });
    it('goes to start page after login was successful if no next pathname is set', () => {
      locationState = undefined;
      actions.login(credentials, ROUTER_MOCK, locationState)(DISPATCH);

      expect(ROUTER_MOCK.push).toHaveBeenCalledWith('/');
    });

    it('goes to a specific page after login was successful if next pathname is set', () => {
      locationState = {
        nextPathname: 'redirect-after-login',
      };
      actions.login(credentials, ROUTER_MOCK, locationState)(DISPATCH);

      expect(ROUTER_MOCK.push).toHaveBeenCalledWith('redirect-after-login');
    });
  });

  describe('logout', () => {
    it('goes to start page after logout was successful', () => {
      actions.logout(ROUTER_MOCK)(DISPATCH);

      expect(ROUTER_MOCK.push).toHaveBeenCalledWith('/');
    });
  });
});
