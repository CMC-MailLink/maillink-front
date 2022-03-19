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
import {signUpAPI} from './API/SignUpAPI';
import {useNavigation, CommonActions} from '@react-navigation/native';
import AppContext from './AppContext';
var jwt_decode = require('jwt-decode');

import SignUpRoot from './navigation/SignUp/SignUpRoot';
import ReaderRoot from './navigation/Reader/ReaderRoot';
import AuthorRoot from './navigation/Author/AuthorRoot';
import OnBoardingRoot from './navigation/OnBoarding/OnBoardingRoot';
import {getCredentials} from './Credentials';

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
  const [isReader, setIsReader] = useState('Not Decided');
  const userSettings = {
    isLogged,
    setIsLogged,
    isReader,
    setIsReader,
  };

  setCustomText(customTextProps);
  useEffect(() => {
    requestUserPermission();
    notificationListener();

    //Check if keys is set or not
    //If not then send for Authentication
    //else send to Home Screen
    // AsyncStorage.removeItem('keys');
    checkLogged();
    SplashScreen.hide();
  }, []);

  const checkLogged = async () => {
    var token = await getCredentials(); //jwt token 불러오기
    console.log('token : ', token.access, token.refresh);
    if (!token) {
      //토큰없으면 login 실패
      console.log('로그인 불가');
      AsyncStorage.removeItem('keys');
      setIsLogged(false);
    } else {
      //토큰있으면 login 성공
      console.log('로그인 성공');
      setIsLogged(true);
      const result = await signUpAPI.memberInfo();
      if (result === 'Not Decided') {
      } else if (result === 'WRITER') {
        setIsReader('WRITER');
      } else if (result === 'READER') {
        setIsReader('READER');
      }
    }
  };

  return (
    <AppContext.Provider value={userSettings}>
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          {/* <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
          {/* <StatusBar barStyle="light-content" /> */}
          <MenuProvider>
            {!isLogged ? (
              <SignUpRoot />
            ) : isReader === 'READER' ? (
              <ReaderRoot />
            ) : isReader === 'WRITER' ? (
              <AuthorRoot />
            ) : (
              <OnBoardingRoot />
            )}
            {/* </SafeAreaView> */}
          </MenuProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppContext.Provider>
  );
};

export default App;
