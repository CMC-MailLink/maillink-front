import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectUserType from '../../Screen/OnBoarding/SelectUserType';
import OnBoarding from '../../Screen/OnBoarding/OnBoarding';
import Profile from '../../Screen/OnBoarding/Profile';
import ProfileIntro from '../../Screen/OnBoarding/ProfileIntro';
import ProfileInterest from '../../Screen/OnBoarding/ProfileInterest';
import AddWebsite from '../../Screen/OnBoarding/AddWebsite';
import AuthorSuccessModal from '../../Screen/OnBoarding/AuthorSuccessModal';

const OnBoardingStack = createNativeStackNavigator();
const OnBoardingStacks = props => {
  return (
    <OnBoardingStack.Navigator
      sceneContainerStyle={{
        backgroundColor: '#fff',
      }}
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        presentation: 'card',
        headerShown: false,
      }}>
      <OnBoardingStack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerTitle: ''}}
      />
      <OnBoardingStack.Screen
        name="SelectUserType"
        component={SelectUserType}
        options={{headerTitle: ''}}
      />
      <OnBoardingStack.Screen
        name="Profile"
        component={Profile}
        options={{headerTitle: ''}}
      />
      <OnBoardingStack.Screen
        name="ProfileIntro"
        component={ProfileIntro}
        options={{headerTitle: ''}}
      />
      <OnBoardingStack.Screen
        name="ProfileInterest"
        component={ProfileInterest}
        options={{headerTitle: ''}}
      />
      <OnBoardingStack.Screen
        name="AddWebsite"
        component={AddWebsite}
        options={{headerTitle: ''}}
      />
      <OnBoardingStack.Screen
        name="AuthorSuccessModal"
        component={AuthorSuccessModal}
        options={{headerTitle: ''}}
      />
    </OnBoardingStack.Navigator>
  );
};

export default OnBoardingStacks;
