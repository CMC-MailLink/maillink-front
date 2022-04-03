import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Modal,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {setCustomText} from 'react-native-global-props';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {MenuProvider} from 'react-native-popup-menu';
import {QueryClient, QueryClientProvider} from 'react-query';
import codePush from 'react-native-code-push';

import {
  notificationListener,
  requestUserPermission,
} from './notificationService';
import {SignUpAPI} from './API/SignUpAPI';
import AppContext from './AppContext';
import Root from './navigation/Root';
import {getCredentials} from './Credentials';
import ForegroundHandler from './ForegroundHandler';

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

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const App = () => {
  const [isLogged, setIsLogged] = useState();
  //'Not Decided'
  const [isReader, setIsReader] = useState();
  const [alarmCount, setAlarmCount] = useState();
  const userSettings = {
    isLogged,
    setIsLogged,
    isReader,
    setIsReader,
    alarmCount,
    setAlarmCount,
  };
  const [progress, setProgress] = useState(false);

  setCustomText(customTextProps);

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

    if (Platform.OS === 'android') requestPermission();

    async function loading() {
      await checkLogged();
    }

    loading();
    // SplashScreen.hide();
  }, []);

  const checkLogged = async () => {
    var token = await getCredentials(); //jwt token 불러오기
    console.log(token);
    console.log(token);
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

  function codePushDownloadDidProgress(progress) {
    setProgress(progress);
  }

  const showProgressView = () => {
    return (
      <Modal transparent visible={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              padding: 16,
            }}>
            <Text>업데이트중...</Text>
            <View>
              <Text>{`${(Number(progress.receivedBytes) / 1048576).toFixed(
                2,
              )}MB/${(Number(progress.totalBytes) / 1048576).toFixed(
                2,
              )}MB`}</Text>
              <View style={{alignItems: 'center'}}>
                <ActivityIndicator
                  style={{marginVertical: 8}}></ActivityIndicator>
                <Text>
                  {(
                    (Number(progress?.receivedBytes) /
                      Number(progress?.totalBytes)) *
                    100
                  ).toFixed(0)}
                  %
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={userSettings}>
        <SafeAreaProvider>
          <NavigationContainer theme={MyTheme}>
            <MenuProvider>
              <ForegroundHandler></ForegroundHandler>
              {progress ? showProgressView() : null}
              <Root isLogged={isLogged} isReader={isReader} />
            </MenuProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default codePush(codePushOptions)(App);
