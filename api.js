import axios from 'axios';
const BASE_URL = 'http:52.79.226.129:8080';

//회원가입 API
export const signUpAPI = {
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
      } else return false;
    } catch (e) {
      console.log(e);
      return false;
    }
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
        if (json.data === true) return true;
        else return false;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },
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
      return false;
    }
  },
};
