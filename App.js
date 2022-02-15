import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Root from './navigation/Root';
import {setCustomText} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontFamily: 'NotoSansKR-regular',
  },
};

const App = () => {
  setCustomText(customTextProps);

  return (
    <NavigationContainer>
      <Root></Root>
    </NavigationContainer>
  );
};

export default App;
