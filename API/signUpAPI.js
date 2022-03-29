import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCredentials} from '../Credentials';
import {API_URL} from '@env';

const BASE_URL = API_URL;

//회원가입 API
export const SignUpAPI = {
  //휴대폰 문자 인증 코드 발송
  codeSending: async ({target}) => {
    console.log('휴대폰 문자 인증 코드 발송');
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/member/auth/code/send/${target}`,
        {
          method: 'post',
        },
      );
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //휴대폰 문자 인증 코드 인증
  codeChecking: async ({target, code}) => {
    console.log('휴대폰 문자 인증 코드인증');
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/member/auth/code/check/${target}?code=${code}`,
        {
          method: 'post',
        },
      );
      if (response.ok) {
        let json = await response.json();
        if (json.data === true) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //프로필 이미지 업로드
  profileEditing: async ({image}) => {
    console.log('프로필 이미지 업로드');
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/member/auth/signup/profile/img/`,
        {
          method: 'post',
          body: image,
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );
      if (response.ok) {
        let json = await response.json();
        return json.data;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //로그인
  authLogin: async ({socialType, socialId}) => {
    console.log('로그인');
    console.log(socialType, socialId);
    var fcmDeviceToken = await AsyncStorage.getItem('fcmToken');
    try {
      const response = await fetch(`${BASE_URL}/api/v1/member/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   socialType: socialType,
        //   socialId: socialId,
        //   fcmDeviceToken: fcmDeviceToken,
        // }),
        body: JSON.stringify({
          socialType: 'APPLE',
          socialId: 'bibitest7',
          fcmDeviceToken: fcmDeviceToken,
        }),
      });
      let json = await response.json();
      if (json.errorCode === 400) {
        return false;
      }
      if (json.data) {
        async function addToken() {
          try {
            await AsyncStorage.setItem(
              'keys',
              JSON.stringify({
                access: json.data.accessToken,
                refresh: json.data.refreshToken,
              }),
            );
          } catch (e) {
            console.log(e);
          }
        }
        addToken();
        return true;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //회원 가입
  authSignUp: async ({socialType, socialId, nickName, imgUrl, phoneNumber}) => {
    console.log('회원가입');
    var fcmDeviceToken = await AsyncStorage.getItem('fcmToken');
    try {
      const response = await fetch(`${BASE_URL}/api/v1/member/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   socialType: socialType,
        //   socialId: socialId,
        //   nickName: nickName,
        //   imgUrl: imgUrl,
        //   phoneNumber: phoneNumber,
        //   fcmDeviceToken: fcmDeviceToken,
        // }),
        body: JSON.stringify({
          socialType: 'APPLE',
          socialId: 'bibitest7',
          nickName: '비비테스트7',
          imgUrl: imgUrl,
          phoneNumber: '01011111111',
          fcmDeviceToken: fcmDeviceToken,
        }),
      });
      let json = await response.json();
      if (json.errorCode === 400) {
        return false;
      }
      if (json.data) {
        async function addToken() {
          try {
            await AsyncStorage.setItem(
              'keys',
              JSON.stringify({
                access: json.data.accessToken,
                refresh: json.data.refreshToken,
              }),
            );
          } catch (e) {
            console.log(e);
          }
        }
        addToken();
        return true;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //유저 정보 조회
  memberInfo: async () => {
    console.log('유저정보조회');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/member/info`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      let json = await response.json();
      return json.data.userType;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //유저타입변경
  memberType: async ({userType}) => {
    console.log('유저타입변경');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/member/auth/type/?userType=${userType}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      let json = await response.json();
      return json.data.userType;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //닉네임중복확인
  checkNickName: async ({nickName}) => {
    console.log('닉네임 중복 확인');
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/member/auth/signup/nickname/check?nickName=${nickName}`,
        {
          method: 'post',
        },
      );
      let json = await response.json();
      if (json.errorCode === 400) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //작가 정보 저장
  setAuthorInfo: async ({
    introduction,
    genre1,
    genre2,
    genre3,
    mood1,
    mood2,
    mood3,
    facebook,
    twitter,
    instagram,
    etc,
  }) => {
    console.log('작가 정보 저장');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/writer/info`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          introduction: introduction,
          genre1: genre1,
          genre2: genre2,
          genre3: genre3,
          mood1: mood1,
          mood2: mood2,
          mood3: mood3,
          facebook: facebook,
          twitter: twitter,
          instagram: instagram,
          etc: etc,
        }),
      });
      let json = await response.json();
      if (json.errorCode === 400) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
};
