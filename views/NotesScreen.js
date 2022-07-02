import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, StackActions } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);

  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj, { rows: { _array } }) => setNotes(_array),
        (txObj, error) => console.log("Error ", error)
      );
    });
    console.log("notes refreshed");
  }

  function deleteNotes(id) {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM notes WHERE id=${id}`
      );
    }, null, refreshNotes);
    console.log('note deleted');
  }

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS
        notes
        ( id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          done INT);`
      );
    }, null, refreshNotes);
    console.log("table created");
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Entypo
            name={"new-message"}
            size={24}
            color={"black"}
            style={{ marginRight: 20, }}/>
        </TouchableOpacity>
      )
    });
  });

  useEffect(() => {
    if (route.params?.text) {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO notes (done, title) VALUES (0, ?)`, [route.params?.text]
        );
      }, null, refreshNotes);
    }
    console.log('note added');
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Note");
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBotton: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{ textAlign: 'left', fontSize: 24 }}>{item.title}</Text>
        <TouchableOpacity onPress={() => deleteNotes(item.id)}>
          <Entypo name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList style={{ width: "100%" }} data={notes} renderItem={renderItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
