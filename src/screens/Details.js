import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import EntryDetail from '../components/EntryDetail';

import {
  MODIFY_ENTRY,
  getEntryDetails,
  deleteEntry,
} from '../redux/modules/listings';

export class Details extends React.Component {
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
      <EntryDetail
        name={name}
        code={code}
        onEditPress={this.handleEditPress}
        onDeletePress={this.handleDeletionPress}
      />
    );
  }
}

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
