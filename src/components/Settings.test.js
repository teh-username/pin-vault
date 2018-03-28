import React from 'react';

import Settings from './Settings';

describe('Settings component test', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toMatchSnapshot();
  });
});
