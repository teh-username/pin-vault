import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSecureStore from 'redux-persist-expo-securestore';

import rootReducer from './reducers';

const storage = createSecureStore();
const persistConfig = {
  key: 'pin-vault',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);

  if (process.env.NODE_ENV === 'development') {
    store.subscribe(() => {
      console.log(store.getState());
    });
  }

  let persistor = persistStore(store);
  return { store, persistor };
};
