import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Mail from '../Screen/Mail/Mail';
import Alarm from '../Screen/Alarm';
import MailSearch from '../Screen/Mail/MailSearch';

const NativeStack = createNativeStackNavigator();

const Stack = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Alarm') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      }}>
      <NativeStack.Screen
        name="Mail"
        component={Mail}
        options={{headerShown: false}}
      />
      <NativeStack.Screen
        name="Alarm"
        component={Alarm}
        options={{headerTitle: ''}}
      />
      <NativeStack.Screen name="MailSearch" component={MailSearch} />
    </NativeStack.Navigator>
  );
};

export default Stack;
