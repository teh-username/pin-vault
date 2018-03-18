import React from 'react';
import EntryDetail from './EntryDetail';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer
    .create(<EntryDetail name="test" code="code" />)
    .toJSON();
  expect(rendered).toBeTruthy();
});
