import AsyncStorage from '@react-native-async-storage/async-storage';

var jwt_decode = require('jwt-decode');

export const getCredentials = async () => {
  try {
    let credentials = await AsyncStorage.getItem('keys');
    console.log('asyncstorage token : ', credentials);
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
  console.log('Loading keys from storage');

  if (keys) {
    console.log('checking access');

    if (!isTokenExpired(keys.access)) {
      console.log('returning access');

      return keys;
    } else {
      console.log('access expired');

      console.log('checking refresh expiry');

      if (!isTokenExpired(keys.refresh)) {
        console.log('fetching access using refresh');

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

        console.log('UPDATED ONE');

        return response;
      } else {
        console.log('refresh expired, please login');

        return null;
      }
    }
  } else {
    console.log('access not available please login');

    return null;
  }
}

//takes the refresh token and returns object consisting of both renewed refresh and access tokens.
async function getAccessUsingRefresh(accessToken, refreshToken) {
  console.log(accessToken, refreshToken);
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
    console.log('reissue : ', response);
    let json = await response.json();
    console.log(json);
    if (json.data) {
      console.log(json.data);
      return json.data;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
}
