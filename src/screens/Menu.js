import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import {
  getPasscodeRequirement,
  togglePasscodeRequirement,
} from '../redux/modules/settings';
import Settings from '../components/Settings';

class Menu extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <ScrollView>
        <Settings {...this.props} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  requirePasscode: getPasscodeRequirement(state),
});

const mapDispatchToProps = {
  handleTogglePasscodeRequirement: togglePasscodeRequirement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
