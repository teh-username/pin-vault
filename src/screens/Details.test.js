import React from 'react';
import { Alert } from 'react-native';

import {
  Details,
  mapDispatchToProps as dispatchProps,
  mapStateToProps as stateProps,
} from './Details';
import { MODIFY_ENTRY, DELETE_ENTRY } from '../redux/modules/listings';

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

  describe('mapDispatchToProps test', () => {
    it('should dispatch the delete entry action', () => {
      const dispatchMock = jest.fn();
      const props = dispatchProps(dispatchMock);
      props.handleDeleteEntry(123);
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0]).toEqual([
        { type: DELETE_ENTRY, id: 123 },
      ]);
    });
  });

  describe('mapStateToProps test', () => {
    it('should get the correct key from state tree', () => {
      const stateMock = {
        listings: {
          entries: {
            123: 'you found me',
          },
        },
      };
      const navMock = {
        navigation: {
          state: {
            params: {
              id: 123,
            },
          },
        },
      };

      const props = stateProps(stateMock, navMock);
      expect(props).toEqual({
        entryDetails: 'you found me',
      });
    });

    it('should default to an empty object if entry does not exist', () => {
      const stateMock = {
        listings: {
          entries: {
            456: 'you found me',
          },
        },
      };
      const navMock = {
        navigation: {
          state: {
            params: {
              id: 123,
            },
          },
        },
      };

      const props = stateProps(stateMock, navMock);
      expect(props).toEqual({
        entryDetails: {},
      });
    });
  });
});
