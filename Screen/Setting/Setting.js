import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppContext from '../../AppContext';
import FastImage from 'react-native-fast-image';

import BackMail from '../../assets/images/BackMail.png';
import AlarmSetting from '../../assets/images/AlarmSetting.png';
import AccountSetting from '../../assets/images/AccountSetting.png';
import NextSetting from '../../assets/images/NextSetting.png';
import RuleSetting from '../../assets/images/RuleSetting.png';

const Setting = () => {
  const myContext = useContext(AppContext);
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressAlarm = () => {
    if (myContext.isReader === 'READER')
      navigation.navigate('ReaderStacks', {
        screen: 'SettingAlarm',
      });
    else
      navigation.navigate('AuthorStacks', {
        screen: 'SettingAlarm',
      });
  };
  const onPressAccount = () => {
    if (myContext.isReader === 'READER')
      navigation.navigate('ReaderStacks', {
        screen: 'SettingAccount',
      });
    else
      navigation.navigate('AuthorStacks', {
        screen: 'SettingAccount',
      });
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <StatusBar barStyle="light-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24, width: 20, height: 20}}>
            <FastImage
              style={{width: 9.5, height: 19}}
              source={BackMail}></FastImage>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>설정</Text>
      </View>
      <TouchableOpacity onPress={onPressAlarm}>
        <View style={styles.menuView}>
          <FastImage
            style={{width: 19, height: 22.51, marginRight: 20}}
            source={AlarmSetting}></FastImage>
          <Text style={styles.menuText}>알림 설정</Text>
          <FastImage
            style={{width: 7, height: 15, position: 'absolute', right: 21}}
            source={NextSetting}></FastImage>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAccount}>
        <View style={styles.menuView}>
          <FastImage
            style={{width: 19, height: 22.51, marginRight: 20}}
            source={AccountSetting}></FastImage>
          <Text style={styles.menuText}>계정</Text>
          <FastImage
            style={{width: 7, height: 15, position: 'absolute', right: 21}}
            source={NextSetting}></FastImage>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () =>
          await Linking.openURL(
            'https://amazing-coach-6d7.notion.site/22d825a0e7b74268841a8bda25fcc57e',
          )
        }>
        <View style={styles.menuView}>
          <FastImage
            style={{width: 19, height: 22.51, marginRight: 20}}
            source={RuleSetting}></FastImage>
          <Text style={styles.menuText}>이용약관</Text>
          <FastImage
            style={{width: 7, height: 15, position: 'absolute', right: 21}}
            source={NextSetting}></FastImage>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    backgroundColor: '#4562F1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#fff',
    includeFontPadding: false,
  },
  menuView: {
    height: 56,
    width: '100%',
    paddingHorizontal: 21,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  menuText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
});

export default Setting;
