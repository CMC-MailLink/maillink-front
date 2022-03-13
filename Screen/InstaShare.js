import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';

import ExitWriting from '../assets/images/ExitWriting.png';
import LogoInstaShare from '../assets/images/LogoInstaShare.png';
import ColorSelectInstaShare from '../assets/images/ColorSelectInstaShare.png';

const InstaShare = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const viewRef = useRef();
  const [colorSelect, setColorSelect] = useState('white');
  const [ratioSelect, setRatioSelect] = useState(true);
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
        backgroundBottomColor: '#FF9B9B',
        backgroundTopColor: '#4562F1',
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
          <View style={{position: 'absolute', left: 22.5}}>
            <Image
              style={{width: 14.5, height: 14.5}}
              source={ExitWriting}></Image>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>공유 텍스트 꾸미기 </Text>
      </View>

      <View style={styles.imageView}>
        <View
          ref={viewRef}
          style={{
            width: 350,
            height: 350,
            backgroundColor: colorSelect,
          }}>
          <Text style={{color: '#FFFFFF'}}>{params}</Text>
          <Image
            style={{
              width: 74,
              height: 14,
              position: 'absolute',
              bottom: 16,
              right: 16,
            }}
            source={LogoInstaShare}></Image>
        </View>
      </View>
      <ScrollView>
        <View style={styles.ratioView}>
          <Text style={styles.ratioText}>비율</Text>
          <View style={{flexDirection: 'row', marginTop: 9}}>
            <TouchableOpacity onPress={() => setRatioSelect(true)}>
              <View
                style={{
                  ...styles.ratioItemView,
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
                  ...styles.ratioItemView,
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
        </View>
        <View style={styles.colorView}>
          <Text style={styles.colorText}>배경 색상</Text>
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
                  <Image
                    style={{width: 20, height: 20}}
                    source={ColorSelectInstaShare}></Image>
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
                  <Image
                    style={{width: 20, height: 20}}
                    source={ColorSelectInstaShare}></Image>
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
                  <Image
                    style={{width: 20, height: 20}}
                    source={ColorSelectInstaShare}></Image>
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
                  <Image
                    style={{width: 20, height: 20}}
                    source={ColorSelectInstaShare}></Image>
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
                  <Image
                    style={{width: 20, height: 20}}
                    source={ColorSelectInstaShare}></Image>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={{marginTop: 30}} onPress={shareDummyImage2}>
          <Text style={{fontSize: 20, fontWeight: '700', textAlign: 'center'}}>
            Share2
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
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
  ratioView: {
    width: '100%',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 18,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  ratioText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    color: '#828282',
    includeFontPadding: false,
  },
  ratioItemView: {
    width: 60,
    height: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 26,
    marginRight: 12,
  },
  ratioItemText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    includeFontPadding: false,
  },
  colorView: {
    width: '100%',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  colorText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    color: '#828282',
    includeFontPadding: false,
  },
  colorItemView: {
    width: 62,
    height: 62,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InstaShare;
