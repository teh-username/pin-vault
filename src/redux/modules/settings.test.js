import {
  requirePasscode as requirePasscodeReducer,
  passcodeHash as passcodeHashReducer,
  togglePasscodeRequirement,
  resetPasscodeSettings,
  setPasscode,
} from './settings';

describe('settings modules test', () => {
  describe('requirePasscode reducer test', () => {
    it('should return the initial state', () => {
      expect(requirePasscodeReducer(undefined, {})).toEqual(false);
    });

    it('should set the requirement to false if previously true', () => {
      expect(requirePasscodeReducer(true, togglePasscodeRequirement())).toEqual(
        false
      );
    });

    it('should set the requirement to true if previously false', () => {
      expect(
        requirePasscodeReducer(false, togglePasscodeRequirement())
      ).toEqual(true);
    });

    it('should reset the requirement correctly (reset to initial state)', () => {
      expect(requirePasscodeReducer(true, resetPasscodeSettings())).toEqual(
        false
      );
    });
  });

  describe('passcodeHash reducer test', () => {
    it('should return the initial state', () => {
      expect(passcodeHashReducer(undefined, {})).toEqual(null);
    });

    it('should set the hash correctly', () => {
      expect(
        passcodeHashReducer(undefined, setPasscode('HASH HASH BABY'))
      ).toEqual('HASH HASH BABY');
    });

    it('should reset passcode hash correctly (reset to initial state)', () => {
      expect(
        passcodeHashReducer('HASH HASH BABY', resetPasscodeSettings())
      ).toEqual(null);
    });
  });
});
