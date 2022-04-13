import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {MenuProvider} from 'react-native-popup-menu';
import {QueryClient, QueryClientProvider} from 'react-query';
import codePush from 'react-native-code-push';

import CodePushProgress from './Components/CodePushProgress';

import {
  notificationListener,
  requestUserPermission,
} from './notificationService';

import {SignUpAPI} from './API/SignUpAPI';
import AppContext from './AppContext';
import Root from './navigation/Root';
import {getCredentials} from './Credentials';
import ForegroundHandler from './ForegroundHandler';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};

const queryClient = new QueryClient();

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const App = () => {
  const [isLogged, setIsLogged] = useState(null); //로그인 유무
  const [isReader, setIsReader] = useState(null); //독자 타입
  const [token, setToken] = useState(); //토큰
  const [alarmCount, setAlarmCount] = useState(); //메인 버튼 메일갯수
  const [progress, setProgress] = useState(false); //업데이트진행도
  const userSettings = {
    isLogged,
    setIsLogged,
    isReader,
    setIsReader,
    alarmCount,
    setAlarmCount,
  };

  useEffect(() => {
    codePush.sync(
      {
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );

    requestUserPermission();
    notificationListener();

    if (Platform.OS === 'android') {
      requestPermission();
    }

    checkLogged();
    SplashScreen.hide();
  }, []);

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

  const checkLogged = async () => {
    var tempToken = await getCredentials();
    setToken(tempToken);
    if (!tempToken) {
      setIsLogged(false);
    } else {
      const result = await SignUpAPI.memberInfo();
      if (result.userType === 'Not Decided') {
        setIsReader('Not Decided');
        setIsLogged(true);
      } else if (result.userType === 'WRITER') {
        setIsReader('WRITER');
        setIsLogged(true);
      } else if (result.userType === 'READER') {
        setIsReader('READER');
        setIsLogged(true);
      }
    }
  };

  function codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for update.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.');
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('Awaiting user action.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('App up to date.');
        setProgress(false);
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        console.log('Update cancelled by user.');
        setProgress(false);
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed and will be applied on restart.');
        setProgress(false);
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log('An unknown error occurred.');
        setProgress(false);
        break;
    }
  }

  function codePushDownloadDidProgress(tempProgress) {
    setProgress(tempProgress);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={userSettings}>
        <SafeAreaProvider>
          <NavigationContainer theme={MyTheme}>
            <MenuProvider>
              <ForegroundHandler />
              {progress ? <CodePushProgress progress={progress} /> : null}
              {(isLogged && isReader) || token === null ? (
                <Root isLogged={isLogged} isReader={isReader} />
              ) : null}
            </MenuProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default codePush(codePushOptions)(App);
