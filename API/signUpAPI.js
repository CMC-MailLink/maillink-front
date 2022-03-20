import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCredentials} from '../Credentials';

const BASE_URL = 'https://www.maillink-api.com';

//회원가입 API
export const SignUpAPI = {
  //휴대폰 문자 인증 코드 발송
  codeSending: async ({target}) => {
    console.log('codeSending api : ', target);
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
    console.log('codeChecking api : ', target, code);
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
    console.log('profileEditing api : ', image);
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
    console.log('authLogin api : ', socialType, socialId);
    try {
      const response = await fetch(`${BASE_URL}/api/v1/member/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({socialType: socialType, socialId: socialId}),
        body: JSON.stringify({
          socialType: 'KAKAO',
          socialId: 'dongurireader8',
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
    console.log(
      'authSignUp api : ',
      socialType,
      socialId,
      nickName,
      imgUrl,
      phoneNumber,
    );
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
        // }),
        body: JSON.stringify({
          socialType: 'KAKAO',
          socialId: 'dongurireader8',
          nickName: '동구리독자8',
          imgUrl:
            'https://mail-link.s3.ap-northeast-2.amazonaws.com/static/164708455610988511.png',
          phoneNumber: '01011111111',
        }),
      });
      let json = await response.json();
      console.log(json);
      if (json.errorCode === 400) {
        return false;
      }
      if (json.data) {
        console.log(json.data);
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
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/member/info`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      let json = await response.json();
      console.log(json);
      return json.data.userType;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //유저타입변경
  memberType: async ({userType}) => {
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
      console.log(json);
      return json.data.userType;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
