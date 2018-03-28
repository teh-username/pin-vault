import React from 'react';

import { Auth } from './Auth';

describe('Auth screen test', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<Auth />, {
      disableLifecycleMethods: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect to Home route if passcode protection is off', () => {
    const navMock = {
      navigate: jest.fn(),
      dispatch: jest.fn(),
    };
    const wrapper = shallow(
      <Auth requirePasscode={false} navigation={navMock} />
    );
    expect(navMock.navigate.mock.calls.length).toBe(1);
    expect(navMock.navigate.mock.calls[0][0]).toBe('Home');
    expect(navMock.dispatch.mock.calls[0][0]).toEqual({
      type: 'Navigation/RESET',
      index: 0,
      key: undefined,
      actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Home' }],
    });
  });

  it('should not redirect to Home route if passcode protection is on', () => {
    const navMock = {
      navigate: jest.fn(),
      dispatch: jest.fn(),
    };
    const wrapper = shallow(
      <Auth requirePasscode={true} navigation={navMock} />
    );
    expect(navMock.navigate.mock.calls.length).toBe(0);
  });

  it('should throw an error if entered passcode is invalid and not redirect to Home', () => {
    const navMock = {
      navigate: jest.fn(),
      dispatch: jest.fn(),
    };
    const wrapper = shallow(
      <Auth
        requirePasscode={true}
        currentPasscode="5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
        navigation={navMock}
      />
    );

    wrapper.instance()._isPasscodeValid('notpassword');
    expect(wrapper.state('error')).toEqual('Passcode Invalid!');
    expect(navMock.navigate.mock.calls.length).toBe(0);
  });

  it('should redirect to Home if passcode entered is valid', () => {
    const navMock = {
      navigate: jest.fn(),
      dispatch: jest.fn(),
    };
    const wrapper = shallow(
      <Auth
        requirePasscode={true}
        currentPasscode="5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
        navigation={navMock}
      />
    );
    wrapper.instance()._isPasscodeValid('password');
    expect(wrapper.state('error')).toEqual(null);
    expect(navMock.navigate.mock.calls.length).toBe(1);
    expect(navMock.navigate.mock.calls[0][0]).toBe('Home');
    expect(navMock.dispatch.mock.calls[0][0]).toEqual({
      type: 'Navigation/RESET',
      index: 0,
      key: undefined,
      actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Home' }],
    });
  });
});
