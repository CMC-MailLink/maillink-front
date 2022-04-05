import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Alarm from '../../Screen/Author/Alarm.js';
import AuthorMailSearch from '../../Screen/Author/Mail/AuthorMailSearch';
import AuthorReading from '../../Screen/Author/Reading/AuthorReading';
import InstaShare from '../../Screen/InstaShare';
import Setting from '../../Screen/Setting/Setting';
import SettingAlarm from '../../Screen/Setting/SettingAlarm';
import SettingAccount from '../../Screen/Setting/SettingAccount';
import Message from '../../Screen/Author/Message/Message.js';
import MessageWrite from '../../Screen/Author/Message/MessageWrite.js';
import MessageReport from '../../Screen/Author/Message/MessageReport.js';
import AuthorEditor from '../../Screen/Author/Write/AuthorEditor';
import AuthorProfileEdit from '../../Screen/Author/Profile/AuthorProfileEdit';
import AuthorProfileSearch from '../../Screen/Author/Profile/AuthorProfileSearch';
import AuthorTempEditor from '../../Screen/Author/Write/AuthorTempEditor';
import AuthorProfileFollowerList from '../../Screen/Author/Profile/AuthorProfileFollowerList.js';

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
      name="SettingAlarm"
      component={SettingAlarm}
      options={{headerShown: false}}
    />
    <AuthorStack.Screen
      name="SettingAccount"
      component={SettingAccount}
      options={{headerShown: false}}
    />
    <AuthorStack.Screen
      name="Message"
      component={Message}
      options={{headerTitle: ''}}
    />
    <AuthorStack.Screen
      name="MessageWrite"
      component={MessageWrite}
      options={{headerTitle: ''}}
    />
    <AuthorStack.Screen
      name="AuthorEditor"
      component={AuthorEditor}
      options={{headerTitle: ''}}
    />
    <AuthorStack.Screen
      name="AuthorTempEditor"
      component={AuthorTempEditor}
      options={{headerTitle: ''}}
    />
    <AuthorStack.Screen
      name="AuthorProfileEdit"
      component={AuthorProfileEdit}
      options={{headerTitle: ''}}
    />
    <AuthorStack.Screen
      name="AuthorProfileSearch"
      component={AuthorProfileSearch}
      options={{headerTitle: ''}}
    />
    <AuthorStack.Screen
      name="MessageReport"
      component={MessageReport}
      options={{headerTitle: ''}}
    />
    <AuthorStack.Screen
      name="AuthorProfileFollowerList"
      component={AuthorProfileFollowerList}
      options={{headerTitle: ''}}
    />
  </AuthorStack.Navigator>
);

export default AuthorStacks;
