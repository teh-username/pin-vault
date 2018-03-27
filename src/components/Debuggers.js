import React from 'react';
import { List, ListItem } from 'react-native-elements';

const Debuggers = ({ handlePasscodeReset }) => (
  <List>
    <ListItem
      hideChevron
      title="Reset Passcode Settings"
      subtitle="Press if unable to enable Passcode Protection"
      onPress={handlePasscodeReset}
    />
  </List>
);

export default Debuggers;
