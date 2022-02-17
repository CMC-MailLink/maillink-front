import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Mail from '../Screen/Mail/Mail';
import Alarm from '../Screen/Alarm';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      }}>
      <NativeStack.Screen
        name="Mail"
        component={Mail}
        options={{headerShown: false}}></NativeStack.Screen>
      <NativeStack.Screen name="Alarm" component={Alarm}></NativeStack.Screen>
    </NativeStack.Navigator>
  );
};

export default Stack;
