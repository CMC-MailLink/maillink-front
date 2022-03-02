import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BackMail2 from '../../../assets/images/BackMail2.png';
import Progress1Analyze from '../../../assets/images/Progress1Analyze.png';

const ReaderAnalyze = () => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressSkip = () => {
    navigation.navigate('ReaderTabs', {
      screen: 'recommend',
    });
  };

  return (
    <View style={{flex: 1}}>
      <Text>REaderAnalyze</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ReaderAnalyze;
