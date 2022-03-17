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
import {signUpAPI} from './API/signUpAPI';
import {useNavigation, CommonActions} from '@react-navigation/native';

import SignUpRoot from './navigation/SignUp/SignUpRoot';
import ReaderRoot from './navigation/Reader/ReaderRoot';
import AuthorRoot from './navigation/Author/AuthorRoot';
import OnBoardingRoot from './navigation/OnBoarding/OnBoardingRoot';

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
  const [isReader, setIsReader] = useState('Not Decided');

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
    const result = await AsyncStorage.getItem('keys');
    if (result) {
      console.log('asyncstorage keys : ', result);
      setIsLogged(true);
      const result2 = await signUpAPI.memberInfo();
      console.log(result2);
      if (result2 === 'Not Decided') {
      } else if (result2 === 'WRITER') {
        setIsReader('WRITER');
      } else if (result2 === 'READER') {
        setIsReader('READER');
      }
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        {/* <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
        {/* <StatusBar barStyle="light-content" /> */}
        <MenuProvider>
          {!isLogged ? (
            <SignUpRoot
              setIsReader={setIsReader}
              setIsLogged={setIsLogged}
              isLogged={isLogged}
              isReader={isReader}
            />
          ) : isReader === 'READER' ? (
            <ReaderRoot />
          ) : isReader === 'WRITER' ? (
            <AuthorRoot />
          ) : (
            <OnBoardingRoot
              setIsReader={setIsReader}
              setIsLogged={setIsLogged}
              isLogged={isLogged}
              isReader={isReader}
            />
          )}
          {/* </SafeAreaView> */}
        </MenuProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
