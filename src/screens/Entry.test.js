import React from 'react';
import { Button } from 'react-native-elements';

import { Entry } from './Entry';
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
});
