import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectUserType from '../../Screen/OnBoarding/SelectUserType';
import OnBoarding from '../../Screen/OnBoarding/OnBoarding';
import Profile from '../../Screen/OnBoarding/Profile';
import ProfileIntro from '../../Screen/OnBoarding/ProfileIntro';
import ProfileInterest from '../../Screen/OnBoarding/ProfileInterest';
import AddWebsite from '../../Screen/OnBoarding/AddWebsite';
import AuthorSuccessModal from '../../Screen/OnBoarding/AuthorSuccessModal';
import ReaderAnalyze from '../../Screen/OnBoarding/ReaderAnalyze';
import ReaderAnalyzeOne from '../../Screen/OnBoarding/ReaderAnalyzeOne';
import ReaderAnalyzeTwo from '../../Screen/OnBoarding/ReaderAnalyzeTwo';
import ReaderAnalyzeThree from '../../Screen/OnBoarding/ReaderAnalyzeThree';
import ReaderAnalyzeFour from '../../Screen/OnBoarding/ReaderAnalyzeFour';
import ReaderAnalyzeFive from '../../Screen/OnBoarding/ReaderAnalyzeFive';
import ReaderAnalyzeSix from '../../Screen/OnBoarding/ReaderAnalyzeSix';
import ReaderAnalyzeSeven from '../../Screen/OnBoarding/ReaderAnalyzeSeven';
import ReaderAnalyzeEight from '../../Screen/OnBoarding/ReaderAnalyzeEight';
import ReaderAnalyzeNine from '../../Screen/OnBoarding/ReaderAnalyzeNine';
import ReaderAnalyzeResult from '../../Screen/OnBoarding/ReaderAnalyzeResult';
import ReaderAuthorProfile from '../../Screen/Reader/Profile/ReaderAuthorProfile';

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
      <OnBoardingStack.Screen
        name="ReaderAnalyze"
        component={ReaderAnalyze}
        options={{headerTitle: ''}}
      />
      <OnBoardingStack.Screen
        name="ReaderAnalyzeOne"
        component={ReaderAnalyzeOne}
        options={{headerTitle: '', animation: 'fade'}}
      />
      <OnBoardingStack.Screen
        name="ReaderAnalyzeTwo"
        component={ReaderAnalyzeTwo}
        options={{headerTitle: '', animation: 'fade'}}
      />
      <OnBoardingStack.Screen
        name="ReaderAnalyzeThree"
        component={ReaderAnalyzeThree}
        options={{headerTitle: '', animation: 'fade'}}
      />
      <OnBoardingStack.Screen
        name="ReaderAnalyzeFour"
        component={ReaderAnalyzeFour}
        options={{headerTitle: '', animation: 'fade'}}
      />
      <OnBoardingStack.Screen
        name="ReaderAnalyzeFive"
        component={ReaderAnalyzeFive}
        options={{headerTitle: '', animation: 'fade'}}
      />
      <OnBoardingStack.Screen
        name="ReaderAnalyzeSix"
        component={ReaderAnalyzeSix}
        options={{headerTitle: '', animation: 'fade'}}
      />
      <OnBoardingStack.Screen
        name="ReaderAnalyzeSeven"
        component={ReaderAnalyzeSeven}
        options={{headerTitle: '', animation: 'fade'}}
      />
      <OnBoardingStack.Screen
        name="ReaderAnalyzeEight"
        component={ReaderAnalyzeEight}
        options={{headerTitle: '', animation: 'fade'}}
      />
      <OnBoardingStack.Screen
        name="ReaderAnalyzeNine"
        component={ReaderAnalyzeNine}
        options={{headerTitle: '', animation: 'fade'}}
      />
      <OnBoardingStack.Screen
        name="ReaderAnalyzeResult"
        component={ReaderAnalyzeResult}
        options={{headerTitle: '', animation: 'fade'}}
      />
      <OnBoardingStack.Screen
        name="ReaderAuthorProfile"
        component={ReaderAuthorProfile}
        options={{headerTitle: ''}}
      />
    </OnBoardingStack.Navigator>
  );
};

export default OnBoardingStacks;
