import React from 'react';
import { Alert } from 'react-native';

import { Menu, mapDispatchToProps as dispatchProps } from './Menu';
import {
  TOGGLE_PASSCODE_REQUIREMENT,
  RESET_PASSCODE_SETTINGS,
} from '../redux/modules/settings';

describe('Menu screen test', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<Menu />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapDispatchToProps test', () => {
    beforeEach(() => {
      jest.resetModules();
      jest.mock('Alert', () => ({
        alert: jest.fn(),
      }));
    });

    describe('handleTogglePasscodeRequirement test', () => {
      it('should not activate passscode requirement if user no passcode set yet', () => {
        const dispatchMock = jest.fn();
        const props = dispatchProps(dispatchMock);
        props.handleTogglePasscodeRequirement(null, false);
        expect(Alert.alert.mock.calls.length).toBe(1);
        expect(dispatchMock.mock.calls.length).toBe(0);
      });

      it('should activate passcode requirement if user has set a passcode', () => {
        const dispatchMock = jest.fn();
        const props = dispatchProps(dispatchMock);
        props.handleTogglePasscodeRequirement('HASH', true);
        expect(Alert.alert.mock.calls.length).toBe(0);
        expect(dispatchMock.mock.calls.length).toBe(1);
        expect(dispatchMock.mock.calls[0]).toEqual([
          { type: TOGGLE_PASSCODE_REQUIREMENT },
        ]);
      });
    });

    describe('onPasscodeSettingsReset test', () => {
      it('should dispatch reset action if user presses OK', () => {
        const dispatchMock = jest.fn();
        const props = dispatchProps(dispatchMock);
        props.onPasscodeSettingsReset();
        expect(Alert.alert.mock.calls.length).toBe(1);
        Alert.alert.mock.calls[0][2][1].onPress();
        expect(dispatchMock.mock.calls[0]).toEqual([
          { type: RESET_PASSCODE_SETTINGS },
        ]);
      });
    });
  });
});
