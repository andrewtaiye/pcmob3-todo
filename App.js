import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, StackActions } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons';

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("notes.db");

import NotesStack from "./views/NotesStack";
import AddScreen from "./views/AddScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={"Notes Stack"}
          component={NotesStack}
          options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="Add Note" component={AddScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
