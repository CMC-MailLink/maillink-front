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
import {useNavigation} from '@react-navigation/native';

import BackMail from '../../../assets/images/BackMail.png';
import AnalyzeThree from '../../../assets/images/AnalyzeThree.png';

const ReaderAnalyzeThree = () => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
        }}
        source={AnalyzeThree}></Image>
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
        <Text style={styles.numText}>Q3</Text>
        <Text style={styles.quizText}>
          당신이 읽고 있는&nbsp;
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>소설</Text>
          속,{' \n'}주인공은&nbsp;
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>비행기</Text>를 타고
          있다.
          {'\n'}
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>
            다음에 일어날 사건
          </Text>
          은?
        </Text>
      </View>
      <View style={{width: '100%', position: 'absolute', bottom: 0}}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('ReaderStacks', {
              screen: 'ReaderAnalyzeFour',
            })
          }>
          <View
            style={{
              ...styles.bottomViewOne,
              borderBottomColor: '#FFFFFF',
              borderBottomWidth: 1,
            }}>
            <Text style={styles.bottomText}>
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>
                옆자리에 앉은 남자
              </Text>
              가 은밀하게 말을 걸어온다.
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('ReaderStacks', {
              screen: 'ReaderAnalyzeFive',
            })
          }>
          <View
            style={{
              ...styles.bottomViewTwo,
              paddingBottom: Platform.OS === 'ios' ? 17 : 0,
            }}>
            <Text style={styles.bottomText}>
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>
                도망치던 테러범들
              </Text>
              이 비행기 안에서{'\n'}소란을 피우기 시작한다.
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
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomViewTwo: {
    width: '100%',
    height: Platform.OS === 'ios' ? 106 : 92,
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
    width: '60%',
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

export default ReaderAnalyzeThree;
