import React from 'react';
import { connect } from 'react-redux';
import { Alert, ScrollView } from 'react-native';

import {
  getPasscodeRequirement,
  getCurrentPasscode,
  togglePasscodeRequirement,
  resetPasscodeSettings,
} from '../redux/modules/settings';

import Settings from '../components/Settings';
import Debuggers from '../components/Debuggers';

export class Menu extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props) {
    super(props);
    this._navigateToPasscodeForm = this._navigateToPasscodeForm.bind(this);
  }

  _navigateToPasscodeForm() {
    this.props.navigation.navigate('SetPasscode');
  }

  render() {
    return (
      <ScrollView>
        <Settings
          {...this.props}
          handleSetPasscode={this._navigateToPasscodeForm}
        />
        <Debuggers handlePasscodeReset={this.props.onPasscodeSettingsReset} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  requirePasscode: getPasscodeRequirement(state),
  currentPasscode: getCurrentPasscode(state),
});

export const mapDispatchToProps = dispatch => ({
  handleTogglePasscodeRequirement(currentPasscode, requirePasscode) {
    if (!currentPasscode && !requirePasscode) {
      Alert.alert(
        'No Passcode Set',
        'Please set passcode first before enabling this option',
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false }
      );
      return;
    }
    dispatch(togglePasscodeRequirement());
  },
  onPasscodeSettingsReset() {
    Alert.alert(
      'Reset Passcode Settings',
      'This will reset all your passcode settings to default (No passcode). This will not affect your entries.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress() {
            dispatch(resetPasscodeSettings());
          },
        },
      ],
      { cancelable: false }
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
