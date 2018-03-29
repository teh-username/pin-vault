import React from 'react';
import { connect } from 'react-redux';

import PasscodeForm from '../components/PasscodeForm';
import { setPasscode, getCurrentPasscode } from '../redux/modules/settings';
import { hashString } from '../utils/crypto';

export class SetPasscode extends React.Component {
  static navigationOptions = {
    title: 'Set Passcode',
  };

  render() {
    return <PasscodeForm {...this.props} />;
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => ({
  handlePasscodeSubmit(passcode) {
    dispatch(setPasscode(hashString(passcode)));
    ownProps.navigation.goBack();
  },
});

const mapStateToProps = state => ({
  oldPasscode: getCurrentPasscode(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetPasscode);
