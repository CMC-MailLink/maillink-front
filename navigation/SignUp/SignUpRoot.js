import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpStacks from './SignUpStacks';
import ReaderStacks from '../Reader/ReaderStacks';
import AuthorStacks from '../Author/AuthorStacks';

const SignUpNav = createNativeStackNavigator();
const ReaderNav = createNativeStackNavigator();
const AuthorNav = createNativeStackNavigator();

const SignUpRoot = () => (
  <SignUpNav.Navigator
    screenOptions={{presentation: 'card', headerShown: false}}>
    <SignUpNav.Screen name="SignUpStacks" component={SignUpStacks} />
    <ReaderNav.Screen name="ReaderStacks" component={ReaderStacks} />
    <AuthorNav.Screen name="AuthorStacks" component={AuthorStacks} />
  </SignUpNav.Navigator>
);

export default SignUpRoot;
