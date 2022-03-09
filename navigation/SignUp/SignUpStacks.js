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

const ReaderStack = createNativeStackNavigator();
const ReaderStacks = () => (
  <ReaderStack.Navigator
    sceneContainerStyle={{
      backgroundColor: '#fff',
    }}
    screenOptions={{
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      presentation: 'card',
      headerShown: false,
    }}>
    <ReaderStack.Screen
      name="SignIn"
      component={SignIn}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="SelfAuth"
      component={SelfAuth}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="SetProfile"
      component={SetProfile}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="SelectUserType"
      component={SelectUserType}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="OnBoarding"
      component={OnBoarding}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="Profile"
      component={Profile}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="ProfileIntro"
      component={ProfileIntro}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="ProfileInterest"
      component={ProfileInterest}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="AddWebsite"
      component={AddWebsite}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="AuthorSuccessModal"
      component={AuthorSuccessModal}
      options={{headerTitle: ''}}
    />
  </ReaderStack.Navigator>
);

export default ReaderStacks;
