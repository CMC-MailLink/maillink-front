import React, {useEffect, useState} from 'react';
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

const queryClient = new QueryClient();

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
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
    //AsyncStorage.removeItem('keys');
    async function loading() {
      await checkLogged();
    }

    loading();
    SplashScreen.hide();
  }, []);

  const checkLogged = async () => {
    var token = await getCredentials(); //jwt token 불러오기
    if (!token) {
      //토큰없으면 login 실패
      console.log('로그인 불가');
      // AsyncStorage.removeItem('keys');
      setIsLogged(false);
    } else {
      //토큰있으면 login 성공
      console.log('token : ', token);
      console.log('로그인 성공');
      setIsLogged(true);
      const result = await SignUpAPI.memberInfo();
      if (result === 'Not Decided') {
      } else if (result === 'WRITER') {
        setIsReader('WRITER');
      } else if (result === 'READER') {
        setIsReader('READER');
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={userSettings}>
        <SafeAreaProvider>
          <NavigationContainer theme={MyTheme}>
            {/* <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
            {/* <StatusBar barStyle="light-content" /> */}
            <MenuProvider>
              <Root isLogged={isLogged} isReader={isReader}></Root>
              {/* </SafeAreaView> */}
            </MenuProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
