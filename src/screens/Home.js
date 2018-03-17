import React from 'react';
import EntryList from '../components/EntryList';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

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
