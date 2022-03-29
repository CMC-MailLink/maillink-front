import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {setCustomText} from 'react-native-global-props';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {MenuProvider} from 'react-native-popup-menu';
import {QueryClient, QueryClientProvider} from 'react-query';
import {
  notificationListener,
  requestUserPermission,
} from './notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SignUpAPI} from './API/SignUpAPI';
import AppContext from './AppContext';

import Root from './navigation/Root';
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

const requestPermission = async () => {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
      title: 'Get Read External Storage Access',
      message: 'get read external storage access for detecting screenshots',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
};

const queryClient = new QueryClient();

const App = () => {
  const [isLogged, setIsLogged] = useState();
  //'Not Decided'
  const [isReader, setIsReader] = useState();
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
    if (Platform.OS === 'android') requestPermission();

    //Check if keys is set or not
    //If not then send for Authentication
    //else send to Home Screen
    // AsyncStorage.removeItem('keys');
    async function loading() {
      await checkLogged();
    }

    loading();
    // SplashScreen.hide();
  }, []);

  const checkLogged = async () => {
    var token = await getCredentials(); //jwt token 불러오기
    if (!token) {
      //토큰없으면 login 실패
      //AsyncStorage.removeItem('keys');
      setIsLogged(false);
    } else {
      //토큰있으면 login 성공
      setIsLogged(true);
      const result = await SignUpAPI.memberInfo();
      if (result.userType === 'Not Decided') {
        setIsReader('Not Decided');
      } else if (result.userType === 'WRITER') {
        setIsReader('WRITER');
      } else if (result.userType === 'READER') {
        setIsReader('READER');
      }
    }
  };

  useEffect(() => {
    if (isLogged !== null) SplashScreen.hide();
    else if (isReader !== null) SplashScreen.hide();
  }, [isLogged, isReader]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={userSettings}>
        <SafeAreaProvider>
          <NavigationContainer theme={MyTheme}>
            {/* <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
            {/* <StatusBar barStyle="light-content" /> */}
            <MenuProvider>
              <Root isLogged={isLogged} isReader={isReader} />
              {/* </SafeAreaView> */}
            </MenuProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
