import React from 'react';
import { FormValidationMessage } from 'react-native-elements';

import PasscodeAuth from './PasscodeAuth';

describe('PasscodeAuth component test', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<PasscodeAuth />);
    expect(wrapper.find(FormValidationMessage).length).toEqual(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render error message if there are any', () => {
    const wrapper = shallow(<PasscodeAuth error="needs triage" />);
    expect(wrapper.find(FormValidationMessage).prop('children')).toEqual(
      'needs triage'
    );
    expect(wrapper).toMatchSnapshot();
  });
});
