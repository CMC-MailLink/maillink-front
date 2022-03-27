import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCredentials} from '../Credentials';
import {API_URL} from '@env';

const BASE_URL = API_URL;

//Message API
export const MessageAPI = {
  //최근 메세지 리스트 조회
  getMessageList: async () => {
    console.log('최근 메세지 리스트 조회');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/reader/message/recent`, {
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
  //메세지 전송
  messageSending: async ({partnerId, text}) => {
    console.log('메세지 전송');
    var token = await getCredentials();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/reader/message/send`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partnerId: partnerId,
          text: text,
        }),
      });
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  //상대방과의 메세지 내역 조회
  getMessagePartner: async ({queryKey}) => {
    console.log('상대방과의 메세지 내역 조회');
    const [_, partnerId] = queryKey;
    var token = await getCredentials();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/reader/message/talk/${partnerId}`,
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
