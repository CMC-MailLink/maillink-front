import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReaderStacks from './ReaderStacks';
import ReaderTabs from './ReaderTabs';

const ReaderNav = createNativeStackNavigator();

const ReaderRoot = () => (
  <ReaderNav.Navigator
    screenOptions={{presentation: 'card', headerShown: false}}>
    <ReaderNav.Screen
      name="ReaderTabs"
      component={ReaderTabs}></ReaderNav.Screen>
    <ReaderNav.Screen
      name="ReaderStacks"
      component={ReaderStacks}></ReaderNav.Screen>
  </ReaderNav.Navigator>
);

export default ReaderRoot;
