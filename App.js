import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {setCustomText} from 'react-native-global-props';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {MenuProvider} from 'react-native-popup-menu';
import {
  notificationListener,
  requestUserPermission,
} from './notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [isLogged, setIsLogged] = useState(false);
  const [isReader, setIsReader] = useState(true);
  setCustomText(customTextProps);
  useEffect(() => {
    requestUserPermission();
    notificationListener();

    setTimeout(() => {
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then(value => {
        console.log('asyncstorage user_id : ', value);
        if (value) {
          setIsLogged(true);
        }
      });
    }, 3000);
    SplashScreen.hide();
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
