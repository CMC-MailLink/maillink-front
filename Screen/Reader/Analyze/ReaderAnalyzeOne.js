import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import BackMail2 from '../../../assets/images/BackMail2.png';
import AnalyzeOne from '../../../assets/images/AnalyzeOne.png';

const ReaderAnalyzeOne = () => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <FastImage
        style={{position: 'absolute', width: '100%', height: '100%'}}
        source={AnalyzeOne}></FastImage>
      {Platform.OS === 'ios' ? (
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View
            style={{
              marginLeft: 24,
              marginTop: Platform.OS === 'ios' ? 70 : 70 - 48,
            }}>
            <Image style={{width: 9.5, height: 19}} source={BackMail2}></Image>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      <View style={styles.progressContainer}>
        <View style={styles.progressView}>
          <View style={styles.progressBar}></View>
        </View>
      </View>
      <View style={styles.quizView}>
        <Text style={styles.numText}>Q1</Text>
        <Text style={styles.quizText}>
          긴&nbsp;
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>기차여행</Text>을
          준비하는 당신,{'\n'}열차에서&nbsp;
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>
            읽기 위해 챙겨든 책
          </Text>
          은?
        </Text>
      </View>
      <View style={{width: '100%', position: 'absolute', bottom: 0}}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('ReaderStacks', {
              screen: 'ReaderAnalyzeTwo',
            })
          }>
          <View
            style={{
              ...styles.bottomViewOne,
              borderBottomColor: '#FFFFFF',
              borderBottomWidth: 1,
            }}>
            <Text style={styles.bottomText}>
              통통 튀는 이야기가 가득한&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>생활 에세이집</Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('ReaderStacks', {
              screen: 'ReaderAnalyzeTwo',
            })
          }>
          <View
            style={{
              ...styles.bottomViewTwo,
              paddingBottom: Platform.OS === 'ios' ? 17 : 0,
            }}>
            <Text style={styles.bottomText}>
              한번 펼치면 쉽게 헤어나올 수 없는&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>장편소설</Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
    backgroundColor: '#4562F1',
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomViewTwo: {
    width: '100%',
    backgroundColor: '#4562F1',
    height: Platform.OS === 'ios' ? 106 : 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#FFF',
    includeFontPadding: false,
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
    width: '20%',
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
    color: '#3C3C3C',
    includeFontPadding: false,
    marginBottom: 17,
  },
  quizText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 18,
    color: '#3C3C3C',
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default ReaderAnalyzeOne;
