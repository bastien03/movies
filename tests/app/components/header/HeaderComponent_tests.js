import { shallow } from 'enzyme';
import React from 'react';
import Header from '../../../../src/app/components/header/HeaderComponent';
import { ROUTER_MOCK } from '../../../utils';

describe('<Header />', () => {
  const props = {
    logout: () => {},
    router: ROUTER_MOCK,
  };

  beforeEach(() => {
    props.logout = jasmine.createSpy('logout');
  });

  afterEach(() => {
    props.logout.calls.reset();
  });

  describe('logged in state', () => {
    it('should render a logout link', () => {
      props.isAuthenticated = {};
      const wrapper = shallow(<Header {...props} />);

      expect(wrapper.contains('logout')).toBeTruthy();
      expect(wrapper.contains('login')).toBeFalsy();
    });

    it('click on logout should call the props function', () => {
      props.isAuthenticated = {};
      const wrapper = shallow(<Header {...props} />);

      wrapper.find('.logoutLink').simulate('click');
      expect(props.logout).toHaveBeenCalledWith(ROUTER_MOCK);
    });
  });

  describe('logged out state', () => {
    it('should render a login link', () => {
      props.isAuthenticated = undefined;
      const wrapper = shallow(<Header {...props} />);

      expect(wrapper.contains('login')).toBeTruthy();
      expect(wrapper.contains('logout')).toBeFalsy();
    });
  });
});