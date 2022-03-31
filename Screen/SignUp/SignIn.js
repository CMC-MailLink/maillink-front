import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import {
  AppleButton,
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {v4 as uuid} from 'uuid';
import jwt_decode from 'jwt-decode';
import {SignUpAPI} from '../../API/SignUpAPI';
import AppContext from '../../AppContext';
import FastImage from 'react-native-fast-image';

import LogoSignIn from '../../assets/images/LogoSignIn.png';
import KakaoLogin from '../../assets/images/KakaoLogin.png';
import AppleLogin from '../../assets/images/AppleLogin.png';

const SignIn = props => {
  const myContext = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const signInWithKakao = async () => {
    const token = await login();
    getProfile();
  };

  const getProfile = async () => {
    const profile = await getKakaoProfile();
    const result = await SignUpAPI.authLogin({
      socialType: 'KAKAO',
      socialId: profile.id,
    });
    if (result) {
      const result2 = await SignUpAPI.memberInfo();
      if (result2.userType === 'Not Decided') {
        myContext.setIsReader('Not Decided');
        myContext.setIsLogged(true);
      } else if (result2.userType === 'WRITER') {
        myContext.setIsReader('WRITER');
        myContext.setIsLogged(true);
      } else if (result2.userType === 'READER') {
        myContext.setIsReader('READER');
        myContext.setIsLogged(true);
      }
    } else {
      navigation.navigate('SignUpStacks', {
        screen: 'SetProfile',
        params: {
          socialType: 'KAKAO',
          socialId: profile.id,
          phoneNumber: '01012341234',
        },
      });
    }
  };
  const onAppleButtonPress = () => {
    if (Platform.OS === 'ios') {
      onAppleButtonPressIos();
    } else {
      onAppleButtonPressAndroid();
    }
  };

  const onAppleButtonPressIos = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const {email, email_verified, is_private_email, sub} = jwt_decode(
        appleAuthRequestResponse.identityToken,
      );

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        var temp = `
        email: ${email}
        email_verified: ${email_verified}
        is_private_email: ${is_private_email}
        sub: ${sub}`;
        SignInApple(sub);
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        // login canceled
      } else {
        // login error
      }
    }
  };

  async function onAppleButtonPressAndroid() {
    const rawNonce = uuid();
    const state = uuid();

    try {
      appleAuthAndroid.configure({
        clientId: 'com.mail--link.cmclogin',
        redirectUri: 'https://www.mail-link.co.kr/login/callback',
        scope: appleAuthAndroid.Scope.ALL,
        responseType: appleAuthAndroid.ResponseType.ALL,
        nonce: rawNonce,
        state,
      });

      const response = await appleAuthAndroid.signIn();
      if (response) {
        const code = response.code; // Present if selected ResponseType.ALL / ResponseType.CODE
        const id_token = response.id_token; // Present if selected ResponseType.ALL / ResponseType.ID_TOKEN
        const user = response.user; // Present when user first logs in using appleId
        const state = response.state; // A copy of the state value that was passed to the initial request.
        console.log('Got auth code', code);
        console.log('Got id_token', id_token);
        console.log('Got user', user);
        console.log('Got state', state);
      }
    } catch (error) {
      if (error && error.message) {
        switch (error.message) {
          case appleAuthAndroid.Error.NOT_CONFIGURED:
            console.log('appleAuthAndroid not configured yet.');
            break;
          case appleAuthAndroid.Error.SIGNIN_FAILED:
            console.log('Apple signin failed.');
            break;
          case appleAuthAndroid.Error.SIGNIN_CANCELLED:
            console.log('User cancelled Apple signin.');
            break;
          default:
            break;
        }
      }
    }
  }

  const SignInApple = async id => {
    const result = await SignUpAPI.authLogin({
      socialType: 'APPLE',
      socialId: id,
    });
    if (result) {
      const result2 = await SignUpAPI.memberInfo();
      console.log('signIn : ', result2);
      if (result2.userType === 'Not Decided') {
        myContext.setIsLogged(true);
      } else if (result2.userType === 'WRITER') {
        myContext.setIsReader('WRITER');
        myContext.setIsLogged(true);
      } else if (result2.userType === 'READER') {
        myContext.setIsReader('READER');
        myContext.setIsLogged(true);
      }
    } else {
      navigation.navigate('SignUpStacks', {
        screen: 'SetProfile',
        params: {
          socialType: 'APPLE',
          socialId: id,
          phoneNumber: '01012341234',
        },
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <FastImage
        style={{
          width: 76.44,
          height: 51.4,
          top: Platform.OS === 'ios' ? 157 : 157 - 48,
          left: 42,
        }}
        source={LogoSignIn}
      />
      <View
        style={{top: Platform.OS === 'ios' ? 236 - 48 : 236 - 96, left: 38}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.NameTitle}>메일링크</Text>
          <Text style={styles.IntroTitle}>를</Text>
        </View>
        <Text style={styles.IntroTitle}>시작해보세요.</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: Platform.OS === 'ios' ? 80 : 80 - 23,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity onPress={getSetProfile}>
            <Image
              style={{width: 312, height: 52, marginBottom: 18}}
              source={KakaoLogin}
            />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={signInWithKakao}>
            <FastImage
              style={{width: 312, height: 52, marginBottom: 18}}
              source={KakaoLogin}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onAppleButtonPress()}>
            <FastImage
              style={{width: 312, height: 52, marginBottom: 18}}
              source={AppleLogin}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Image style={{width: 312, height: 52}} source={AppleLogin} />
          </TouchableOpacity> */}
          <Text style={styles.DescText2}>
            기존 가입 경로를 통해 로그인해주세요
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
    includeFontPadding: false,
  },
  IntroTitle: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 27,
    color: '#3C3C3C',
    includeFontPadding: false,
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
