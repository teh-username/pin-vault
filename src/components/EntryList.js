import React from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const list = [
  {
    name: 'Lorem Ipsum',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
  {
    name: 'Aliquam varius',
  },
];

const EntryList = ({ onPress }) => (
  <ScrollView>
    <List>
      {list.map((l, i) => (
        <ListItem
          key={i}
          title={l.name}
          onPress={() => {
            onPress(l.name);
          }}
        />
      ))}
    </List>
  </ScrollView>
);

export default EntryList;
