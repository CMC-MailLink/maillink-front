import axios from 'axios';
const BASE_URL = 'http:52.79.226.129:8080';

//회원가입 API
export const signUpAPI = {
  //휴대폰 문자 인증 코드 발송
  codeSending: async ({target}) => {
    console.log(target);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/member/auth/code/send/${target}`,
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
    console.log(target, code);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/member/auth/code/check/${target}?code=${code}`,
      );
      if (response.data.data === true) return true;
      else return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
