import React from 'react';
import { connect } from 'react-redux';

import PasscodeForm from '../components/PasscodeForm';
import { setPasscode } from '../redux/modules/settings';
import { hashString } from '../utils/crypto';

class SetPasscode extends React.Component {
  static navigationOptions = {
    title: 'Set Passcode',
  };

  render() {
    return <PasscodeForm {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handlePasscodeSubmit(passcode) {
    dispatch(setPasscode(hashString(passcode)));
    ownProps.navigation.goBack();
  },
});

export default connect(null, mapDispatchToProps)(SetPasscode);
