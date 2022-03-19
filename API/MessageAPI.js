import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCredentials} from '../Credentials';

const BASE_URL = 'https://www.maillink-api.com';

//Message API
export const MessageAPI = {
  getMessageList: async () => {
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
      return false;
    }
  },
};
