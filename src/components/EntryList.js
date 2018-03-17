import React from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const EntryList = ({ entries, onPress }) => (
  <ScrollView>
    <List>
      {entries.map(([id, { name }]) => (
        <ListItem
          key={id}
          title={name}
          onPress={() => {
            onPress(id);
          }}
        />
      ))}
    </List>
  </ScrollView>
);

export default EntryList;
