import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectUserType from '../../Screen/OnBoarding/SelectUserType';
import OnBoarding from '../../Screen/OnBoarding/OnBoarding';
import Profile from '../../Screen/OnBoarding/Profile';
import ProfileIntro from '../../Screen/OnBoarding/ProfileIntro';
import ProfileInterest from '../../Screen/OnBoarding/ProfileInterest';
import AddWebsite from '../../Screen/OnBoarding/AddWebsite';
import AuthorSuccessModal from '../../Screen/OnBoarding/AuthorSuccessModal';
import ReaderAnalyze from '../../Screen/Reader/Analyze/ReaderAnalyze';
import ReaderAnalyzeOne from '../../Screen/Reader/Analyze/ReaderAnalyzeOne';
import ReaderAnalyzeTwo from '../../Screen/Reader/Analyze/ReaderAnalyzeTwo';
import ReaderAnalyzeThree from '../../Screen/Reader/Analyze/ReaderAnalyzeThree';
import ReaderAnalyzeFour from '../../Screen/Reader/Analyze/ReaderAnalyzeFour';
import ReaderAnalyzeFive from '../../Screen/Reader/Analyze/ReaderAnalyzeFive';
import ReaderAnalyzeSix from '../../Screen/Reader/Analyze/ReaderAnalyzeSix';
import ReaderAnalyzeSeven from '../../Screen/Reader/Analyze/ReaderAnalyzeSeven';
import ReaderAnalyzeEight from '../../Screen/Reader/Analyze/ReaderAnalyzeEight';
import ReaderAnalyzeNine from '../../Screen/Reader/Analyze/ReaderAnalyzeNine';
import ReaderAnalyzeResult from '../../Screen/Reader/Analyze/ReaderAnalyzeResult';

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
      <OnBoardingStack.Screen
        name="ReaderAnalyze"
        component={ReaderAnalyze}
        options={{headerTitle: '', presentation: 'fullScreenModal'}}
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
    </OnBoardingStack.Navigator>
  );
};

export default OnBoardingStacks;
