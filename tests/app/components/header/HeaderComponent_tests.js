import { shallow, mount } from 'enzyme';
import React from 'react';
import Header from '../../../../src/app/components/header/HeaderComponent.jsx';
import { ROUTER_MOCK } from '../../../utils';

describe('<Header />', () => {
  const props = {
    logout: () => {},
    router: ROUTER_MOCK,
    store: {},
  };

  beforeEach(() => {
    props.logout = jasmine.createSpy('logout');
  });

  afterEach(() => {
    props.logout.calls.reset();
  });

  describe('logged in state', () => {
    it('should render a logout link', () => {
      props.isAuthenticated = { username: 'user1' };
      const wrapper = mount(<Header {...props} />);
      // console.log(wrapper.html());
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
