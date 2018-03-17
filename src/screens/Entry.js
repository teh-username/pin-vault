import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

import {
  ADD_ENTRY,
  addEntry,
  modifyEntry,
  getEntryDetails,
} from '../redux/modules/listings';
import generateId from '../utils/idGenerator';

const modes = {
  add: 'ENTRY_ADD',
  modify: 'ENTRY_MODIFY',
};

const FormEntry = ({ label, value, onInputChange, editable }) => [
  <FormLabel key={`${label}_label`}>{label}</FormLabel>,
  <FormInput
    key={`${label}_input`}
    value={value}
    onChangeText={data => onInputChange(data)}
    placeholder={`Please enter ${label.toLowerCase()}...`}
    editable={editable}
  />,
];

class Entry extends React.Component {
  static navigationOptions = {
    title: 'New Entry',
  };

  constructor(props) {
    super(props);
    const action = props.navigation.state.params.action;
    this.state = {
      id: props.entryDetails ? props.entryDetails.id : null,
      name: props.entryDetails ? props.entryDetails.name : null,
      code: props.entryDetails ? props.entryDetails.code : null,
      mode: action === ADD_ENTRY ? modes.add : modes.modify,
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
    const { id, name, code } = this.state;
    this.props.handleSubmit(id, name, code);
    this.props.navigation.goBack();
  }

  render() {
    const { name, code, mode } = this.state;
    return (
      <View>
        <FormEntry
          label="Name"
          value={name}
          onInputChange={this.handleNameChange}
          editable={mode === modes.add}
        />
        <FormEntry
          label="Code"
          value={code}
          onInputChange={this.handleCodeChange}
        />
        <Button
          title={mode === modes.add ? 'Add' : 'Modify'}
          icon={{ name: mode === modes.add ? 'add' : 'mode-edit' }}
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

const mapStateToDispatch = (
  dispatch,
  { navigation: { state: { params: { action } } } }
) => ({
  handleSubmit(id, name, code) {
    if (action === ADD_ENTRY) {
      dispatch(addEntry(generateId(), name, code));
    } else {
      dispatch(modifyEntry(id, code));
    }
  },
});

const mapStateToProps = (
  state,
  { navigation: { state: { params: { id } } } }
) => ({
  entryDetails: id ? { ...getEntryDetails(state, id), id } : null,
});

export default connect(mapStateToProps, mapStateToDispatch)(Entry);
