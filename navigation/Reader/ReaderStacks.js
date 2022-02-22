import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Alarm from '../../Screen/Alarm';
import ReaderMailSearch from '../../Screen/Reader/Mail/ReaderMailSearch';
import ReaderReading from '../../Screen/Reader/Reading/ReaderReading';
import InstaShare from '../../Screen/InstaShare';
import ReaderProfileSearch from '../../Screen/Reader/Profile/ReaderProfileSearch';
import Setting from '../../Screen/Setting';

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
    {/* <Stack.Screen name="Home" component={Home} options={{headerShown: false}} /> */}
    <ReaderStack.Screen
      name="Alarm"
      component={Alarm}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="ReaderMailSearch"
      component={ReaderMailSearch}
      options={{headerShown: false}}
    />
    <ReaderStack.Screen
      name="ReaderReading"
      component={ReaderReading}
      options={{headerShown: false}}
    />
    <ReaderStack.Screen
      name="InstaShare"
      component={InstaShare}
      options={{headerShown: false}}
    />
    <ReaderStack.Screen
      name="ReaderProfileSearch"
      component={ReaderProfileSearch}
      options={{headerShown: false}}
    />
    <ReaderStack.Screen
      name="Setting"
      component={Setting}
      options={{headerShown: false}}
    />
  </ReaderStack.Navigator>
);

export default ReaderStacks;
