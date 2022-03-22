import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCredentials} from '../Credentials';

const BASE_URL = 'https://www.maillink-api.com';

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
      console.log(json.data);
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
      console.log(response);
      let json = await response.json();
      console.log(json.data);
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
      console.log(response);
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
      console.log(response);
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
      console.log(response);
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
      console.log(response);
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
      console.log(response);
      let json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
