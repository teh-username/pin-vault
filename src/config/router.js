import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Details from '../screens/Details';

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Details: {
      screen: Details,
    },
  },
  {
    initialRouteName: 'Home',
  }
);
