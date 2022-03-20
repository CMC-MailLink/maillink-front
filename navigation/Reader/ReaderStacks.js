import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Alarm from '../../Screen/Reader/Alarm.js';
import ReaderMailSearch from '../../Screen/Reader/Mail/ReaderMailSearch';
import ReaderReading from '../../Screen/Reader/Reading/ReaderReading';
import InstaShare from '../../Screen/InstaShare';
import ReaderProfileSearch from '../../Screen/Reader/Profile/ReaderProfileSearch';
import Setting from '../../Screen/Setting/Setting';
import SettingAlarm from '../../Screen/Setting/SettingAlarm';
import SettingAccount from '../../Screen/Setting/SettingAccount';
import Message from '../../Screen/Reader/Message/Message.js';
import ReaderAuthorProfile from '../../Screen/Reader/Profile/ReaderAuthorProfile';
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
import MessageWrite from '../../Screen/Reader/Message/MessageWrite';
import MessageReport from '../../Screen/Reader/Message/MessageReport';
import ReaderRecommendSearch from '../../Screen/Reader/Recommend/ReaderRecommendSearch.js';

const ReaderStack = createNativeStackNavigator();
const ReaderStacks = () => (
  <ReaderStack.Navigator
    sceneContainerStyle={{
      backgroundColor: '#fff',
    }}
    screenOptions={{
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerShown: false,
    }}>
    {/* <Stack.Screen name="Home" component={Home} options={{headerShown: false}} /> */}
    <ReaderStack.Screen
      name="Alarm"
      component={Alarm}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="ReaderMailSearch"
      component={ReaderMailSearch}
      options={{headerShown: false}}
    />
    <ReaderStack.Screen
      name="ReaderReading"
      component={ReaderReading}
      options={{headerShown: false}}
    />
    <ReaderStack.Screen
      name="InstaShare"
      component={InstaShare}
      options={{headerShown: false}}
    />
    <ReaderStack.Screen
      name="ReaderProfileSearch"
      component={ReaderProfileSearch}
      options={{headerShown: false}}
    />
    <ReaderStack.Screen
      name="Setting"
      component={Setting}
      options={{headerShown: false}}
    />
    <ReaderStack.Screen
      name="SettingAlarm"
      component={SettingAlarm}
      options={{headerShown: false}}
    />
    <ReaderStack.Screen
      name="SettingAccount"
      component={SettingAccount}
      options={{headerShown: false}}
    />
    <ReaderStack.Screen
      name="Message"
      component={Message}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="MessageWrite"
      component={MessageWrite}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="ReaderAuthorProfile"
      component={ReaderAuthorProfile}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="ReaderAnalyze"
      component={ReaderAnalyze}
      options={{headerTitle: '', presentation: 'fullScreenModal'}}
    />
    <ReaderStack.Screen
      name="ReaderAnalyzeOne"
      component={ReaderAnalyzeOne}
      options={{headerTitle: '', animation: 'fade'}}
    />
    <ReaderStack.Screen
      name="ReaderAnalyzeTwo"
      component={ReaderAnalyzeTwo}
      options={{headerTitle: '', animation: 'fade'}}
    />
    <ReaderStack.Screen
      name="ReaderAnalyzeThree"
      component={ReaderAnalyzeThree}
      options={{headerTitle: '', animation: 'fade'}}
    />
    <ReaderStack.Screen
      name="ReaderAnalyzeFour"
      component={ReaderAnalyzeFour}
      options={{headerTitle: '', animation: 'fade'}}
    />
    <ReaderStack.Screen
      name="ReaderAnalyzeFive"
      component={ReaderAnalyzeFive}
      options={{headerTitle: '', animation: 'fade'}}
    />
    <ReaderStack.Screen
      name="ReaderAnalyzeSix"
      component={ReaderAnalyzeSix}
      options={{headerTitle: '', animation: 'fade'}}
    />
    <ReaderStack.Screen
      name="ReaderAnalyzeSeven"
      component={ReaderAnalyzeSeven}
      options={{headerTitle: '', animation: 'fade'}}
    />
    <ReaderStack.Screen
      name="ReaderAnalyzeEight"
      component={ReaderAnalyzeEight}
      options={{headerTitle: '', animation: 'fade'}}
    />
    <ReaderStack.Screen
      name="ReaderAnalyzeNine"
      component={ReaderAnalyzeNine}
      options={{headerTitle: '', animation: 'fade'}}
    />
    <ReaderStack.Screen
      name="ReaderAnalyzeResult"
      component={ReaderAnalyzeResult}
      options={{headerTitle: '', animation: 'fade'}}
    />
    <ReaderStack.Screen
      name="MessageReport"
      component={MessageReport}
      options={{headerTitle: ''}}
    />
    <ReaderStack.Screen
      name="ReaderRecommendSearch"
      component={ReaderRecommendSearch}
      options={{headerTitle: ''}}
    />
  </ReaderStack.Navigator>
);

export default ReaderStacks;
