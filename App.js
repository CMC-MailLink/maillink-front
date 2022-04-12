import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, Modal, View, Text} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {setCustomText} from 'react-native-global-props';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {MenuProvider} from 'react-native-popup-menu';
import {QueryClient, QueryClientProvider} from 'react-query';
import codePush from 'react-native-code-push';
import FastImage from 'react-native-fast-image';

import {
  notificationListener,
  requestUserPermission,
} from './notificationService';
import {SignUpAPI} from './API/SignUpAPI';
import AppContext from './AppContext';
import Root from './navigation/Root';
import {getCredentials} from './Credentials';
import ForegroundHandler from './ForegroundHandler';

import CodePushUpdate from './assets/images/CodePushUpdate.png';

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
  const [isLogged, setIsLogged] = useState(null);
  //'Not Decided'
  const [isReader, setIsReader] = useState(null);
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

  useEffect(() => {
    if (isLogged !== null) {
      SplashScreen.hide();
    } else if (isReader !== null) {
      SplashScreen.hide();
    }
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
            backgroundColor: 'rgba(55,55,55,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: 330,
              height: 334,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Bold',
                fontSize: 18,
                color: '#3c3c3c',
                includeFontPadding: false,
              }}>
              업데이트 중입니다.
            </Text>

            <Text
              style={{
                fontFamily: 'NotoSansKR-Medium',
                fontSize: 15,
                color: '#D2D2D2',
                includeFontPadding: false,
              }}>
              <Text
                style={{
                  color: '#828282',
                }}>
                {`${(Number(progress.receivedBytes) / 1048576).toFixed(2)}`}
                &nbsp;
              </Text>
              <Text
                style={{
                  color: '#BEBEBE',
                }}>
                {`MB / ${(Number(progress.totalBytes) / 1048576).toFixed(2)}`}
                &nbsp;
              </Text>
              MB
            </Text>
            <FastImage
              style={{width: 157, height: 148, marginTop: 23, marginBottom: 13}}
              source={CodePushUpdate}></FastImage>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Bold',
                fontSize: 26,
                color: '#4562F1',
              }}>
              {(
                (Number(progress?.receivedBytes) /
                  Number(progress?.totalBytes)) *
                100
              ).toFixed(0)}
              <Text style={{fontSize: 16, color: '#BEBEBE'}}>&nbsp;%</Text>
            </Text>
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
              {isLogged && isReader ? (
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
