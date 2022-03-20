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
  readerMailBox: async ({queryKey}) => {
    console.log('독자 메일함 조회');
    var token = await getCredentials();
    const [_, sort] = queryKey;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/reader/mailbox`, {
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
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
