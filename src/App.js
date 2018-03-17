import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

import RootStack from './config/router';
import configureStore from './redux/configureStore';

const { persistor, store } = configureStore();

export default (RootApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootStack />
    </PersistGate>
  </Provider>
));
