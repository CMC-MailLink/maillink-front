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
} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';

import ExitWriting from '../assets/images/ExitWriting.png';

const InstaShare = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  console.log(params);
  const viewRef = useRef();
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
    <View>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
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
      <TouchableOpacity style={{marginTop: 30}} onPress={shareDummyImage2}>
        <Text style={{fontSize: 20, fontWeight: '700', textAlign: 'center'}}>
          Share2
        </Text>
      </TouchableOpacity>
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
});

export default InstaShare;
