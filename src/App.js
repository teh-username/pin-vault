import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import RootStack from './config/router';
import reducer from './redux';

const App = () => <RootStack />;

export default (RootApp = () => (
  <Provider store={createStore(reducer)}>
    <App />
  </Provider>
));
