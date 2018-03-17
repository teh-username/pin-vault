import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Details from '../screens/Details';
import AddEntry from '../screens/AddEntry';

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Details: {
      screen: Details,
    },
    AddEntry: {
      screen: AddEntry,
    },
  },
  {
    initialRouteName: 'Home',
  }
);
