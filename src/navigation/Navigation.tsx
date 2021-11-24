import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { Character } from '../interfaces/characterInterface';

// type lo usamos cuando sabemos que no van hacer extendidos
export type RootStackParams = {
  HomeScreen: undefined, // no recibe ningun parametro
  DetailScreen: Character
}

const Stack = createStackNavigator<RootStackParams>();


const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="DetailScreen" component={DetailScreen}></Stack.Screen>
      
    </Stack.Navigator>
  )
}

export default Navigation