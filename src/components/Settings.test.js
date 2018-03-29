import React from 'react';
import { ListItem } from 'react-native-elements';

import Settings from './Settings';

describe('Settings component test', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should execute callback with the correct arguments', () => {
    const callbackMock = jest.fn();
    const wrapper = shallow(
      <Settings
        handleTogglePasscodeRequirement={callbackMock}
        currentPasscode="wololo"
        requirePasscode={false}
      />
    );
    const firstItem = wrapper.find(ListItem).at(0);
    firstItem.simulate('switch');
    expect(callbackMock.mock.calls.length).toBe(1);
    expect(callbackMock.mock.calls[0]).toEqual(['wololo', false]);
  });
});
