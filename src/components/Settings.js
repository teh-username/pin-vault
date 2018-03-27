import React from 'react';
import { ScrollView } from 'react-native';
import { Card, List, ListItem, Text } from 'react-native-elements';

const Settings = ({ requirePasscode, handleTogglePasscodeRequirement }) => (
  <List>
    <ListItem
      switchButton
      hideChevron
      switched={requirePasscode}
      title="Require Passcode"
      onSwitch={handleTogglePasscodeRequirement}
    />
    <ListItem title="Set / Change Passcode" />
  </List>
);

export default Settings;
