import React from 'react';
import { Alert } from 'react-native';

import { Details } from './Details';
import { MODIFY_ENTRY } from '../redux/modules/listings';

describe('Details screen test', () => {
  const navigationMock = {
    state: {
      params: {
        id: 10,
      },
    },
  };

  const entryDetailsMock = {
    name: 'malak',
    code: '1234',
  };

  it('should render as expected', () => {
    const wrapper = shallow(
      <Details navigation={navigationMock} entryDetails={entryDetailsMock} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should navigate to Entry screen and pass the correct params on edit', () => {
    const navMock = {
      ...navigationMock,
      navigate: jest.fn(),
    };
    const wrapper = shallow(
      <Details navigation={navMock} entryDetails={entryDetailsMock} />
    );
    wrapper.instance().handleEditPress();
    expect(navMock.navigate.mock.calls.length).toBe(1);
    expect(navMock.navigate.mock.calls[0][0]).toBe('Entry');
    expect(navMock.navigate.mock.calls[0][1]).toEqual({
      action: MODIFY_ENTRY,
      id: 10,
    });
  });

  it('should delete entry and navigate back to Home on alert click', () => {
    jest.mock('Alert', () => ({
      alert: jest.fn(),
    }));

    const mockDelete = jest.fn();
    const navMock = {
      ...navigationMock,
      popToTop: jest.fn(),
    };

    const wrapper = shallow(
      <Details
        navigation={navMock}
        entryDetails={entryDetailsMock}
        handleDeleteEntry={mockDelete}
      />
    );
    wrapper.instance().handleDeletionPress();
    Alert.alert.mock.calls[0][2][1].onPress();
    expect(mockDelete.mock.calls.length).toBe(1);
    expect(mockDelete.mock.calls[0][0]).toBe(10);
    expect(navMock.popToTop.mock.calls.length).toBe(1);
  });
});
