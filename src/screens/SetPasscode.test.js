import React from 'react';

import {
  SetPasscode,
  mapDispatchToProps as dispatchProps,
} from './SetPasscode';

import { SET_PASSCODE } from '../redux/modules/settings';

describe('SetPasscode screen test', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<SetPasscode />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapDispatchToProps test', () => {
    it('should set the hashed passcode on submit and go back one route', () => {
      const dispatchMock = jest.fn();
      const ownPropsMock = {
        navigation: {
          goBack: jest.fn(),
        },
      };
      const props = dispatchProps(dispatchMock, ownPropsMock);
      props.handlePasscodeSubmit('password');
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0]).toEqual([
        {
          passcodeHash:
            '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
          type: SET_PASSCODE,
        },
      ]);

      expect(ownPropsMock.navigation.goBack.mock.calls.length).toBe(1);
    });
  });
});
