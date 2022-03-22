import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image';

import ExitWriting from '../assets/images/ExitWriting.png';
import LogoInstaShare from '../assets/images/LogoInstaShare.png';
import LogoBlackInstaShare from '../assets/images/LogoBlackInstaShare.png';
import ColorSelectInstaShare from '../assets/images/ColorSelectInstaShare.png';

const InstaShare = ({navigation: {setOptions}, route: {params}}) => {
  console.log(params);
  const navigation = useNavigation();
  const viewRef = useRef();
  const [colorSelect, setColorSelect] = useState('#FFFFFF');
  const [fontSelect, setFontSelect] = useState('NanumGothic');
  const [ratioSelect, setRatioSelect] = useState(true);
  const [sizeSelect, setSizeSelect] = useState(14);
  const [textColorSelect, setTextColorSelect] = useState('#121212');
  const shareDummyImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.7,
      });
      await Share.open({
        url: uri,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onPressBack = () => {
    navigation.goBack();
  };
  console.log(params);

  const shareDummyImage2 = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.7,
      });
      await Share.shareSingle({
        stickerImage: uri,
        // method: Share.InstagramStories.SHARE_STICKER_IMAGE,
        social: Share.Social.INSTAGRAM_STORIES,
        backgroundBottomColor: '#000',
        backgroundTopColor: '#000',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="dark-content" />

      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View>
            <FastImage
              style={{width: 14.5, height: 14.5}}
              source={ExitWriting}></FastImage>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>공유 텍스트 꾸미기 </Text>
        <TouchableOpacity onPress={shareDummyImage2}>
          <Text
            style={{
              fontFamily: 'NotoSansKR-Bold',
              fontSize: 16,
              color: '#4562F1',
              includeFontPadding: false,
            }}>
            공유
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageView}>
        <View
          ref={viewRef}
          style={{
            width: ratioSelect ? 350 : 262.5,
            height: 350,
            backgroundColor: colorSelect,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 90,
          }}>
          <Text
            style={{
              color: textColorSelect,
              fontFamily: fontSelect,
              fontSize:
                fontSelect === 'Nanum Brush Script' ||
                fontSelect === 'Nanum Pen'
                  ? sizeSelect + 4
                  : sizeSelect,
              lineHeight: 32,
              includeFontPadding: false,
            }}>
            {params.text}
          </Text>
          <Text style={{...styles.titleText, color: textColorSelect}}>
            {params.title}
          </Text>
          <Text style={{...styles.authorText, color: textColorSelect}}>
            {params.author}
          </Text>
          <FastImage
            style={{
              width: 74,
              height: 14,
              position: 'absolute',
              bottom: 16,
              right: 16,
            }}
            source={
              textColorSelect === '#FFFFFF'
                ? LogoInstaShare
                : LogoBlackInstaShare
            }></FastImage>
        </View>
      </View>
      <ScrollView>
        <View style={styles.ratioView}>
          <TouchableOpacity onPress={() => setRatioSelect(true)}>
            <View
              style={{
                ...styles.ratioItemViewOne,
                borderColor: ratioSelect ? '#4562F1' : '#BEBEBE',
              }}>
              <Text
                style={{
                  ...styles.ratioItemText,
                  color: ratioSelect ? '#4562F1' : '#BEBEBE',
                }}>
                1 : 1
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRatioSelect(false)}>
            <View
              style={{
                ...styles.ratioItemViewTwo,
                borderColor: ratioSelect ? '#BEBEBE' : '#4562F1',
              }}>
              <Text
                style={{
                  ...styles.ratioItemText,
                  color: ratioSelect ? '#BEBEBE' : '#4562F1',
                }}>
                3 : 4
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.colorView}>
          <View style={{flexDirection: 'row', marginTop: 9}}>
            <TouchableOpacity onPress={() => setColorSelect('#FFFFFF')}>
              <View
                style={{
                  ...styles.colorItemView,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#DBDBDB',
                  borderWidth: 1,
                }}>
                {colorSelect === '#FFFFFF' ? (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 90,
                      shadowColor: '#000000',
                      shadowOpacity: 0.1,
                      shadowRadius: 9,
                    }}>
                    <FastImage
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={ColorSelectInstaShare}></FastImage>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColorSelect('#000000')}>
              <View
                style={{
                  ...styles.colorItemView,
                  backgroundColor: '#000000',
                }}>
                {colorSelect === '#000000' ? (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 90,
                      shadowColor: '#000000',
                      shadowOpacity: 0.1,
                      shadowRadius: 9,
                    }}>
                    <FastImage
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={ColorSelectInstaShare}></FastImage>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColorSelect('#4562F1')}>
              <View
                style={{
                  ...styles.colorItemView,
                  backgroundColor: '#4562F1',
                }}>
                {colorSelect === '#4562F1' ? (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 90,
                      shadowColor: '#000000',
                      shadowOpacity: 0.1,
                      shadowRadius: 9,
                    }}>
                    <FastImage
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={ColorSelectInstaShare}></FastImage>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColorSelect('#FF9B9B')}>
              <View
                style={{
                  ...styles.colorItemView,
                  backgroundColor: '#FF9B9B',
                }}>
                {colorSelect === '#FF9B9B' ? (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 90,
                      shadowColor: '#000000',
                      shadowOpacity: 0.1,
                      shadowRadius: 9,
                    }}>
                    <FastImage
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={ColorSelectInstaShare}></FastImage>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColorSelect('#FFF4B6')}>
              <View
                style={{
                  ...styles.colorItemView,
                  backgroundColor: '#FFF4B6',
                }}>
                {colorSelect === '#FFF4B6' ? (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 90,
                      shadowColor: '#000000',
                      shadowOpacity: 0.1,
                      shadowRadius: 9,
                    }}>
                    <FastImage
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={ColorSelectInstaShare}></FastImage>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.fontView} horizontal>
          <TouchableOpacity onPress={() => setFontSelect('NanumGothic')}>
            <View
              style={{
                ...styles.fontItemView,
                borderColor:
                  fontSelect === 'NanumGothic' ? '#4562F1' : '#BEBEBE',
              }}>
              <Text
                style={{
                  ...styles.fontItemText,
                  fontFamily: 'NanumGothic',
                  color: fontSelect === 'NanumGothic' ? '#4562F1' : '#BEBEBE',
                }}>
                나눔고딕
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontSelect('NanumMyeongjo')}>
            <View
              style={{
                ...styles.fontItemView,
                borderColor:
                  fontSelect === 'NanumMyeongjo' ? '#4562F1' : '#BEBEBE',
              }}>
              <Text
                style={{
                  ...styles.fontItemText,
                  fontFamily: 'NanumMyeongjo',
                  color: fontSelect === 'NanumMyeongjo' ? '#4562F1' : '#BEBEBE',
                }}>
                나눔명조
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontSelect('Nanum Brush Script')}>
            <View
              style={{
                ...styles.fontItemView,
                borderColor:
                  fontSelect === 'Nanum Brush Script' ? '#4562F1' : '#BEBEBE',
              }}>
              <Text
                style={{
                  ...styles.fontItemText,
                  fontSize: 18,
                  fontFamily: 'Nanum Brush Script',
                  color:
                    fontSelect === 'Nanum Brush Script' ? '#4562F1' : '#BEBEBE',
                }}>
                나눔손글씨
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontSelect('Nanum Pen')}>
            <View
              style={{
                ...styles.fontItemView,
                borderColor: fontSelect === 'Nanum Pen' ? '#4562F1' : '#BEBEBE',
              }}>
              <Text
                style={{
                  ...styles.fontItemText,
                  fontSize: 18,
                  fontFamily: 'Nanum Pen',
                  color: fontSelect === 'Nanum Pen' ? '#4562F1' : '#BEBEBE',
                }}>
                나눔바른펜
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.sizeView}>
          <TouchableOpacity
            style={styles.sizeItemView}
            onPress={() => setSizeSelect(14)}>
            <Text
              style={{
                ...styles.sizeItemText,
                fontSize: 14,
                color: sizeSelect === 14 ? '#4562F1' : '#BEBEBE',
              }}>
              14pt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sizeItemView}
            onPress={() => setSizeSelect(16)}>
            <Text
              style={{
                ...styles.sizeItemText,
                fontSize: 16,
                color: sizeSelect === 16 ? '#4562F1' : '#BEBEBE',
              }}>
              16pt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sizeItemView}
            onPress={() => setSizeSelect(18)}>
            <Text
              style={{
                ...styles.sizeItemText,
                fontSize: 18,
                color: sizeSelect === 18 ? '#4562F1' : '#BEBEBE',
              }}>
              18pt
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textColorView}>
          <TouchableOpacity onPress={() => setTextColorSelect('#FFFFFF')}>
            <View style={styles.TextColorItemView}>
              <Text style={{...styles.textColorItemText, color: '#FFFFFF'}}>
                T
              </Text>
            </View>
            {textColorSelect === '#FFFFFF' ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 90,
                  shadowColor: '#000000',
                  shadowOpacity: 0.1,
                  shadowRadius: 9,
                  position: 'absolute',
                  right: 0,
                }}>
                <FastImage
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  source={ColorSelectInstaShare}></FastImage>
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTextColorSelect('#121212')}>
            <View style={styles.TextColorItemView}>
              <Text style={{...styles.textColorItemText, color: '#121212'}}>
                T
              </Text>
            </View>
            {textColorSelect === '#121212' ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 90,
                  shadowColor: '#000000',
                  shadowOpacity: 0.1,
                  shadowRadius: 9,
                  position: 'absolute',
                  right: 0,
                }}>
                <FastImage
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  source={ColorSelectInstaShare}></FastImage>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    paddingHorizontal: 22.5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  imageView: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  },
  titleText: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    includeFontPadding: false,
  },
  authorText: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    includeFontPadding: false,
  },
  ratioView: {
    width: '100%',
    height: 70,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ratioItemViewOne: {
    width: 32,
    height: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
  },
  ratioItemText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    includeFontPadding: false,
  },
  ratioItemViewTwo: {
    width: 32,
    height: 42,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
  },
  colorView: {
    width: '100%',
    paddingVertical: 14,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorItemView: {
    width: 62,
    height: 62,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontView: {
    paddingVertical: 14,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontItemView: {
    paddingHorizontal: 14,
    height: 30,
    justifyContent: 'center',
    borderRadius: 26,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  fontItemText: {
    fontSize: 14,
    includeFontPadding: false,
  },
  sizeView: {
    width: '100%',
    paddingVertical: 14,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeItemView: {
    marginHorizontal: 6.5,
  },
  sizeItemText: {
    fontFamily: 'NotoSansKR-Regular',
    includeFontPadding: false,
  },
  textColorView: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextColorItemView: {
    backgroundColor: '#EBEBEB',
    width: 47,
    height: 47,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10.5,
    marginBottom: 20,
  },
  textColorItemText: {
    fontFamily: 'NanumMyeongjo',
    fontSize: 25,
  },
});

export default InstaShare;
