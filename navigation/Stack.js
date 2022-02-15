import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Alarm from '../Screen/Alarm';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <NativeStack.Screen name="Alarm" component={Alarm}></NativeStack.Screen>
    </NativeStack.Navigator>
  );
};

export default Stack;
