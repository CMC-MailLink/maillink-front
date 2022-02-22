import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthorStacks from './AuthorStacks';
import AuthorTabs from './AuthorTabs';

const AuthorNav = createNativeStackNavigator();

const AuthorRoot = () => (
  <AuthorNav.Navigator
    screenOptions={{presentation: 'card', headerShown: false}}>
    <AuthorNav.Screen
      name="AuthorTabs"
      component={AuthorTabs}></AuthorNav.Screen>
    <AuthorNav.Screen
      name="AuthorStacks"
      component={AuthorStacks}></AuthorNav.Screen>
  </AuthorNav.Navigator>
);

export default AuthorRoot;
