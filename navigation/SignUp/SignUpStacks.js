import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../Screen/SignUp/SignIn';
import SelfAuth from '../../Screen/SignUp/SelfAuth';
import SetProfile from '../../Screen/SignUp/SetProfile';
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
    <ReaderStack.Screen
      name="SetProfile"
      component={SetProfile}
      options={{headerTitle: ''}}
    />
  </ReaderStack.Navigator>
);

export default ReaderStacks;
