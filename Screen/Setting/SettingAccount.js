import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../AppContext';
import FastImage from 'react-native-fast-image';
import {SignUpAPI} from '../../API/SignUpAPI';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';

import BackMail from '../../assets/images/BackMail.png';
import KakaoSetting from '../../assets/images/KakaoSetting.png';
import AppleSetting from '../../assets/images/AppleSetting.png';

const SettingAccount = () => {
  const navigation = useNavigation();
  const myContext = useContext(AppContext);
  const {isLoading: memberInfoLoading, data: memberInfoData} = useQuery(
    ['MemberInfo'],
    SignUpAPI.memberInfo,
  );

  console.log('memberInfodata : ', memberInfoData);

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressLogout = () => {
    AsyncStorage.removeItem('keys');
    myContext.setIsLogged(false);
    myContext.setIsReader('Not Decided');
    navigation.navigate('SignUpStacks', {
      screen: 'SignIn',
    });
  };
  const onPressSignout = async () => {
    var result = await SignUpAPI.secession();
    console.log(result);
    if (result) {
      AsyncStorage.removeItem('keys');
      myContext.setIsLogged(false);
      myContext.setIsReader('Not Decided');
      navigation.navigate('SignUpStacks', {
        screen: 'SignIn',
      });
    }
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
        <Text style={styles.headerText}>계정</Text>
      </View>
      <View style={styles.accountView}>
        <Text style={styles.accountText}>나의 계정 정보</Text>
        <View
          style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
          <FastImage
            style={{width: 29, height: 29, marginRight: 13}}
            source={
              memberInfoData && memberInfoData.socialType === 'KAKAO'
                ? KakaoSetting
                : AppleSetting
            }></FastImage>
          <View>
            <Text style={styles.accountCategoryText}>
              {memberInfoData && memberInfoData.socialType === 'KAKAO'
                ? '카카오 계정 회원'
                : 'Apple 계정 회원'}
            </Text>
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
