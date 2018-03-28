import React from 'react';
import { Icon } from 'react-native-elements';

import { Home } from './Home';
import { ADD_ENTRY } from '../redux/modules/listings';

describe('Home screen test', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should navigate to Entry screen if the add button is pressed', () => {
    const navMock = {
      navigate: jest.fn(),
    };
    const wrapper = shallow(<Home />);
    const addButton = shallow(
      wrapper.instance()._renderAddButton(navMock)
    ).find(Icon);
    addButton.simulate('press');
    expect(navMock.navigate.mock.calls.length).toBe(1);
    expect(navMock.navigate.mock.calls[0]).toEqual([
      'Entry',
      {
        action: ADD_ENTRY,
      },
    ]);
  });

  it('should navigate to Details screen if an entry is pressed', () => {
    const navMock = {
      navigate: jest.fn(),
    };
    const wrapper = shallow(<Home navigation={navMock} />);
    wrapper.instance().onEntryPress(2);
    expect(navMock.navigate.mock.calls.length).toBe(1);
    expect(navMock.navigate.mock.calls[0]).toEqual(['Details', { id: 2 }]);
  });
});
