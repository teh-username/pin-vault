import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppLoading } from 'expo';

import RootStack from './config/router';
import configureStore from './redux/configureStore';

const { persistor, store } = configureStore();

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bootstrapped: false,
    };

    this._loadUserData = this._loadUserData.bind(this);
    this._unsubscribe = null;
  }

  componentDidMount() {
    this._unsubscribe = this.props.persistor.subscribe(this._loadUserData);
  }

  _loadUserData() {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      this._unsubscribe && this._unsubscribe();
      return Promise.resolve();
    }
  }

  render() {
    if (!this.state.bootstrapped) {
      return (
        <AppLoading
          startAsync={this._loadUserData}
          onFinish={() => this.setState({ bootstrapped: true })}
          onError={console.warn}
        />
      );
    }

    return this.props.children;
  }
}

export default (RootApp = () => (
  <Provider store={store}>
    <Loader persistor={persistor}>
      <RootStack />
    </Loader>
  </Provider>
));
