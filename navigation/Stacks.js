import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Alarm from '../Screen/Alarm';
import MailSearch from '../Screen/Mail/MailSearch';
import Reading from '../Screen/Reading';

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
    <Stack.Screen name="Alarm" component={Alarm} />
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
  </Stack.Navigator>
);

export default Stacks;
