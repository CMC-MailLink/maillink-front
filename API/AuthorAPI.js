import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCredentials} from '../Credentials';
import {API_URL} from '@env';

const BASE_URL = API_URL;

//Author API
export const AuthorAPI = {
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
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //작가 발행 메일 리스트 조회
  writerGetPublishing: async () => {
    console.log('작가 발행 메일 리스트 조회');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/writer/publish`, {
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
  //작가 임시저장 리스트 조회
  writerGetSaving: async () => {
    console.log('작가 임시저장 리스트 조회');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/writer/temp`, {
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
  //작가 임시저장
  writerPostSaving: async ({title, content, preView}) => {
    console.log('작가 임시저장');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/writer/temp`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          preView: preView,
        }),
      });
      if (response.status !== 200) {
        return false;
      }
      let json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //작가 메일발행
  writerPostSending: async ({title, content, preView}) => {
    console.log('작가 메일발행');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/writer/publish`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          preView: preView,
        }),
      });
      if (response.status !== 200) {
        return false;
      }
      let json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //작가 메일임시저장 수정
  writerTempSaving: async ({mailId, title, content, preView}) => {
    console.log('작가 메일 임시저장 수정');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/writer/temp`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mailId: mailId,
          title: title,
          content: content,
          preView: preView,
        }),
      });
      if (response.status !== 200) {
        return false;
      }
      let json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //작가 메일 임시저장 발행
  writerTempSending: async ({tempMailId}) => {
    console.log('작가 메일 임시저장 발행');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/writer/temp/publish?tempMailId=${tempMailId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      if (response.status !== 200) {
        return false;
      }
      let json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //작가 임시저장 삭제
  writerTempDeleting: async ({tempMailId}) => {
    console.log('작가 메일 임시저장 삭제');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/writer/temp?tempMailId=${tempMailId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      let json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //작가 본인 정보 조회
  writerInfo: async () => {
    console.log('작가 본인 정보 조회');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/writer/info/self`, {
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
  //프로필 이미지 업로드
  profileEditing: async ({image}) => {
    console.log('작가 프로필 이미지 업로드');
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
  //닉네임중복확인
  checkNickName: async ({nickName}) => {
    console.log('작가 닉네임 중복 확인');
    var token = await getCredentials();
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
  //프로필 수정
  infoEditing: async ({
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
    console.log('작가 프로필 수정');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/writer/info`, {
        method: 'post',
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
  //닉네임변경
  changeNickName: async ({nickName}) => {
    console.log('작가 닉네임 변경');
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
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //프로필이미지변경
  changeProfileImage: async ({image}) => {
    console.log('작가 프로필 이미지 변경');
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
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //대표글설정하기
  setRepresent: async ({mailId}) => {
    console.log('작가 대표글 설정하기');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/writer/represent?mailId=${mailId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      if (response.status === 200) return true;
      else return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //대표글설정 취소 ㄴ하기
  cancelRepresent: async ({mailId}) => {
    console.log('작가 대표글 설정 취소하기');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/writer/represent?mailId=${mailId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      if (response.status === 200) return true;
      else return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //메일 비공개하기
  cancelPublic: async ({mailId}) => {
    console.log('작가 메일 비공개하기');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/writer/mail/private?mailId=${mailId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      if (response.status === 200) return true;
      else return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //메일 공개하기
  setPublic: async ({mailId}) => {
    console.log('작가 메일 공개하기');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/writer/mail/private?mailId=${mailId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      if (response.status === 200) return true;
      else return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //작가알림설정
  setAlarm: async ({subscribeAlarm, messageAlarm}) => {
    console.log('작가 알림 설정');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/member/alarm/writer?subscribeAlarm=${subscribeAlarm}&messageAlarm=${messageAlarm}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
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
  getAlarm: async () => {
    console.log('작가 알림 정보얻기');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/member/alarm/writer`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      let json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //메일 이미지 업로드
  publishImage: async ({image}) => {
    console.log('작가 메일 이미지 업로드');
    var token = await getCredentials();
    console.log(image, token);
    try {
      const response = await fetch(`${BASE_URL}/api/v1/writer/publish/img`, {
        method: 'POST',
        body: image,
        headers: {
          Authorization: `Bearer ${token.access}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
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
  //작가 구독자수 확인
  getfollowerNum: async () => {
    console.log('작가 구독자수 확인');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/writer/subscriber/count`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      let json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  getfollowerList: async () => {
    console.log('작가 구독자리스트 확인');
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/writer/subscriber/info`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      let json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
};
