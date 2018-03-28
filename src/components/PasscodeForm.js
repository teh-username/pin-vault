import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, FormValidationMessage } from 'react-native-elements';

import FormRow from './FormRow';
import { hashString } from '../utils/crypto';

class PasscodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPasscode: '',
      passcode: '',
      repeatPasscode: '',
      error: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit() {
    const { currentPasscode, passcode, repeatPasscode } = this.state;
    const { oldPasscode } = this.props;
    if (passcode !== repeatPasscode) {
      this.setState({
        error: "Passcodes don't match",
      });
      return;
    }

    if (oldPasscode && hashString(currentPasscode) !== oldPasscode) {
      this.setState({
        error: 'Invalid current passcode',
      });
      return;
    }

    this.props.handlePasscodeSubmit(this.state.passcode);
    this.setState({
      error: null,
    });
  }

  handleInputChange(stateKey, data) {
    this.setState({
      [stateKey]: data,
    });
  }

  render() {
    const { oldPasscode } = this.props;
    const { currentPasscode, passcode, repeatPasscode, error } = this.state;
    return (
      <View>
        {oldPasscode ? (
          <FormRow
            label="Current Passcode"
            name="currentPasscode"
            value={currentPasscode}
            onInputChange={this.handleInputChange}
          />
        ) : null}
        <FormRow
          label="New Passcode"
          name="passcode"
          value={passcode}
          onInputChange={this.handleInputChange}
        />
        <FormRow
          label="Confirm New Passcode"
          name="repeatPasscode"
          value={repeatPasscode}
          onInputChange={this.handleInputChange}
        />
        {error ? <FormValidationMessage>{error}</FormValidationMessage> : null}
        <Button
          title="Set Passcode"
          icon={{ name: 'add' }}
          onPress={this.handleFormSubmit}
          buttonStyle={styles.buttonStyle}
          disabled={!passcode || !repeatPasscode}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    top: 40,
    backgroundColor: '#669AE0',
  },
});

export default PasscodeForm;
