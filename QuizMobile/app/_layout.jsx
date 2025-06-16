import { View } from 'react-native';
import React from 'react';
import questionPage from './questionPage';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return(

    <View style={{ flex: 1 }}>
        <Stack />
      </View>
    // <View>Hola</View>
  ) 
}
  