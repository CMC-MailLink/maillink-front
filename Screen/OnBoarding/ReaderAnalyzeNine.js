import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import BackMail from '../../assets/images/BackMail.png';
import AnalyzeSix from '../../assets/images/AnalyzeSix.png';
import AnalyzeNine_1 from '../../assets/images/AnalyzeNine_1.png';
import AnalyzeNine_2 from '../../assets/images/AnalyzeNine_2.png';

const ReaderAnalyzeNine = () => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#00092B'}}> */}
      <StatusBar barStyle="light-content" />
      <FastImage
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={AnalyzeSix}></FastImage>
      {Platform.OS === 'ios' ? (
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View
            style={{
              marginLeft: 24,
              marginTop: Platform.OS === 'ios' ? 70 : 70 - 48,
            }}>
            <Image style={{width: 9.5, height: 19}} source={BackMail}></Image>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      <View style={styles.progressContainer}>
        <View style={styles.progressView}>
          <View style={styles.progressBar}></View>
        </View>
      </View>
      <View style={styles.quizView}>
        <Text style={styles.numText}>Q5</Text>
        <Text style={styles.quizText}>
          다음 중 더 마음이 가는{'\n'}시의 구절은?
        </Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('OnBoardingStacks', {
            screen: 'ReaderAnalyzeResult',
            params: '달콤',
          })
        }>
        <FastImage
          style={{
            width: 222.87,
            height: 354.47,
            position: 'absolute',
            right: 0,
            top: 290,
          }}
          source={AnalyzeNine_1}></FastImage>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('OnBoardingStacks', {
            screen: 'ReaderAnalyzeResult',
            params: '키치',
          })
        }>
        <FastImage
          style={{
            width: 363.93,
            height: 293.8,
            position: 'absolute',
            left: 26,
            bottom: 20,
          }}
          source={AnalyzeNine_2}></FastImage>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressContainer: {
    marginVertical: 22,
    width: '100%',
    paddingHorizontal: 20,
  },
  progressView: {
    width: '100%',
    height: 8,
    borderRadius: 5.5,
    backgroundColor: '#fff',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
  },
  progressBar: {
    width: '100%',
    height: 7,
    borderRadius: 5.5,
    backgroundColor: '#4562F1',
  },
  quizView: {
    alignItems: 'center',
  },
  numText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    color: '#fff',
    includeFontPadding: false,
    marginBottom: 17,
  },
  quizText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default ReaderAnalyzeNine;