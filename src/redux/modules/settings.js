import { combineReducers } from 'redux';

export const TOGGLE_PASSCODE_REQUIREMENT =
  'modules/settings/TOGGLE_PASSCODE_REQUIREMENT';

/*
  Sample state:
  {
    requirePasscode:  true
  }
 */

const initialState = {
  requirePasscode: false,
};

const requirePasscode = (state = initialState.requirePasscode, action) => {
  switch (action.type) {
    case TOGGLE_PASSCODE_REQUIREMENT: {
      return !state;
    }
    default:
      return state;
  }
};

export const togglePasscodeRequirement = () => ({
  type: TOGGLE_PASSCODE_REQUIREMENT,
});

export default combineReducers({
  requirePasscode,
});

export const getPasscodeRequirement = ({ settings: { requirePasscode } }) =>
  requirePasscode;
