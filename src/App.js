import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import RootStack from './config/router';
import reducer from './redux';

const App = () => <RootStack />;

const store = createStore(reducer);

if (process.env.NODE_ENV === 'development') {
  store.subscribe(() => {
    console.log(store.getState());
  });
}

export default (RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
));
