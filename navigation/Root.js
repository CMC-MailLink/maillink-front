import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUpStacks from './SignUp/SignUpStacks';
import ReaderStacks from './Reader/ReaderStacks';
import AuthorStacks from './Author/AuthorStacks';
import OnBoardingStacks from './OnBoarding/OnBoardingStacks';
import AuthorTabs from './Author/AuthorTabs';
import ReaderTabs from './Reader/ReaderTabs';

const RootNav = createNativeStackNavigator();
const SignUpNav = createNativeStackNavigator();
const ReaderNav = createNativeStackNavigator();
const AuthorNav = createNativeStackNavigator();
const OnBoardingNav = createNativeStackNavigator();

const Root = props => {
  return (
    <RootNav.Navigator screenOptions={{headerShown: false}}>
      {!props.isLogged ? (
        <RootNav.Group>
          <SignUpNav.Screen name="SignUpStacks" component={SignUpStacks} />
          <OnBoardingNav.Screen
            name="OnBoardingStacks"
            component={OnBoardingStacks}
          />
        </RootNav.Group>
      ) : (
        <RootNav.Group>
          {props.isReader === 'Not Decided' ? (
            <RootNav.Group>
              <OnBoardingNav.Screen
                name="OnBoardingStacks"
                component={OnBoardingStacks}
              />
            </RootNav.Group>
          ) : props.isReader === 'READER' ? (
            <RootNav.Group>
              <ReaderNav.Screen name="ReaderTabs" component={ReaderTabs} />
              <ReaderNav.Screen name="ReaderStacks" component={ReaderStacks} />
            </RootNav.Group>
          ) : (
            <RootNav.Group>
              <AuthorNav.Screen name="AuthorTabs" component={AuthorTabs} />
              <AuthorNav.Screen name="AuthorStacks" component={AuthorStacks} />
            </RootNav.Group>
          )}
        </RootNav.Group>
      )}
    </RootNav.Navigator>
  );
};

export default Root;
