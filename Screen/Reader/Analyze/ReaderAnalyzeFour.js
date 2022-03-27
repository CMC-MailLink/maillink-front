import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import BackMail from '../../../assets/images/BackMail.png';
import AnalyzeFour from '../../../assets/images/AnalyzeFour.png';

const ReaderAnalyzeFour = () => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <FastImage
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={AnalyzeFour}></FastImage>
      {Platform.OS === 'ios' ? (
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View
            style={{
              marginLeft: 24,
              marginTop: Platform.OS === 'ios' ? 70 : 70 - 48,
            }}>
            <FastImage
              style={{width: 9.5, height: 19}}
              source={BackMail}></FastImage>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      <View style={styles.progressContainer}>
        <View style={styles.progressView}>
          <View style={styles.progressBar}></View>
        </View>
      </View>
      <View style={styles.quizView}>
        <Text style={styles.numText}>Q4</Text>
        <Text style={styles.quizText}>
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>예약한 숙소</Text>에
          도착해&nbsp;
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>창 밖</Text>을{' \n'}
          내다보니&nbsp;
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>하얀 눈</Text>이 펑펑
          내린다.
          {'\n'}
          <Text style={{fontFamily: 'NotoSansKR-Medium'}}>당신이 할 일</Text>
          은?
        </Text>
      </View>
      <View style={{width: '100%', position: 'absolute', bottom: 0}}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('ReaderStacks', {
              screen: 'ReaderAnalyzeSeven',
            })
          }>
          <View
            style={{
              ...styles.bottomViewOne,
              borderBottomColor: '#FFFFFF',
              borderBottomWidth: 1,
            }}>
            <Text style={styles.bottomText}>
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>따뜻한 핫초코</Text>
              를 타 마시며 창 밖을 바라본다.
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('ReaderStacks', {
              screen: 'ReaderAnalyzeSix',
            })
          }>
          <View
            style={{
              ...styles.bottomViewTwo,
              paddingBottom: Platform.OS === 'ios' ? 17 : 0,
            }}>
            <Text style={styles.bottomText}>
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>털장갑</Text>을 찾아
              끼고 밖으로 나가{'\n'}
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>눈사람</Text>을
              만든다.
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

export default ReaderAnalyzeFour;
