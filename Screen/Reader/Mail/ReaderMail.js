import React from 'react';
import {Image, View, TouchableOpacity, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ReaderMailBody from './ReaderMailBody';

import SearchMail from '../../../assets/images/SearchMail.png';
import LogoMail from '../../../assets/images/LogoMail.png';
import AlarmMail from '../../../assets/images/AlarmMail.png';

const STATUSBAR_HEIGHT = 48;

const ReaderMail = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  //메일 검색 클릭
  const onPressSearchPage = () => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderMailSearch',
    });
  };

  //알람 클릭
  const goToAlarm = () => {
    navigation.navigate('ReaderStacks', {
      screen: 'Alarm',
    });
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="light-content" />
      <View style={{height: 35, backgroundColor: '#4562F1'}}>
        <Image
          style={{
            position: 'absolute',
            top: 50 - STATUSBAR_HEIGHT,
            left: 20,
            width: 105,
            height: 20,
          }}
          source={LogoMail}
        />
        <TouchableOpacity onPress={goToAlarm}>
          <Image
            style={{
              position: 'absolute',
              top: 50 - STATUSBAR_HEIGHT,
              right: 21,
              width: 20,
              height: 22.75,
            }}
            source={AlarmMail}
          />
          <View
            style={{
              position: 'absolute',
              right: 21,
              backgroundColor: '#FF9B9B',
              width: 4,
              height: 4,
              borderRadius: 90,
            }}></View>
        </TouchableOpacity>
      </View>
      <ReaderMailBody></ReaderMailBody>
      <FloatingAction
        actions={[
          {
            icon: (
              <Image
                style={{
                  width: 22,
                  height: 22.11,
                }}
                source={SearchMail}
              />
            ),
            name: 'bt_search',
            position: 1,
            buttonSize: 50,
          },
        ]}
        color="#FFF"
        overlayColor="rgba(255,255,255, 0.9)"
        tintColor={null}
        distanceToEdge={{vertical: 95 + insets.bottom / 2, horizontal: 17}}
        buttonSize={50}
        shadow={{
          shadowOpacity: 0.12,
          shadowColor: '#000000',
          shadowRadius: 23,
        }}
        overrideWithAction={true}
        animated={false}
        onPressItem={name => onPressSearchPage()}
      />
      {/* </SaferAreaView> */}
    </View>
  );
};

export default ReaderMail;
