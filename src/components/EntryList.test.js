import React from 'react';
import EntryList from './EntryList';

describe('EntryList component', () => {
  it('should render as expected', () => {
    const sampleEntries = [
      ['md391', { name: 'Bank 1' }],
      ['krni8', { name: 'Bank 2' }],
      ['jr278', { name: 'Bank 3' }],
    ];
    const wrapper = shallow(
      <EntryList entries={sampleEntries} onPress={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
