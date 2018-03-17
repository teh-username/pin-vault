import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Text } from 'react-native-elements';

import {
  MODIFY_ENTRY,
  getEntryDetails,
  deleteEntry,
} from '../redux/modules/listings';

const ButtonRow = ({ onEditPress, onDeletePress }) => (
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

class Details extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  constructor(props) {
    super(props);
    this.handleDeletionPress = this.handleDeletionPress.bind(
      this,
      props.navigation.state.params.id
    );
    this.handleEditPress = this.handleEditPress.bind(
      this,
      props.navigation.state.params.id
    );
  }

  handleEditPress(id) {
    this.props.navigation.navigate('Entry', { action: MODIFY_ENTRY, id });
  }

  handleDeletionPress(id) {
    Alert.alert(
      'Entry Deletion',
      'Are you sure? This is irreversible.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            this.props.handleDeleteEntry(id);
            this.props.navigation.popToTop();
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    const { entryDetails: { name, code } } = this.props;
    return (
      <View style={styles.container}>
        <Text h1>{name}</Text>
        <Text h1>{code}</Text>
        <ButtonRow
          onEditPress={this.handleEditPress}
          onDeletePress={this.handleDeletionPress}
        />
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

const mapDispatchToProps = dispatch => ({
  handleDeleteEntry(id) {
    dispatch(deleteEntry(id));
  },
});

const mapStateToProps = (
  state,
  { navigation: { state: { params: { id } } } }
) => ({
  entryDetails: getEntryDetails(state, id) || {},
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
