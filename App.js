import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Root from './navigation/Root';
import {setCustomText} from 'react-native-global-props';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

const customTextProps = {
  style: {
    fontFamily: 'NotoSansKR-regular',
  },
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};

const App = () => {
  setCustomText(customTextProps);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        {/* <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
        {/* <StatusBar barStyle="light-content" /> */}
        <Root />
        {/* </SafeAreaView> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
