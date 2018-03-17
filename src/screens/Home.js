import React from 'react';
import { Icon } from 'react-native-elements';
import EntryList from '../components/EntryList';

export default class Home extends React.Component {
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
        onPress={() => navigation.navigate('NewEntry')}
        iconStyle={{ right: 10 }}
      />
    ),
  });

  constructor(props) {
    super(props);
    this.onEntryPress = this.onEntryPress.bind(this);
  }

  onEntryPress(name) {
    console.log(name);
    this.props.navigation.navigate('Details');
  }

  render() {
    return <EntryList onPress={this.onEntryPress} />;
  }
}
