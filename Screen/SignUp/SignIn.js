import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import LogoSignIn from '../../assets/images/LogoSignIn.png';
import NaverLogin from '../../assets/images/NaverLogin.png';
import KakaoLogin from '../../assets/images/KakaoLogin.png';
import GoogleLogin from '../../assets/images/GoogleLogin.png';

const SignIn = () => {
  const navigation = useNavigation();
  const onPressNaverLogin = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'SelfAuth',
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Image
        style={{width: 62.86, height: 49, top: 157, left: 42}}
        source={LogoSignIn}></Image>
      <View style={{top: 236 - 48, left: 38}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.NameTitle}>메일링크</Text>
          <Text style={styles.IntroTitle}>를</Text>
        </View>
        <Text style={styles.IntroTitle}>시작해보세요.</Text>
      </View>
      <View
        style={{
          bottom: -400,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 192,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onPressNaverLogin}>
            <Image style={{width: 312, height: 52}} source={NaverLogin}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={{width: 312, height: 52}} source={KakaoLogin}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{width: 312, height: 52}}
              source={GoogleLogin}></Image>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 18}}>
          <Text style={styles.DescText}>
            서비스 이용을 위해 회원가입이 필요합니다.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  NameTitle: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 27,
    color: '#3C3C3C',
  },
  IntroTitle: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 27,
    color: '#3C3C3C',
  },
  DescText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#BCBCBC',
  },
});

export default SignIn;
