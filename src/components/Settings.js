import React from 'react';
import { List, ListItem } from 'react-native-elements';

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
      title="Passcode Protection"
      subtitle="Enables passcode when opening the app"
      onSwitch={() =>
        handleTogglePasscodeRequirement(currentPasscode, requirePasscode)
      }
    />
    <ListItem title="Set Passcode" onPress={handleSetPasscode} />
  </List>
);

export default Settings;
