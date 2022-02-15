import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Root from './navigation/Root';
import {setCustomText} from 'react-native-global-props';
import {StatusBar} from 'react-native';

const customTextProps = {
  style: {
    fontFamily: 'NotoSansKR-regular',
  },
};

const App = () => {
  setCustomText(customTextProps);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content"></StatusBar>
      <Root></Root>
    </NavigationContainer>
  );
};

export default App;
