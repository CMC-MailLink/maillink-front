import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

import BackMail2 from '../../assets/images/BackMail2.png';
import OnBoarding1 from '../../assets/images/OnBoarding1.png';
import OnBoarding2 from '../../assets/images/OnBoarding2.png';
import OnBoarding3 from '../../assets/images/OnBoarding3.png';

const OnBoarding = props => {
  const navigation = useNavigation();
  const [swiperIndex, setSwiperIndex] = useState(0);
  // const onPressBack = () => {
  //   navigation.goBack();
  // };
  const onPressSkip = () => {
    navigation.navigate('OnBoardingStacks', {
      screen: 'SelectUserType',
    });
  };
  const onPressNext = () => {
    if (swiperIndex !== 2) {
      setSwiperIndex(swiperIndex + 1);
    } else {
      navigation.navigate('OnBoardingStacks', {
        screen: 'SelectUserType',
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        {/* <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback> */}
      </View>

      <Swiper
        index={swiperIndex}
        onIndexChanged={index => setSwiperIndex(index)}
        style={styles.swiperWrapper}
        scrollEnabled={false}
        loop={false}
        dot={<View style={styles.swiperDot} />}
        activeDot={<View style={styles.swiperActiveDot} />}
        showsButtons={false}>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: -45,
            }}>
            <FastImage
              style={{
                width: ((Dimensions.get('window').height / 1.7) * 418) / 509,
                height: Dimensions.get('window').height / 1.7,
              }}
              source={OnBoarding1}
            />
            <Text style={styles.bodyTitleText}>당신이 찾던 그 작가</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingTop: 33 + 22,
                alignItems: 'center',
              }}>
              <Text style={styles.bodyDescText}>
                취향분석테스트와 필터링으로
              </Text>
              <Text style={styles.bodyDescText}>
                나에게 꼭 맞는 작가를 만나보세요
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: -45,
            }}>
            <FastImage
              style={{
                width: ((Dimensions.get('window').height / 1.7) * 418) / 509,
                height: Dimensions.get('window').height / 1.7,
              }}
              source={OnBoarding2}
            />
            <Text style={styles.bodyTitleText}>속닥속닥 연결되는 우리</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                paddingTop: 33 + 22,
                alignItems: 'center',
              }}>
              <Text style={styles.bodyDescText}>
                구독한 작가와 쪽지를 주고받아보세요
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: -45,
            }}>
            <FastImage
              style={{
                width: ((Dimensions.get('window').height / 1.7) * 418) / 509,
                height: Dimensions.get('window').height / 1.7,
              }}
              source={OnBoarding3}
            />
            <Text style={styles.bodyTitleText}>타닥타닥 써내려가는 메일</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{paddingTop: 33 + 22, alignItems: 'center'}}>
              <Text style={styles.bodyDescText}>작가는 웹사이트를 통해</Text>
              <Text style={styles.bodyDescText}>
                PC에서도 글을 작성할 수 있어요
              </Text>
            </View>
          </View>
        </View>
      </Swiper>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          marginBottom: 0,
          ...Platform.select({
            android: {marginBottom: -100 + 58},
          }),
        }}>
        <View style={styles.bottomView}>
          <TouchableWithoutFeedback onPress={onPressSkip}>
            <Text style={styles.skipText}>건너뛰기</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPressNext}>
            <Text style={styles.nextText}>다음</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  swiperWrapper: {
    marginBottom: 215,
    ...Platform.select({
      android: {height: '100%'},
    }),
  },
  swiperDot: {
    backgroundColor: '#BEBEBE',
    width: 3,
    height: 3,
    borderRadius: 2.5,
    marginLeft: 3.5,
    marginRight: 3.5,
    marginBottom: 60,
    ...Platform.select({
      android: {marginBottom: -47 + 65},
    }),
  },
  swiperActiveDot: {
    backgroundColor: '#4562F1',
    width: 11,
    height: 3,
    borderRadius: 2.5,
    marginLeft: 3.5,
    marginRight: 3.5,
    marginBottom: 60,
    ...Platform.select({
      android: {marginBottom: -47 + 65},
    }),
  },
  bodyTitleText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 27,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  bodyDescText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  bottomView: {
    position: 'static',
    bottom: 75,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#828282',
    width: 72,
    includeFontPadding: false,
  },
  nextText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#4562F1',
    width: 72,
    textAlign: 'right',
    includeFontPadding: false,
  },
});
export default OnBoarding;
