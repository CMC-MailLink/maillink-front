import React, {useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import AppContext from '../../AppContext';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import AnalyzeStart from '../../assets/images/AnalyzeStart.png';

const ReaderAnalyze = () => {
  const insets = useSafeAreaInsets();
  const myContext = useContext(AppContext);
  const navigation = useNavigation();

  const onPressSkip = () => {
    myContext.setIsReader('READER');
  };
  const onPressStart = () => {
    navigation.navigate('OnBoardingStacks', {
      screen: 'ReaderAnalyzeOne',
    });
  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <Text style={styles.headerIntroText}>
          나에게 꼭 맞는 작가를 추천받아보세요.
        </Text>
        <Text style={styles.headerText}>
          <Text style={{fontFamily: 'NotoSansKR-Bold'}}>취향분석 테스트</Text>를
        </Text>
        <Text style={styles.headerText}>진행해보세요!</Text>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <FastImage style={{width: 390, height: 367}} source={AnalyzeStart} />
      </View>
      <View style={{...styles.bottomView, bottom: insets.bottom + 15}}>
        <TouchableOpacity onPress={onPressStart}>
          <View style={styles.startView}>
            <Text style={styles.startText}>시작</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSkip}>
          <Text style={styles.nextText}>다음에 할게요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    paddingLeft: 20,
    marginTop: 124 - 48,
  },
  headerIntroText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    marginBottom: 5,
    includeFontPadding: false,
  },
  headerText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 27,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  bottomView: {
    width: '100%',
    position: 'absolute',
  },
  startView: {
    marginHorizontal: 20,
    backgroundColor: '#4562F1',
    borderRadius: 26,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  startText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFF',
    includeFontPadding: false,
  },
  nextText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    textAlign: 'center',
    textDecorationLine: 'underline',
    includeFontPadding: false,
  },
});
export default ReaderAnalyze;
