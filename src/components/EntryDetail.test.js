import React from 'react';
import EntryDetail, { ButtonRow } from './EntryDetail';

describe('EntryDetail Component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<EntryDetail name="name" code="code" />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('ButtonRow Component', () => {
    it('renders as expected', () => {
      const wrapper = shallow(
        <ButtonRow onEditPress={() => {}} onDeletePress={() => {}} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
