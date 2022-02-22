import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {setCustomText} from 'react-native-global-props';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import SignIn from './Screen/Login/SignIn';
import ReaderRoot from './navigation/Reader/ReaderRoot';
import AuthorRoot from './navigation/Author/AuthorRoot';

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
  const [isLogged, setIsLogged] = useState(true);
  const [isReader, setIsReader] = useState(true);
  setCustomText(customTextProps);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (!isLogged) {
    return <SignIn></SignIn>;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        {/* <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
        {/* <StatusBar barStyle="light-content" /> */}
        {isReader ? <ReaderRoot /> : <AuthorRoot />}
        {/* </SafeAreaView> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
