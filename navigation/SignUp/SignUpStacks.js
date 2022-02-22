import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../Screen/SignUp/SignIn';
import SelfAuth from '../../Screen/SignUp/SelfAuth';

const ReaderStack = createNativeStackNavigator();

const ReaderStacks = () => (
  <ReaderStack.Navigator
    sceneContainerStyle={{
      backgroundColor: '#fff',
    }}
    screenOptions={{
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      presentation: 'card',
      headerShown: false,
    }}>
    <ReaderStack.Screen
      name="SignIn"
      component={SignIn}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="SelfAuth"
      component={SelfAuth}
      options={{headerTitle: ''}}
    />
  </ReaderStack.Navigator>
);

export default ReaderStacks;
