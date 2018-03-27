import { combineReducers } from 'redux';

import listings from './modules/listings';
import settings from './modules/settings';

export default combineReducers({
  listings,
  settings,
});
