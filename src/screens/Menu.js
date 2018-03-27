import React from 'react';
import { connect } from 'react-redux';
import { Alert, ScrollView } from 'react-native';

import {
  getPasscodeRequirement,
  getCurrentPasscode,
  togglePasscodeRequirement,
} from '../redux/modules/settings';
import Settings from '../components/Settings';

class Menu extends React.Component {
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
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  requirePasscode: getPasscodeRequirement(state),
  currentPasscode: getCurrentPasscode(state),
});

const mapDispatchToProps = dispatch => ({
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
