import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
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
import {signUpAPI} from '../../API/signUpAPI';

import LogoSignIn from '../../assets/images/LogoSignIn.png';
import KakaoLogin from '../../assets/images/KakaoLogin.png';
import AppleLogin from '../../assets/images/AppleLogin.png';
import LineSignIn from '../../assets/images/LineSignIn.png';

const SignIn = props => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const signInWithKakao = async () => {
    const token = await login();
    getProfile();
  };

  const getProfile = async () => {
    const profile = await getKakaoProfile();
    const result = await signUpAPI.authLogin({
      socialType: 'KAKAO',
      socialId: profile.id,
    });
    if (result) {
      const result2 = await signUpAPI.memberInfo();
      console.log('signIn : ', result2);
      if (result2 === 'Not Decided') {
        props.setIsLogged(true);
      } else if (result2 === 'WRITER') {
        props.setIsReader('WRITER');
        props.setIsLogged(true);
      } else if (result2 === 'READER') {
        props.setIsReader('READER');
        props.setIsLogged(true);
      }
    } else {
      navigation.navigate('SignUpStacks', {
        screen: 'SelfAuth',
        params: {
          socialType: 'KAKAO',
          socialId: profile.id,
          setIsLogged: props.setIsLogged,
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
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const {email, email_verified, is_private_email, sub} = jwt_decode(
        appleAuthRequestResponse.identityToken,
      );

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      console.log(credentialState);
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        var temp = `
        email: ${email}
        email_verified: ${email_verified}
        is_private_email: ${is_private_email}
        sub: ${sub}`;
        console.log(temp);
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

    try {
      // Initialize the module
      appleAuthAndroid.configure({
        // The Service ID you registered with Apple
        clientId: 'com.mail--link.cmclogin',

        // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
        // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
        redirectUri: 'https://www.mail-link.co.kr/login/callback',

        // [OPTIONAL]
        // Scope.ALL (DEFAULT) = 'email name'
        // Scope.Email = 'email';
        // Scope.Name = 'name';
        scope: appleAuthAndroid.Scope.ALL,

        // [OPTIONAL]
        // ResponseType.ALL (DEFAULT) = 'code id_token';
        // ResponseType.CODE = 'code';
        // ResponseType.ID_TOKEN = 'id_token';
        responseType: appleAuthAndroid.ResponseType.ALL,

        // [OPTIONAL]
        // A String value used to associate a client session with an ID token and mitigate replay attacks.
        // This value will be SHA256 hashed by the library before being sent to Apple.
        // This is required if you intend to use Firebase to sign in with this credential.
        // Supply the response.id_token and rawNonce to Firebase OAuthProvider
        nonce: rawNonce,

        // [OPTIONAL]
        // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Image
        style={{
          width: 62.86,
          height: 49,
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
            <Image
              style={{width: 312, height: 52, marginBottom: 18}}
              source={KakaoLogin}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onAppleButtonPress()}>
            <Image
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
