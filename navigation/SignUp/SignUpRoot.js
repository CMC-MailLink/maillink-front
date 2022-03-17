import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpStacks from './SignUpStacks';
import ReaderStacks from '../Reader/ReaderStacks';
import AuthorStacks from '../Author/AuthorStacks';
import OnBoardingStacks from '../OnBoarding/OnBoardingStacks';
import AuthorTabs from '../Author/AuthorTabs';
import ReaderTabs from '../Reader/ReaderTabs';

const SignUpNav = createNativeStackNavigator();
const ReaderNav = createNativeStackNavigator();
const AuthorNav = createNativeStackNavigator();
const OnBoardingNav = createNativeStackNavigator();

const SignUpRoot = props => {
  return (
    <SignUpNav.Navigator
      screenOptions={{presentation: 'card', headerShown: false}}>
      <SignUpNav.Screen
        name="SignUpStacks"
        children={({navigation}) => (
          <SignUpStacks
            navigation={navigation}
            setIsReader={props.setIsReader}
            setIsLogged={props.setIsLogged}
            isLogged={props.isLogged}
            isReader={props.isReader}
          />
        )}
      />
      <ReaderNav.Screen name="ReaderStacks" component={ReaderStacks} />
      <AuthorNav.Screen name="AuthorStacks" component={AuthorStacks} />
      <OnBoardingNav.Screen
        name="OnBoardingStacks"
        component={OnBoardingStacks}
      />
      <AuthorNav.Screen
        name="AuthorTabs"
        component={AuthorTabs}></AuthorNav.Screen>
      <ReaderNav.Screen name="ReaderTabs" component={ReaderTabs} />
    </SignUpNav.Navigator>
  );
};

export default SignUpRoot;
