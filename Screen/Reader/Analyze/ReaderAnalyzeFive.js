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

import BackMail from '../../../assets/images/BackMail.png';
import AnalyzeFive from '../../../assets/images/AnalyzeFive.png';

const ReaderAnalyzeFive = () => {
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
        source={AnalyzeFive}></FastImage>
      <TouchableWithoutFeedback onPress={onPressBack}>
        <View
          style={{
            marginLeft: 24,
            marginTop: Platform.OS === 'ios' ? 70 : 70 - 48,
          }}>
          <Image style={{width: 9.5, height: 19}} source={BackMail}></Image>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.progressContainer}>
        <View style={styles.progressView}>
          <View style={styles.progressBar}></View>
        </View>
      </View>
      <View style={styles.quizView}>
        <Text style={styles.numText}>Q4</Text>
        <Text style={styles.quizText}>
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>고된 일정</Text>이
          끝나고{' \n'}
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>혼자서 바</Text>에
          들어간 당신,{'\n'}
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>
            오늘 고른 칵테일
          </Text>
          은?
        </Text>
      </View>
      <View style={{width: '100%', position: 'absolute', bottom: 0}}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('ReaderStacks', {
              screen: 'ReaderAnalyzeEight',
            })
          }>
          <View
            style={{
              ...styles.bottomViewOne,
              borderBottomColor: '#FFFFFF',
              borderBottomWidth: 1,
            }}>
            <Text style={styles.bottomText}>
              허밍웨이가 즐겨 마셨다던&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>상큼한 모히또</Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('ReaderStacks', {
              screen: 'ReaderAnalyzeNine',
            })
          }>
          <View
            style={{
              ...styles.bottomViewTwo,
              paddingBottom: Platform.OS === 'ios' ? 17 : 0,
            }}>
            <Text style={styles.bottomText}>
              위대한 개츠비가 차가운 얼음을 넣어{'\n'}마시던&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>진 리키</Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* </SafeAreaView> */}
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
  bottomViewOne: {
    width: '100%',
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomViewTwo: {
    width: '100%',
    height: 106,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
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
  },
  progressBar: {
    width: '80%',
    height: 8,
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
    fontFamily: 'NotoSansKR-Light',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default ReaderAnalyzeFive;
