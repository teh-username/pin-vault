import { combineReducers } from 'redux';

export const TOGGLE_PASSCODE_REQUIREMENT =
  'modules/settings/TOGGLE_PASSCODE_REQUIREMENT';
export const SET_PASSCODE = 'modules/settings/SET_PASSCODE';
export const RESET_PASSCODE_SETTINGS =
  'modules/settings/RESET_PASSCODE_SETTINGS';

/*
  Sample state:
  {
    requirePasscode:  true,
    passcodeHash: '5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8',
  }
 */

const initialState = {
  requirePasscode: false,
  passcodeHash: null,
};

export const requirePasscode = (
  state = initialState.requirePasscode,
  action
) => {
  switch (action.type) {
    case TOGGLE_PASSCODE_REQUIREMENT:
      return !state;
    case RESET_PASSCODE_SETTINGS:
      return initialState.requirePasscode;
    default:
      return state;
  }
};

export const passcodeHash = (state = initialState.passcodeHash, action) => {
  switch (action.type) {
    case SET_PASSCODE:
      return action.passcodeHash;
    case RESET_PASSCODE_SETTINGS:
      return initialState.passcodeHash;
    default:
      return state;
  }
};

export const togglePasscodeRequirement = () => ({
  type: TOGGLE_PASSCODE_REQUIREMENT,
});

export const setPasscode = passcodeHash => ({
  type: SET_PASSCODE,
  passcodeHash,
});

export const resetPasscodeSettings = () => ({
  type: RESET_PASSCODE_SETTINGS,
});

export default combineReducers({
  requirePasscode,
  passcodeHash,
});

export const getCurrentPasscode = ({ settings: { passcodeHash } }) =>
  passcodeHash;

export const getPasscodeRequirement = ({ settings: { requirePasscode } }) =>
  requirePasscode;
