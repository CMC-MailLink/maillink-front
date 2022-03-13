import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {setCustomText} from 'react-native-global-props';
import {Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {MenuProvider} from 'react-native-popup-menu';
import {
  notificationListener,
  requestUserPermission,
} from './notificationService';

import SignUpRoot from './navigation/SignUp/SignUpRoot';
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
    requestUserPermission();
    notificationListener();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        {/* <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
        {/* <StatusBar barStyle="light-content" /> */}
        <MenuProvider>
          {!isLogged ? (
            <SignUpRoot />
          ) : isReader ? (
            <ReaderRoot />
          ) : (
            <AuthorRoot />
          )}
          {/* </SafeAreaView> */}
        </MenuProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
