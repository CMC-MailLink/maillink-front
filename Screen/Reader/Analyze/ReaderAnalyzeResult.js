import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppContext from '../../../AppContext';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ReaderAPI} from '../../../API/ReaderAPI';
import {useQuery, useQueryClient} from 'react-query';

import BackMail from '../../../assets/images/BackMail.png';
import ExitResult from '../../../assets/images/ExitResult.png';
import AgainRecommend from '../../../assets/images/AgainRecommend.png';
import GoRecommend from '../../../assets/images/GoRecommend.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import AnalyzeResult from '../../../assets/images/AnalyzeResult.png';

const colorCategory1 = {
  Comfortable: {
    name: '편안',
    back: '#E2FAE2',
    font: '#00402D',
    num: '#7FCE7F',
  },
  Clear: {name: '맑은', back: '#DDF9FF', font: '#002C36', num: '#6BD0E6'},
  Lyrical: {name: '서정', back: '#E6DDFF', font: '#1E0072', num: '#AE92FF'},
  Calm: {name: '잔잔', back: '#C5F0E3', font: '#00573D', num: '#5ECEAC'},
  Light: {name: '명랑', back: '#FFF2AD', font: '#5D4300', num: '#FFC839'},
  Cheerful: {name: '유쾌', back: '#FFDDDD', font: '#370000', num: '#FF8E8E'},
  Sweet: {name: '달달', back: '#FFE8FB', font: '#3E0035', num: '#FFACDE'},
  Kitsch: {name: '키치', back: '#FFE6B7', font: '#432C00', num: '#FFAD62'},
  Poetry: {name: '시', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
  Novels: {name: '소설', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
  Essays: {name: '에세이', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
};

const colorCategory2 = {
  편안: {
    name: 'Comfortable',
    back: '#E2FAE2',
    font: '#00402D',
    num: '#7FCE7F',
  },
  맑은: {name: 'Clear', back: '#DDF9FF', font: '#002C36', num: '#6BD0E6'},
  서정: {name: 'Lyrical', back: '#E6DDFF', font: '#1E0072', num: '#AE92FF'},
  잔잔: {name: 'Calm', back: '#C5F0E3', font: '#00573D', num: '#5ECEAC'},
  명랑: {name: 'Light', back: '#FFF2AD', font: '#5D4300', num: '#FFC839'},
  유쾌: {name: 'Cheerful', back: '#FFDDDD', font: '#370000', num: '#FF8E8E'},
  달달: {name: 'Sweet', back: '#FFE8FB', font: '#3E0035', num: '#FFACDE'},
  키치: {name: 'Kitsch', back: '#FFE6B7', font: '#432C00', num: '#FFAD62'},
  시: {name: 'Poetry', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
  소설: {name: 'Novels', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
  에세이: {name: 'Essays', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
};

const ReaderAnalyzeResult = ({navigation: {setOptions}, route: {params}}) => {
  console.log(params);
  const insets = useSafeAreaInsets();
  const myContext = useContext(AppContext);
  const navigation = useNavigation();
  const [subscribe, setSubscribe] = useState(false);
  const {isLoading: analyzeResultLoading, data: analyzeResultData} = useQuery(
    ['AnalyzeResult', colorCategory2[params].name],
    ReaderAPI.getAnalyzeResult,
  );

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressExit = () => {
    myContext.setIsReader('READER');
    navigation.navigate('ReaderTabs', {
      screen: 'ReaderRecommend',
    });
  };

  const onPressAuthor = data => {
    if (myContext.isReader === 'READER') {
      navigation.navigate('ReaderStacks', {
        screen: 'ReaderAuthorProfile',
        params: {id: data[0].id},
      });
    } else {
      navigation.navigate('OnBoardingStacks', {
        screen: 'ReaderAuthorProfile',
        params: {id: data[0].id},
      });
    }
  };

  const RenderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => onPressAuthor(item)}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.itemView}>
            <FastImage
              style={{
                width: 8,
                height: 15,
                position: 'absolute',
                right: 20,
                top: 18,
              }}
              source={GoRecommend}></FastImage>
            <FastImage
              style={{width: 77.56, height: 77.56, borderRadius: 90}}
              source={
                item[0].imgUrl === '' || !item[0].imgUrl
                  ? DefaultProfile
                  : {uri: item[0].imgUrl}
              }></FastImage>
            <Text style={styles.itemName}>{item[0].nickName}</Text>
            <Text style={styles.itemAuthor}>작가님</Text>
            <Text style={styles.itemIntro} numberOfLines={2}>
              {item[0].introduction}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 17}}>
              <View
                style={{
                  ...styles.itemCategoryView,
                  marginRight: 10,
                  backgroundColor: colorCategory1[item[0].primaryGenre].back,
                }}>
                <Text
                  style={{
                    ...styles.itemCategoryText,
                    color: '#0021C6',
                  }}>
                  {colorCategory1[item[0].primaryGenre].name}
                </Text>
              </View>
              <View
                style={{
                  ...styles.itemCategoryView,
                  backgroundColor: colorCategory1[item[0].primaryMood].back,
                }}>
                <Text
                  style={{
                    ...styles.itemCategoryText,
                    color: colorCategory1[item[0].primaryMood].font,
                  }}>
                  {colorCategory1[item[0].primaryMood].name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="light-content" />
      <View
        style={{
          height: 210 + insets.top,
          backgroundColor: '#4562F1',
          width: '100%',
        }}>
        <View style={styles.headerView}>
          {Platform.OS === 'ios' ? (
            <TouchableWithoutFeedback onPress={onPressBack}>
              <View style={{position: 'absolute', left: 24}}>
                <FastImage
                  style={{width: 9.5, height: 19}}
                  source={BackMail}></FastImage>
              </View>
            </TouchableWithoutFeedback>
          ) : null}
          <Text style={styles.headerText}>취향 분석 결과</Text>
          <TouchableWithoutFeedback onPress={onPressExit}>
            <View style={{position: 'absolute', right: 24}}>
              <FastImage
                style={{width: 14.5, height: 14.5}}
                source={ExitResult}></FastImage>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{marginTop: 40, marginLeft: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                ...styles.itemCategoryView,
                backgroundColor: colorCategory2[params].back,
              }}>
              <Text
                style={{
                  ...styles.itemCategoryText,
                  color: colorCategory2[params].font,
                }}>
                {params}
              </Text>
            </View>
            <Text style={styles.titleFeelText}>느낌의</Text>
          </View>
          <Text
            style={{
              ...styles.titleFeelText,
              marginTop: 10,
              fontSize: 22,
              lineHeight: 33,
              fontFamily: 'NotoSansKR-Regular',
            }}>
            당신과{'\n'}
            <Text style={{...styles.titleText}}>
              잘 맞을 것 같은{'\n'}작가님
            </Text>
            이에요
          </Text>
        </View>
        <FastImage
          style={{
            width: 193,
            height: 216,
            position: 'absolute',
            right: 0,
            bottom: -25,
          }}
          source={AnalyzeResult}></FastImage>
      </View>

      <View
        style={{
          width: '100%',
          height:
            Dimensions.get('window').height - 250 - insets.top - insets.bottom,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        {analyzeResultData ? (
          <RenderItem item={[analyzeResultData]}></RenderItem>
        ) : null}
        <View>
          <TouchableOpacity onPress={() => navigation.popToTop()}>
            <View style={styles.againView}>
              <FastImage
                style={{width: 18, height: 14, marginRight: 7}}
                source={AgainRecommend}></FastImage>
              <Text style={styles.againText}>다시하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerView: {
    top: 67 - 48,
    width: '100%',
    backgroundColor: '#4562F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    color: '#fff',
    includeFontPadding: false,
  },
  headerBack: {
    height: 150 - 48,
    width: 20,
  },
  itemView: {
    width: 238,
    height: 288,
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 4,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingTop: 32,
  },
  itemName: {
    marginTop: 13,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  itemAuthor: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  itemIntro: {
    marginTop: 12,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
    includeFontPadding: false,
  },
  itemCategoryView: {
    paddingHorizontal: 14.6,
    height: 24,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCategoryText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    includeFontPadding: false,
  },
  titleFeelText: {
    marginLeft: 10,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 18,
    color: '#fff',
    includeFontPadding: false,
  },
  titleText: {
    marginTop: 7,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 22,
    color: '#FFF',
    includeFontPadding: false,
    // lineHeight: 40,
  },
  subscribeView: {
    width: 95,
    height: 38,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    borderRadius: 1560,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  notSubscribeView: {
    width: 95,
    height: 38,
    borderRadius: 1560,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4562F1',
  },
  notSubscribeText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#FFF',
    includeFontPadding: false,
  },
  againView: {
    width: 117,
    height: 38,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 13,
    elevation: 4,
    borderRadius: 1560,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  againText: {
    fontFamily: 'NotoSansKR-BOLD',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
});

export default ReaderAnalyzeResult;
