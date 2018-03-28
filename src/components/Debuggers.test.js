import React from 'react';
import Debuggers from './Debuggers';

describe('Debuggers component test', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Debuggers handlePasscodeReset={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
