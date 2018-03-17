import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

const ButtonRow = () => (
  <View style={styles.buttonRow}>
    <Button
      title="Edit"
      icon={{ name: 'mode-edit' }}
      onPress={() => {
        console.log('heelloo');
      }}
      buttonStyle={styles.buttonStyle}
    />
    <Button
      title="Delete"
      icon={{ name: 'delete' }}
      onPress={() => {
        console.log('delete');
      }}
      buttonStyle={styles.buttonStyle}
    />
  </View>
);

class Details extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h1>8472838</Text>
        <ButtonRow />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonRow: {
    flex: 1,
    top: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#669AE0',
    width: 150,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
});

export default Details;
