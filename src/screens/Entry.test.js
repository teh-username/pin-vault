import React from 'react';
import { Button } from 'react-native-elements';

import {
  Entry,
  mapStateToDispatch as dispatchProps,
  mapStateToProps as stateProps,
} from './Entry';
import FormRow from '../components/FormRow';
import { ADD_ENTRY, MODIFY_ENTRY } from '../redux/modules/listings';

describe('Entry screen test', () => {
  const navigationMock = {
    state: {
      params: {
        action: ADD_ENTRY,
      },
    },
  };

  const entryDetailsMock = {
    id: 'mockId',
    name: 'mockName',
    code: 'mockCode',
  };

  it('should render as expected', () => {
    const wrapper = shallow(<Entry navigation={navigationMock} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when adding an entry', () => {
    const wrapper = shallow(<Entry navigation={navigationMock} />);
    expect(wrapper.state()).toEqual({
      id: null,
      name: null,
      code: null,
      mode: 'ENTRY_ADD',
    });

    const nameInput = wrapper.find(FormRow).at(0);
    const submitButton = wrapper.find(Button);

    expect(nameInput.prop('editable')).toBe(true);
    expect(submitButton.prop('title')).toBe('Add');
    expect(submitButton.prop('icon')).toEqual({
      name: 'add',
    });
  });

  it('should render correctly when editing an entry', () => {
    const navMock = {
      state: {
        params: {
          action: MODIFY_ENTRY,
        },
      },
    };
    const wrapper = shallow(
      <Entry navigation={navMock} entryDetails={entryDetailsMock} />
    );
    expect(wrapper.state()).toEqual({
      id: 'mockId',
      name: 'mockName',
      code: 'mockCode',
      mode: 'ENTRY_MODIFY',
    });

    const nameInput = wrapper.find(FormRow).at(0);
    const submitButton = wrapper.find(Button);

    expect(nameInput.prop('editable')).toBe(false);
    expect(submitButton.prop('title')).toBe('Modify');
    expect(submitButton.prop('icon')).toEqual({
      name: 'mode-edit',
    });
  });

  it('should disable the button when either or both input is empty', () => {
    const wrapper = shallow(<Entry navigation={navigationMock} />);
    const submitButton = wrapper.find(Button);
    expect(submitButton.prop('disabled')).toBe(true);
  });

  it('should enable the button when both are non-empty', () => {
    const wrapper = shallow(
      <Entry navigation={navigationMock} entryDetails={entryDetailsMock} />
    );
    const submitButton = wrapper.find(Button);
    expect(submitButton.prop('disabled')).toBe(false);
  });

  it('should navigate back on entry submission', () => {
    const navMock = {
      ...navigationMock,
      goBack: jest.fn(),
    };
    const submitMock = jest.fn();
    const wrapper = shallow(
      <Entry
        navigation={navMock}
        entryDetails={entryDetailsMock}
        handleSubmit={submitMock}
      />
    );

    wrapper.instance().handleSubmit();
    expect(navMock.goBack.mock.calls.length).toBe(1);
    expect(submitMock.mock.calls.length).toBe(1);
    expect(submitMock.mock.calls[0]).toEqual([
      'mockId',
      'mockName',
      'mockCode',
    ]);
  });

  describe('mapStateToDispatch test', () => {
    it('should dispatch the add action if current action is adding of entry', () => {
      const dispatchMock = jest.fn();
      const navMock = {
        navigation: {
          state: {
            params: {
              action: ADD_ENTRY,
            },
          },
        },
      };

      const props = dispatchProps(dispatchMock, navMock);
      props.handleSubmit('testId', 'testName', 'testCode');
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0]).toEqual([
        {
          type: ADD_ENTRY,
          id: expect.any(String),
          name: 'testName',
          code: 'testCode',
        },
      ]);
    });

    it('should dispatch entry modify if current action is not of adding entry', () => {
      const dispatchMock = jest.fn();
      const navMock = {
        navigation: {
          state: {
            params: {
              action: MODIFY_ENTRY,
            },
          },
        },
      };

      const props = dispatchProps(dispatchMock, navMock);
      props.handleSubmit('testId', 'testName', 'testCode');
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0]).toEqual([
        {
          type: MODIFY_ENTRY,
          id: 'testId',
          code: 'testCode',
        },
      ]);
    });
  });

  describe('mapStateToProps', () => {
    it('should retrieve the correct entry details if id is not null', () => {
      const stateMock = {
        listings: {
          entries: {
            12: {
              data: 'nope nothing to see here',
            },
          },
        },
      };
      const navMock = {
        navigation: {
          state: {
            params: {
              id: 12,
            },
          },
        },
      };

      const props = stateProps(stateMock, navMock);
      expect(props).toEqual({
        entryDetails: {
          data: 'nope nothing to see here',
          id: 12,
        },
      });
    });

    it('should return a null object if id is falsy', () => {
      const stateMock = {
        listings: {
          entries: {
            12: {
              data: 'nope nothing to see here',
            },
          },
        },
      };
      const navMock = {
        navigation: {
          state: {
            params: {
              id: '',
            },
          },
        },
      };

      const props = stateProps(stateMock, navMock);
      expect(props).toEqual({
        entryDetails: null,
      });
    });
  });
});
