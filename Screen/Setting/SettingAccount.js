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
import KakaoSetting from '../../assets/images/KakaoSetting.png';
import AppleSetting from '../../assets/images/AppleSetting.png';

const SettingAccount = () => {
  const navigation = useNavigation();
  const [isKakao, setIsKakao] = useState(false);

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressLogout = () => {};
  const onPressSignout = () => {};

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
        <Text style={styles.headerText}>계정</Text>
      </View>
      <View style={styles.accountView}>
        <Text style={styles.accountText}>나의 계정 정보</Text>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Image
            style={{width: 29, height: 29, marginRight: 13}}
            source={isKakao ? KakaoSetting : AppleSetting}></Image>
          <View>
            <Text style={styles.accountCategoryText}>
              {isKakao ? '카카오 계정 회원' : 'Apple 계정 회원'}
            </Text>
            <Text style={styles.emailText}>mailink1234@naver.com</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onPressLogout}>
        <View style={styles.menuView}>
          <Text style={styles.menuText}>로그아웃</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSignout}>
        <View style={styles.menuView}>
          <Text style={styles.menuText}>탈퇴하기</Text>
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
  accountView: {
    paddingVertical: 16,
    paddingHorizontal: 21,
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 11,
  },
  accountText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  accountCategoryText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  emailText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#BEBEBE',
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

export default SettingAccount;