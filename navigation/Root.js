import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Stacks from './Stacks';
import Tabs from './Tabs';

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator screenOptions={{presentation: 'card', headerShown: false}}>
    <Nav.Screen name="Tabs" component={Tabs}></Nav.Screen>
    <Nav.Screen name="Stacks" component={Stacks}></Nav.Screen>
  </Nav.Navigator>
);

export default Root;
