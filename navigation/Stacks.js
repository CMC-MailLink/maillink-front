import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Alarm from '../Screen/Alarm';
import MailSearch from '../Screen/Mail/MailSearch';
import Reading from '../Screen/Reading';
import InstaShare from '../Screen/InstaShare';
import ProfileSearch from '../Screen/Profile/ProfileSearch';
import Setting from '../Screen/Setting';

const Stack = createNativeStackNavigator();

const Stacks = () => (
  <Stack.Navigator
    sceneContainerStyle={{
      backgroundColor: '#fff',
    }}
    screenOptions={{
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      presentation: 'card',
      headerShown: false,
    }}>
    <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <Stack.Screen name="Alarm" component={Alarm} options={{headerTitle: ''}} />
    <Stack.Screen
      name="MailSearch"
      component={MailSearch}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Reading"
      component={Reading}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="InstaShare"
      component={InstaShare}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ProfileSearch"
      component={ProfileSearch}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Setting"
      component={Setting}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default Stacks;
