import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const EntryList = ({ entries, onPress }) =>
  entries.length === 0 ? (
    <View style={styles.container}>
      <Text style={styles.text}>Hmm, Looks like you have no entries yet.</Text>
      <Text style={styles.text}>Hit the add button below to get started!</Text>
    </View>
  ) : (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
    left: 10,
  },
  text: {
    fontSize: 15,
  },
});

export default EntryList;
