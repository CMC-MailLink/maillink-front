import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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

import LogoSignIn from '../../assets/images/LogoSignIn.png';
import KakaoLogin from '../../assets/images/KakaoLogin.png';
import AppleLogin from '../../assets/images/AppleLogin.png';
import LineSignIn from '../../assets/images/LineSignIn.png';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const onPressNaverLogin = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'SetProfileSelfAuth',
    });
  };

  const getSetProfile = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'SetProfile',
    });
  };

  const [result, setResult] = useState('');
  const [result2, setResult2] = useState('');

  const signInWithKakao = async () => {
    const token = await login();
    console.log(token);
    setResult(JSON.stringify(token));
    console.log(result);
  };

  const getProfile = async () => {
    const profile = await getKakaoProfile();
    console.log(profile);
    setResult2(JSON.stringify(profile));
    console.log(result2);
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
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        console.log(appleAuthRequestResponse);
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
    // Generate secure, random values for state and nonce
    const rawNonce = uuid();
    const state = uuid();

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: 'com.example.client-android',

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: 'https://example.com/auth/callback',

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    // Open the browser window for user sign in
    const response = await appleAuthAndroid.signIn();
    console.log(response);

    // Send the authorization code to your backend for verification
  }

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
          <TouchableOpacity onPress={getSetProfile}>
            <Image style={{width: 312, height: 52}} source={KakaoLogin} />
          </TouchableOpacity>
          <TouchableOpacity onPress={signInWithKakao}>
            <Image style={{width: 200, height: 52}} source={KakaoLogin} />
          </TouchableOpacity>
          <TouchableOpacity onPress={getProfile}>
            <Text>프로필조회</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onAppleButtonPress()}>
            <Image style={{width: 312, height: 52}} source={AppleLogin} />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Image style={{width: 312, height: 52}} source={AppleLogin} />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            marginTop: 68,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={{width: 43, height: 1}} source={LineSignIn} />
          <Text style={styles.DescText}>이미 회원이신가요?</Text>
          <Image style={{width: 43, height: 1}} source={LineSignIn} />
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
