import AsyncStorage from '@react-native-async-storage/async-storage';

var jwt_decode = require('jwt-decode');

export const getCredentials = async () => {
  try {
    let credentials = await AsyncStorage.getItem('keys');
    if (!credentials) return null;
    let cred = await getVerifiedKeys(JSON.parse(credentials));

    if (credentials != null && cred != null) {
      return cred;
    } else {
      return null;
    }
  } catch (e) {}
  return null;
};

// returns true if the token is expired or false if not expired
function isTokenExpired(token) {
  var decoded = jwt_decode(token);

  if (decoded.exp < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
}

//checks the expiry of access token and refresh token and act accordingly.
async function getVerifiedKeys(keys) {
  if (keys) {
    if (!isTokenExpired(keys.access)) {
      return keys;
    } else {
      if (!isTokenExpired(keys.refresh)) {
        const response = await getAccessUsingRefresh(keys.access, keys.refresh);

        console.log(
          '토큰 재발급 : ',
          response.accessToken,
          response.refreshToken,
        );

        await AsyncStorage.setItem(
          'keys',
          JSON.stringify({
            access: response.accessToken,
            refresh: response.refreshToken,
          }),
        );

        return response;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
}

//takes the refresh token and returns object consisting of both renewed refresh and access tokens.
async function getAccessUsingRefresh(accessToken, refreshToken) {
  try {
    const response = await fetch(
      `https://www.maillink-api.com/api/v1/member/auth/reissue`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: accessToken,
          refreshToken: refreshToken,
        }),
      },
    );
    let json = await response.json();
    if (json.data) {
      return json.data;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
}
