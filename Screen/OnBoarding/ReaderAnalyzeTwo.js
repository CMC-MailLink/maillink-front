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

import BackMail2 from '../../assets/images/BackMail2.png';
import AnalyzeTwo from '../../assets/images/AnalyzeTwo.png';

const ReaderAnalyzeTwo = () => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <FastImage
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        source={AnalyzeTwo}></FastImage>
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
        <Text style={styles.numText}>Q2</Text>
        <Text style={styles.quizText}>
          덜컹거리는&nbsp;
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>기차 속</Text>
          {'\n'}잠깐&nbsp;
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>잠</Text>이 든 당신,
          {'\n'}
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}> 눈을 떴을 때</Text>,
          창 밖에 보이는 것은?
        </Text>
      </View>
      <View style={{width: '100%', position: 'absolute', bottom: 0}}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('OnBoardingStacks', {
              screen: 'ReaderAnalyzeThree',
            })
          }>
          <View
            style={{
              ...styles.bottomViewOne,
              borderBottomColor: '#FFFFFF',
              borderBottomWidth: 1,
            }}>
            <Text style={styles.bottomText}>
              신선한 햇빛 속&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>
                새하얀 메밀꽃 밭
              </Text>
              이 {'\n'}끝없이 펼쳐진 풍경
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('OnBoardingStacks', {
              screen: 'ReaderAnalyzeThree',
            })
          }>
          <View
            style={{
              ...styles.bottomViewTwo,
              paddingBottom: Platform.OS === 'ios' ? 17 : 0,
            }}>
            <Text style={styles.bottomText}>
              자욱한&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>
                안개 속 보이는 산줄기
              </Text>
              와{'\n'}그 너머의&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>바다</Text>가
              어울리며 녹아있는 풍경
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
    // backgroundColor: '#00092B',
    height: 92,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomViewTwo: {
    width: '100%',
    // backgroundColor: '#00092B',
    height: Platform.OS === 'ios' ? 106 : 92,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
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
    width: '40%',
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

export default ReaderAnalyzeTwo;
