import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../Screen/SignUp/SignIn';
import SelfAuth from '../../Screen/SignUp/SelfAuth';
import SetProfile from '../../Screen/SignUp/SetProfile';
import SelectUserType from '../../Screen/SignUp/SelectUserType';
import OnBoarding from '../../Screen/OnBoarding';
import Profile from '../../Screen/SignUp/Author/Profile';
import ProfileIntro from '../../Screen/SignUp/Author/ProfileIntro';
import ProfileInterest from '../../Screen/SignUp/Author/ProfileInterest';
import AddWebsite from '../../Screen/SignUp/Author/AddWebsite';
import AuthorSuccessModal from '../../Screen/SignUp/Author/AuthorSuccessModal';
import ReaderAnalyze from '../../Screen/Reader/Analyze/ReaderAnalyze';

const SignUpStack = createNativeStackNavigator();
const SignUpStacks = () => (
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
      component={SignIn}
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
    <SignUpStack.Screen
      name="SelectUserType"
      component={SelectUserType}
      options={{headerTitle: ''}}
    />
    <SignUpStack.Screen
      name="OnBoarding"
      component={OnBoarding}
      options={{headerTitle: ''}}
    />
    <SignUpStack.Screen
      name="Profile"
      component={Profile}
      options={{headerTitle: ''}}
    />
    <SignUpStack.Screen
      name="ProfileIntro"
      component={ProfileIntro}
      options={{headerTitle: ''}}
    />
    <SignUpStack.Screen
      name="ProfileInterest"
      component={ProfileInterest}
      options={{headerTitle: ''}}
    />
    <SignUpStack.Screen
      name="AddWebsite"
      component={AddWebsite}
      options={{headerTitle: ''}}
    />
    <SignUpStack.Screen
      name="AuthorSuccessModal"
      component={AuthorSuccessModal}
      options={{headerTitle: ''}}
    />
  </SignUpStack.Navigator>
);

export default SignUpStacks;
