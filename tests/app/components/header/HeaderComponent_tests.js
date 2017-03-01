import { shallow, mount } from 'enzyme';
import React from 'react';
import Header from '../../../../src/app/components/header/HeaderComponent.jsx';
import { ROUTER_MOCK } from '../../../utils';

describe('<Header />', () => {
  const props = {
    logout: () => {},
    router: ROUTER_MOCK,
  };

  const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({}),
  };
  const options = {
    context: { store },
    childContextTypes: { store: React.PropTypes.object.isRequired },
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
      const wrapper = mount(<Header {...props} />, options);

      expect(wrapper.text()).toContain('logout');
      expect(wrapper.text()).not.toContain('login');
    });

    it('click on logout should call the props function', () => {
      props.isAuthenticated = {};
      const wrapper = mount(<Header {...props} />, options);

      wrapper.find('.logoutLink').simulate('click');
      expect(props.logout).toHaveBeenCalledWith(ROUTER_MOCK);
    });
  });

  describe('logged out state', () => {
    it('should render a login link', () => {
      props.isAuthenticated = undefined;
      const wrapper = mount(<Header {...props} />, options);

      expect(wrapper.text()).toContain('login');
      expect(wrapper.text()).not.toContain('logout');
    });
  });
});
