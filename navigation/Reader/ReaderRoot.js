import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReaderStacks from './ReaderStacks';
import ReaderTabs from './ReaderTabs';
import SignUpStacks from '../SignUp/SignUpStacks';

const ReaderNav = createNativeStackNavigator();
const SignUpNav = createNativeStackNavigator();

const ReaderRoot = () => (
  <ReaderNav.Navigator
    screenOptions={{presentation: 'card', headerShown: false}}>
    <ReaderNav.Screen name="ReaderTabs" component={ReaderTabs} />
    <SignUpNav.Screen name="SignUpStacks" component={SignUpStacks} />
    <ReaderNav.Screen name="ReaderStacks" component={ReaderStacks} />
  </ReaderNav.Navigator>
);

export default ReaderRoot;
