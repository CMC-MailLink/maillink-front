import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Alarm from '../../Screen/Alarm';
import AuthorMailSearch from '../../Screen/Author/Mail/AuthorMailSearch';
import AuthorReading from '../../Screen/Author/Reading/AuthorReading';
import InstaShare from '../../Screen/InstaShare';
import Setting from '../../Screen/Setting';
import Message from '../../Screen/Message';

const AuthorStack = createNativeStackNavigator();

const AuthorStacks = () => (
  <AuthorStack.Navigator
    sceneContainerStyle={{
      backgroundColor: '#fff',
    }}
    screenOptions={{
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      presentation: 'card',
      headerShown: false,
    }}>
    <AuthorStack.Screen
      name="Alarm"
      component={Alarm}
      options={{headerTitle: ''}}
    />
    <AuthorStack.Screen
      name="AuthorMailSearch"
      component={AuthorMailSearch}
      options={{headerShown: false}}
    />
    <AuthorStack.Screen
      name="AuthorReading"
      component={AuthorReading}
      options={{headerShown: false}}
    />
    <AuthorStack.Screen
      name="InstaShare"
      component={InstaShare}
      options={{headerShown: false}}
    />
    <AuthorStack.Screen
      name="Setting"
      component={Setting}
      options={{headerShown: false}}
    />
    <AuthorStack.Screen
      name="Message"
      component={Message}
      options={{headerTitle: ''}}
    />
  </AuthorStack.Navigator>
);

export default AuthorStacks;
