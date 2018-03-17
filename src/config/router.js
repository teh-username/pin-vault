import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Details from '../screens/Details';
import NewEntry from '../screens/NewEntry';

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Details: {
      screen: Details,
    },
    NewEntry: {
      screen: NewEntry,
    },
  },
  {
    initialRouteName: 'Home',
  }
);
