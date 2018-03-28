import React from 'react';
import { FormValidationMessage } from 'react-native-elements';

import PasscodeForm from './PasscodeForm';
import FormRow from './FormRow';

describe('PasscodeForm component test', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<PasscodeForm />);
    expect(wrapper.find(FormRow).length).toEqual(2);
    expect(
      wrapper
        .find(FormRow)
        .at(0)
        .prop('label')
    ).toEqual('New Passcode');
    expect(wrapper).toMatchSnapshot();
  });

  it('should render old passcode input if user has previously set passcode', () => {
    const wrapper = shallow(<PasscodeForm oldPasscode="passcode" />);
    expect(wrapper.find(FormRow).length).toEqual(3);
    expect(
      wrapper
        .find(FormRow)
        .at(0)
        .prop('label')
    ).toEqual('Current Passcode');
    expect(wrapper).toMatchSnapshot();
  });

  it('should render error field if there are any errors', () => {
    const wrapper = shallow(<PasscodeForm />);
    wrapper.setState({ error: 'error' });
    expect(wrapper.find(FormValidationMessage).prop('children')).toEqual(
      'error'
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should return an error message if passcode and repeat passcode do not match', () => {
    const wrapper = shallow(<PasscodeForm />);
    wrapper.setState({
      passcode: 'yes',
      repeatPasscode: 'no',
    });
    wrapper.instance().handleFormSubmit();
    expect(wrapper.state('error')).toEqual("Passcodes don't match");
  });

  it('should return an error message if verification passcode does not match the current passcode', () => {
    const wrapper = shallow(
      <PasscodeForm oldPasscode="5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" />
    );
    wrapper.setState({
      passcode: 'yes',
      repeatPasscode: 'yes',
      currentPasscode: 'notPassword',
    });
    wrapper.instance().handleFormSubmit();
    expect(wrapper.state('error')).toEqual('Invalid current passcode');
  });

  it('should call callback if user has matching passcode and has not previously set a passcode', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <PasscodeForm handlePasscodeSubmit={mockCallback} />
    );
    wrapper.setState({
      passcode: 'yes',
      repeatPasscode: 'yes',
    });

    wrapper.instance().handleFormSubmit();
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe('yes');
  });

  it('should call callback if user has matching passcode and has a correct old passcode ', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <PasscodeForm
        handlePasscodeSubmit={mockCallback}
        oldPasscode="5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
      />
    );
    wrapper.setState({
      passcode: 'nope',
      repeatPasscode: 'nope',
      currentPasscode: 'password',
    });
    wrapper.instance().handleFormSubmit();
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe('nope');
  });
});
