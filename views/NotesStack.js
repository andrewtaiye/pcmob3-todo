import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, StackActions } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import NotesScreen from "./NotesScreen"

const InnerStack = createStackNavigator();

export default function NotesStack() {
  return (
      <InnerStack.Navigator>
        <InnerStack.Screen
          name={"Notes"}
          component={NotesScreen}
          options={{
            headerTitle: "Note-ify",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 30,
            },
            headerStyle: {
              backgroundColor: 'yellow',
              height: 110,
              borderBottomWidth: 1,
              borderBottomColor: 'black',
            }
          }}/>
      </InnerStack.Navigator>
  );
}
