import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, StackActions } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("notes.db");

export default function NotesStack({ navigation }) {
  const [notes, setNotes] = useState([
    {title: "Sleep", done: false, id: "0"},
  ]);

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

  function addNote() {
    let newNote = { title: "Test", done: false, id: notes.length.toString() };
    setNotes([...notes, newNote]);
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
        }}>
        <Text style={{ textAlign: 'left', fontSize: 24 }}>{item.title}</Text>
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
    backgroundColor: '#ffb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});