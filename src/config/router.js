import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Details from '../screens/Details';
import Entry from '../screens/Entry';

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
  },
  {
    initialRouteName: 'Home',
  }
);
