import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardingStacks from './OnBoardingStacks';
import ReaderTabs from '../Reader/ReaderTabs';

const OnBoardingNav = createNativeStackNavigator();
const ReaderNav = createNativeStackNavigator();

const OnBoardingRoot = props => {
  console.log(props);
  return (
    <OnBoardingNav.Navigator
      screenOptions={{presentation: 'card', headerShown: false}}>
      <OnBoardingNav.Screen
        name="OnBoardingStacks"
        children={({navigation}) => (
          <OnBoardingStacks
            navigation={navigation}
            setIsReader={props.setIsReader}
            setIsLogged={props.setIsLogged}
          />
        )}
      />
      <ReaderNav.Screen name="ReaderTabs" component={ReaderTabs} />
    </OnBoardingNav.Navigator>
  );
};

export default OnBoardingRoot;
