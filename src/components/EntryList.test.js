import React from 'react';
import EntryList from './EntryList';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';

describe('EntryList component', () => {
  it('should render CTA if there are no entries yet', () => {
    const wrapper = shallow(<EntryList entries={[]} onPress={() => {}} />);
    expect(wrapper.find(Text).length).toEqual(2);
    expect(wrapper.find(ListItem).length).toEqual(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render entries if there are any', () => {
    const sampleEntries = [
      ['md391', { name: 'Bank 1' }],
      ['krni8', { name: 'Bank 2' }],
      ['jr278', { name: 'Bank 3' }],
    ];
    const wrapper = shallow(
      <EntryList entries={sampleEntries} onPress={() => {}} />
    );
    expect(wrapper.find(ListItem).length).toEqual(3);
    expect(wrapper).toMatchSnapshot();
  });
});
