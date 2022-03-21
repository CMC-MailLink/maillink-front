import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCredentials} from '../Credentials';

const BASE_URL = 'https://www.maillink-api.com';

//Reader API
export const ReaderAPI = {
  //유저 정보 조회
  memberInfo: async () => {
    console.log('독자 유저 정보 조회');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/member/info`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      let json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //독자 메일함 조회
  readerMailBox: async () => {
    console.log('독자 메일함 조회');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/reader/mailbox`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      let json = await response.json();
      console.log(json.data);
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //닉네임변경
  changeNickName: async ({nickName}) => {
    console.log('독자 닉네임 변경');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/member/nickname?nickName=${nickName}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      console.log(response);
      if (response.status === 200) return true;
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //프로필이미지변경
  changeProfileImage: async ({image}) => {
    console.log('독자 프로필 이미지 변경');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/member/profile/img`, {
        method: 'PUT',
        body: image,
        headers: {
          Authorization: `Bearer ${token.access}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) return true;
      else return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //닉네임중복확인
  checkNickName: async ({nickName}) => {
    console.log('독자 닉네임 중복 확인');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/member/auth/signup/nickname/check?nickName=${nickName}`,
        {
          method: 'post',
        },
      );
      console.log(response);
      let json = await response.json();
      if (json.errorCode === 400) return false;
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //전체 작가 리스트 조회
  getWriters: async () => {
    console.log('전체 작가 리스트 조회');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/reader/writers`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      console.log(response);
      let json = await response.json();
      console.log(json.data);
      return json.data;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //작가 구독하기
  subscribing: async ({writerId}) => {
    console.log('독자 작가 구독하기');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/reader/subscribe?writerId=${writerId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      console.log(response);
      if (response.status === 200) return true;
      return false;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //작가 구독취소하기
  cancelSubscribing: async ({writerId}) => {
    console.log('독자 작가 구독취소하기');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/reader/subscribe?writerId=${writerId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      console.log(response);
      if (response.status === 200) return true;
      return false;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //독자 메일 단독 조회
  mailReading: async ({queryKey}) => {
    console.log('독자 메일 단독 조회');
    const [_, mailId] = queryKey;
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/reader/mail/${mailId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      console.log(response);
      let json = await response.json();
      console.log(json.data);
      return json.data;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //독자 메일 저장
  mailSaving: async ({mailId}) => {
    console.log('독자 메일 저장');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/reader/save/${mailId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      console.log(response);
      if (response.status === 200) return true;
      return false;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //독자 메일 저장 취소
  mailCancelSaving: async ({mailId}) => {
    console.log('독자 메일 저장 취소');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/reader/save/${mailId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      console.log(response);
      if (response.status === 200) return true;
      return false;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
};
