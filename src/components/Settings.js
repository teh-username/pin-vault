import React from 'react';
import { ScrollView } from 'react-native';
import { Card, List, ListItem, Text } from 'react-native-elements';

const Settings = ({
  requirePasscode,
  currentPasscode,
  handleTogglePasscodeRequirement,
  handleSetPasscode,
}) => (
  <List>
    <ListItem
      switchButton
      hideChevron
      switched={requirePasscode}
      title="Require Passcode"
      onSwitch={() =>
        handleTogglePasscodeRequirement(currentPasscode, requirePasscode)
      }
    />
    <ListItem title="Set Passcode" onPress={handleSetPasscode} />
  </List>
);

export default Settings;
