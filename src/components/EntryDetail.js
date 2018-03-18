import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Text } from 'react-native-elements';

export const ButtonRow = ({ onEditPress, onDeletePress }) => (
  <View style={styles.buttonRow}>
    <Button
      title="Edit Code"
      icon={{ name: 'mode-edit' }}
      onPress={onEditPress}
      buttonStyle={styles.buttonStyle}
    />
    <Button
      title="Delete Entry"
      icon={{ name: 'delete' }}
      onPress={onDeletePress}
      buttonStyle={styles.buttonStyle}
    />
  </View>
);

const EntryDetail = ({ name, code, onEditPress, onDeletePress }) => (
  <View style={styles.container}>
    <Text h1>{name}</Text>
    <Text h1>{code}</Text>
    <ButtonRow onEditPress={onEditPress} onDeletePress={onDeletePress} />
  </View>
);

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

export default EntryDetail;
