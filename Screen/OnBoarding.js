import React, {useState} from 'react';
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
import Swiper from 'react-native-swiper';

import BackMail2 from '../assets/images/BackMail2.png';

const OnBoarding = () => {
  const navigation = useNavigation();
  const [swiperIndex, setSwiperIndex] = useState(0);
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressSkip = () => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAnalyze',
    });
  };
  const onPressNext = () => {
    if (swiperIndex !== 2) {
      setSwiperIndex(swiperIndex + 1);
    } else {
      navigation.navigate('SignUpStacks', {
        screen: 'SelectUserType',
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback>
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
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text style={styles.bodyTitleText}>나에게 꼭 맞는</Text>
            <Text style={styles.bodyTitleText}>작가 소개받기</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.bodyDescText}>
              취향분석테스트와 간편한 작가찾기로
            </Text>
            <Text style={styles.bodyDescText}>
              나에게 맞는 작가를 구독하세요
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text style={styles.bodyTitleText}>속닥속닥 연결되는 우리</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.bodyDescText}>
              구독한 작가와 쪽지를 주고받아보세요
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text style={styles.bodyTitleText}>어디서나 글을 쓰고</Text>
            <Text style={styles.bodyTitleText}>발행하기</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.bodyDescText}>작가는 모바일과 웹 모두에서</Text>
            <Text style={styles.bodyDescText}>
              글을 작성하고 편집할 수 있어요
            </Text>
          </View>
        </View>
      </Swiper>
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
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
  },
  swiperDot: {
    backgroundColor: '#BEBEBE',
    width: 3,
    height: 3,
    borderRadius: 2.5,
    marginLeft: 3.5,
    marginRight: 3.5,
    marginBottom: 100,
  },
  swiperActiveDot: {
    backgroundColor: '#4562F1',
    width: 11,
    height: 3,
    borderRadius: 2.5,
    marginLeft: 3.5,
    marginRight: 3.5,
    marginBottom: 100,
  },
  bodyView: {
    width: '100%',
    backgroundColor: 'yellow',
    alignItems: 'center',
  },
  bodyTitleText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 27,
    color: '#3C3C3C',
  },
  bodyDescText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
  },
  bottomView: {
    position: 'absolute',
    bottom: 117,
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
  },
  nextText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#4562F1',
    width: 72,
    textAlign: 'right',
  },
});
export default OnBoarding;
