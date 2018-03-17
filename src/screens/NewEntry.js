import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

const FormEntry = ({ label }) => [
  <FormLabel key={`${label}_label`}>Name</FormLabel>,
  <FormInput
    key={`${label}_input`}
    onChangeText={() => {
      console.log(`editing ${label}`);
    }}
    placeholder={`Please enter ${label.toLowerCase()}...`}
  />,
];

class NewEntryForm extends React.Component {
  static navigationOptions = {
    title: 'New Entry',
  };

  render() {
    return (
      <View>
        <FormEntry label="Name" />
        <FormEntry label="Code" />
        <Button
          title="Add"
          icon={{ name: 'done' }}
          onPress={() => {
            console.log('add-ing entry');
          }}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    top: 20,
  },
});

export default NewEntryForm;
