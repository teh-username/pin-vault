import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';

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
