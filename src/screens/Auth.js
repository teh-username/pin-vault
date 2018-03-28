import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import PasscodeAuth from '../components/PasscodeAuth';
import {
  getPasscodeRequirement,
  getCurrentPasscode,
} from '../redux/modules/settings';
import { hashString } from '../utils/crypto';

export class Auth extends React.Component {
  static navigationOptions = {
    title: 'Passcode Auth',
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this._isPasscodeValid = this._isPasscodeValid.bind(this);
    this._navToHome = this._navToHome.bind(this);
  }

  componentDidMount() {
    if (!this.props.requirePasscode) {
      this._navToHome();
    }
  }

  _navToHome() {
    this.props.navigation.navigate('Home');
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      })
    );
  }

  _isPasscodeValid(passcode) {
    const { currentPasscode } = this.props;
    if (hashString(passcode) !== currentPasscode) {
      this.setState({
        error: 'Passcode Invalid!',
      });
      return;
    }
    this._navToHome();
  }

  render() {
    const { error } = this.state;
    return (
      <PasscodeAuth
        handlePasscodeSubmit={this._isPasscodeValid}
        error={error}
      />
    );
  }
}

const mapStateToProps = state => ({
  requirePasscode: getPasscodeRequirement(state),
  currentPasscode: getCurrentPasscode(state),
});

export default connect(mapStateToProps)(Auth);
