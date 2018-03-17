import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

import { addEntry } from '../redux/modules/listings';
import generateId from '../utils/idGenerator';

const FormEntry = ({ label, value, onInputChange }) => [
  <FormLabel key={`${label}_label`}>{label}</FormLabel>,
  <FormInput
    key={`${label}_input`}
    value={value}
    onChangeText={data => onInputChange(data)}
    placeholder={`Please enter ${label.toLowerCase()}...`}
  />,
];

class AddEntry extends React.Component {
  static navigationOptions = {
    title: 'New Entry',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      code: null,
    };
    this.handleNameChange = this.handleInputChange.bind(this, 'name');
    this.handleCodeChange = this.handleInputChange.bind(this, 'code');
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(stateKey, data) {
    this.setState({
      [stateKey]: data,
    });
  }

  handleSubmit() {
    const { name, code } = this.state;
    this.props.handleSubmit(name, code);
    this.props.navigation.goBack();
  }

  render() {
    const { name, code } = this.state;
    return (
      <View>
        <FormEntry
          label="Name"
          value={name}
          onInputChange={this.handleNameChange}
        />
        <FormEntry
          label="Code"
          value={code}
          onInputChange={this.handleCodeChange}
        />
        <Button
          title="Add"
          icon={{ name: 'add' }}
          onPress={this.handleSubmit}
          buttonStyle={styles.buttonStyle}
          disabled={!name || !code}
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

const mapStateToDispatch = dispatch => ({
  handleSubmit(name, code) {
    dispatch(addEntry(generateId(), name, code));
  },
});

export default connect(null, mapStateToDispatch)(AddEntry);
