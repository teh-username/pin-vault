import React from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Details from '../screens/Details';
import Entry from '../screens/Entry';
import Menu from '../screens/Menu';
import SetPasscode from '../screens/SetPasscode';
import Auth from '../screens/Auth';

const AppStack = StackNavigator({
  Home,
  Details,
  Entry,
  Menu,
  SetPasscode,
});

const AuthStack = StackNavigator(
  {
    Auth,
  },
  {
    initialRouteName: 'Auth',
  }
);

export default SwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Auth',
  }
);
