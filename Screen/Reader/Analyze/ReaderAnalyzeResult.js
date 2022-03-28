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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppContext from '../../../AppContext';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ReaderAPI} from '../../../API/ReaderAPI';
import {useQuery, useQueryClient} from 'react-query';

import BackMail from '../../../assets/images/BackMail.png';
import ExitResult from '../../../assets/images/ExitResult.png';
import AuthorRecommend from '../../../assets/images/AuthorRecommend.png';
import GoRecommend from '../../../assets/images/GoRecommend.png';
import AgainRecommend from '../../../assets/images/AgainRecommend.png';

const colorCategory = {
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
    ['AnalyzeResult', colorCategory[params].name],
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

  const onPressAuthor = () => {
    if (myContext.isReader === 'READER') {
      navigation.navigate('ReaderStacks', {
        screen: 'ReaderAuthorProfile',
      });
    } else {
      // myContext.setIsReader('READER');
      navigation.navigate('OnBoardingStacks', {
        screen: 'ReaderAuthorProfile',
      });
    }
  };

  const RenderItem = ({item}) => {
    console.log(item);
    return (
      <View></View>
      // <TouchableWithoutFeedback onPress={onPressAuthor}>
      //   <View
      //     style={{
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //       top: -25 - 88,
      //     }}>
      //     <View style={styles.itemView}>
      //       <FastImage
      //         style={{
      //           width: 8,
      //           height: 15,
      //           position: 'absolute',
      //           right: 20,
      //           top: 18,
      //         }}
      //         source={GoRecommend}></FastImage>
      //       <FastImage
      //         style={{width: 77.56, height: 77.56}}
      //         source={AuthorRecommend}></FastImage>
      //       <Text style={styles.itemName}>{item.writerInfo.nickName}</Text>
      //       <Text style={styles.itemAuthor}>작가님</Text>
      //       <Text style={styles.itemIntro}>{item.writerInfp.introduction}</Text>
      //       <View style={{flexDirection: 'row', marginTop: 10}}>
      //         <View style={{...styles.itemCategoryView, marginRight: 10}}>
      //           <Text
      //             style={{
      //               ...styles.itemCategoryText,
      //               color: '#0021C6',
      //             }}>
      //             {colorCategory[item.writerInfo.genre1].name}
      //           </Text>
      //         </View>
      //         <View
      //           style={{
      //             ...styles.itemCategoryView,
      //             backgroundColor: colorCategory[item.writerInfo.mood1].back,
      //           }}>
      //           <Text
      //             style={{
      //               ...styles.itemCategoryText,
      //               color: colorCategory[item.writerInfo.mood1].font,
      //             }}>
      //             {colorCategory[item.writerInfo.mood1].name}
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
      //   </View>
      // </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1, backgroundColor: '#4562F1'}}>
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
            <View style={styles.itemCategoryView}>
              <Text
                style={{
                  ...styles.itemCategoryText,
                  color: '#0021C6',
                }}>
                서정
              </Text>
            </View>
            <Text style={styles.titleFeelText}>느낌의</Text>
          </View>
          <Text style={styles.titleText}>
            당신과 잘 맞을 것 같은{'\n'}작가님이에요
          </Text>
        </View>
      </View>

      <View style={{flex: 1, backgroundColor: '#FFF', top: 10 - insets.bottom}}>
        <RenderItem
          item={analyzeResultData ? [analyzeResultData] : []}></RenderItem>
        <View style={{top: -25 - 88 + 26, alignItems: 'center'}}>
          {subscribe ? (
            <TouchableOpacity onPress={() => setSubscribe(false)}>
              <View style={styles.subscribeView}>
                <Text style={styles.subscribeText}>구독중</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setSubscribe(true)}>
              <View style={styles.notSubscribeView}>
                <Text style={styles.notSubscribeText}>구독하기</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 40,
            right: 23,
          }}
          onPress={() => navigation.popToTop()}>
          <View style={styles.againView}>
            <FastImage
              style={{width: 18, height: 14, marginRight: 7}}
              source={AgainRecommend}></FastImage>
            <Text style={styles.againText}>다시하기</Text>
          </View>
        </TouchableOpacity>
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
    fontSize: 11,
    color: '#828282',
    includeFontPadding: false,
  },
  itemCategoryView: {
    paddingHorizontal: 14.6,
    height: 24,
    borderRadius: 26,
    backgroundColor: '#E8EBFF',
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
    fontSize: 27,
    color: '#FFF',
    includeFontPadding: false,
    lineHeight: 40,
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
