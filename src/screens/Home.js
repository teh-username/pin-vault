import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import EntryList from '../components/EntryList';
import { ADD_ENTRY, getEntries } from '../redux/modules/listings';

export class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Entries',
    headerRight: (
      <Icon
        name="menu"
        onPress={() => navigation.navigate('Menu')}
        iconStyle={{ right: 30 }}
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

  _renderAddButton(navigation) {
    return (
      <View key="home_add_button" style={styles.icon}>
        <Icon
          raised
          reverse
          name="plus"
          type="font-awesome"
          onPress={() => navigation.navigate('Entry', { action: ADD_ENTRY })}
        />
      </View>
    );
  }

  _renderEntryList(entries) {
    return (
      <EntryList
        key="home_entrylist"
        entries={entries}
        onPress={this.onEntryPress}
      />
    );
  }

  render() {
    const { entries, navigation } = this.props;
    return [this._renderEntryList(entries), this._renderAddButton(navigation)];
  }
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    right: 25,
    bottom: 25,
  },
});

const mapStateToProps = state => ({
  entries: getEntries(state),
});

export default connect(mapStateToProps, null)(Home);
