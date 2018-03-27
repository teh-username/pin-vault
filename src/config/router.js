import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Details from '../screens/Details';
import Entry from '../screens/Entry';
import Menu from '../screens/Menu';

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Details: {
      screen: Details,
    },
    Entry: {
      screen: Entry,
    },
    Menu: {
      screen: Menu,
    },
  },
  {
    initialRouteName: 'Home',
  }
);
