import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../Screen/SignUp/SignIn';
import SelfAuth from '../../Screen/SignUp/SelfAuth';
import SetProfile from '../../Screen/SignUp/SetProfile';

const SignUpStack = createNativeStackNavigator();
const SignUpStacks = props => {
  return (
    <SignUpStack.Navigator
      sceneContainerStyle={{
        backgroundColor: '#fff',
      }}
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        presentation: 'card',
        headerShown: false,
      }}>
      <SignUpStack.Screen
        name="SignIn"
        children={({navigation}) => (
          <SignIn
            navigation={navigation}
            setIsReader={props.setIsReader}
            setIsLogged={props.setIsLogged}
          />
        )}
        options={{headerTitle: ''}}
      />
      <SignUpStack.Screen
        name="SelfAuth"
        component={SelfAuth}
        options={{headerTitle: ''}}
      />
      <SignUpStack.Screen
        name="SetProfile"
        component={SetProfile}
        options={{headerTitle: ''}}
      />
    </SignUpStack.Navigator>
  );
};

export default SignUpStacks;
