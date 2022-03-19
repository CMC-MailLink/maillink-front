import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCredentials} from '../Credentials';

const BASE_URL = 'http:52.79.226.129:8080';

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
      console.log(json);
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  //작가 임시저장 리스트 조회
  writerGetSaving: async ({queryKey}) => {
    console.log('작가 임시저장 리스트 조회');
    const [_, sort] = queryKey;
    console.log(typeof sort);
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/writer/publish/temp`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      let json = await response.json();
      var result = json.data;
      result.sort(function (a, b) {
        if (a.tempSaveTime >= b.tempSaveTime) {
          return sort === true ? -1 : 1;
        } else if (a.tempSaveTime < b.tempSaveTime) {
          return sort === true ? 1 : -1;
        }
      });
      console.log(result);
      return result;
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
      const response = await fetch(`${BASE_URL}/api/v1/writer/publish/temp`, {
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
      let json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
