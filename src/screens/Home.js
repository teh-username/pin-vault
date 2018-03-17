import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import EntryList from '../components/EntryList';
import { ADD_ENTRY, getEntries } from '../redux/modules/listings';

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Entries',
    headerLeft: (
      <Icon
        name="menu"
        onPress={() => console.log('menuuuuu')}
        iconStyle={{ left: 10 }}
      />
    ),
    headerRight: (
      <Icon
        name="add"
        onPress={() => navigation.navigate('Entry', { action: ADD_ENTRY })}
        iconStyle={{ right: 10 }}
      />
    ),
  });

  constructor(props) {
    super(props);
    this.onEntryPress = this.onEntryPress.bind(this);
  }

  onEntryPress(id) {
    this.props.navigation.navigate('Details', { id });
  }

  render() {
    const { entries } = this.props;
    return <EntryList entries={entries} onPress={this.onEntryPress} />;
  }
}

const mapStateToProps = state => ({
  entries: getEntries(state),
});

export default connect(mapStateToProps, null)(Home);
