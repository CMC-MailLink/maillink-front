import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpStacks from './SignUpStacks';

const SignUpNav = createNativeStackNavigator();

const SignUpRoot = () => (
  <SignUpNav.Navigator
    screenOptions={{presentation: 'card', headerShown: false}}>
    <SignUpNav.Screen
      name="SignUpStacks"
      component={SignUpStacks}></SignUpNav.Screen>
  </SignUpNav.Navigator>
);

export default SignUpRoot;
