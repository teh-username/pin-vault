import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, FormValidationMessage } from 'react-native-elements';

import FormRow from './FormRow';

class PasscodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passcode: '',
      repeatPasscode: '',
      error: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit() {
    const { passcode, repeatPasscode } = this.state;

    if (passcode !== repeatPasscode) {
      this.setState({
        error: "Passcodes doesn't match",
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
    const { passcode, repeatPasscode, error } = this.state;
    return (
      <View>
        <FormRow
          label="Passcode"
          name="passcode"
          value={passcode}
          onInputChange={this.handleInputChange}
        />
        <FormRow
          label="Confirm Passcode"
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
