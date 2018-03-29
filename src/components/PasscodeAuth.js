import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, FormValidationMessage } from 'react-native-elements';

import FormRow from './FormRow';

class PasscodeAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passcode: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit() {
    this.props.handlePasscodeSubmit(this.state.passcode);
  }

  handleInputChange(stateKey, data) {
    this.setState({
      [stateKey]: data,
    });
  }

  render() {
    const { error } = this.props;
    const { passcode } = this.state;
    return (
      <View>
        <FormRow
          label="Passcode"
          name="passcode"
          value={passcode}
          onInputChange={this.handleInputChange}
        />
        {error ? <FormValidationMessage>{error}</FormValidationMessage> : null}
        <Button
          title="Enter Passcode"
          icon={{ name: 'lock-open' }}
          onPress={this.handleFormSubmit}
          buttonStyle={styles.buttonStyle}
          disabled={!passcode}
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

export default PasscodeAuth;
