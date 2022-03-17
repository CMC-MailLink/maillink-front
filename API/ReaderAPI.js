import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http:52.79.226.129:8080';

//Reader API
export const ReaderAPI = {
  //유저 정보 조회
  memberInfo: async () => {
    var token = await AsyncStorage.getItem('keys');
    var accessToken = JSON.parse(token).access;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/member/info`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
