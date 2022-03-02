import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import LogoSignIn from '../../assets/images/LogoSignIn.png';
import KakaoLogin from '../../assets/images/KakaoLogin.png';
import AppleLogin from '../../assets/images/AppleLogin.png';
import LineSignIn from '../../assets/images/LineSignIn.png';

const SignIn = () => {
  const navigation = useNavigation();
  const onPressNaverLogin = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'SetProfileSelfAuth',
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
        source={LogoSignIn}
      />
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
            height: 122,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Image style={{width: 312, height: 52}} source={KakaoLogin} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={{width: 312, height: 52}} source={AppleLogin} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 68,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={{width: 43, height: 1}} source={LineSignIn}></Image>
          <Text style={styles.DescText}>이미 회원이신가요?</Text>
          <Image style={{width: 43, height: 1}} source={LineSignIn}></Image>
        </View>
        <Text style={styles.DescText2}>
          기존 가입 경로를 통해 로그인해주세요
        </Text>
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
    fontSize: 12,
    color: '#8B8B8B',
    marginHorizontal: 20,
  },
  DescText2: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 12,
    color: '#BCBCBC',
    marginTop: 20,
  },
});

export default SignIn;
