import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function AddScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Screen</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10, }}>
        <Text>Dismiss</Text>
      </TouchableOpacity>
    </View>
  )
}
