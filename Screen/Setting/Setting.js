import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BackMail from '../../assets/images/BackMail.png';
import AlarmSetting from '../../assets/images/AlarmSetting.png';
import AccountSetting from '../../assets/images/AccountSetting.png';
import NextSetting from '../../assets/images/NextSetting.png';

const Setting = () => {
  const [isReader, setIsReader] = useState(true);
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressAlarm = () => {
    if (isReader)
      navigation.navigate('ReaderStacks', {
        screen: 'SettingAlarm',
      });
    else
      navigation.navigate('AuthorStacks', {
        screen: 'SettingAlarm',
      });
  };
  const onPressAccount = () => {
    if (isReader)
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
          <View style={{position: 'absolute', left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail}></Image>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>설정</Text>
      </View>
      <TouchableOpacity onPress={onPressAlarm}>
        <View style={styles.menuView}>
          <Image
            style={{width: 19, height: 22.51, marginRight: 20}}
            source={AlarmSetting}></Image>
          <Text style={styles.menuText}>알림 설정</Text>
          <Image
            style={{width: 7, height: 15, position: 'absolute', right: 21}}
            source={NextSetting}></Image>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAccount}>
        <View style={styles.menuView}>
          <Image
            style={{width: 19, height: 22.51, marginRight: 20}}
            source={AccountSetting}></Image>
          <Text style={styles.menuText}>계정</Text>
          <Image
            style={{width: 7, height: 15, position: 'absolute', right: 21}}
            source={NextSetting}></Image>
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
