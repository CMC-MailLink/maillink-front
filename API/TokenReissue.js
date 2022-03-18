import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext} from 'react';
import AppContext from '../AppContext';

const BASE_URL = 'http:52.79.226.129:8080';

export const TokenReissue = async ({accessToken, refreshToken}) => {
  const myContext = useContext(AppContext);
  console.log('토큰만료');
  //토큰만료
  const response = await fetch(`${BASE_URL}/api/v1/member/auth/reissue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  });
  let json = await response.json();
  if (json.data) {
    async function addToken() {
      try {
        await AsyncStorage.setItem(
          'keys',
          JSON.stringify({
            access: json.data.accessToken,
            refresh: json.data.refreshToken,
          }),
        );
      } catch (e) {
        console.log(e);
      }
    }
    addToken();
    return true;
  } else {
    AsyncStorage.removeItem('keys');
    myContext.setIsLogged(false);
  }
};
