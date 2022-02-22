import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';

const InstaShare = ({navigation: {setOptions}, route: {params}}) => {
  console.log(params);
  const viewRef = useRef();
  const [showInstagramStory, setShowInstagramStory] = useState(false);
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
        backgroundBottomColor: 'fff',
        backgroundTopColor: 'fff',
      });
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     Linking.canOpenURL('instagram://')
  //       .then(val => setShowInstagramStory(val))
  //       .catch(err => console.log(err));
  //   } else if (Platform === 'android') {
  //     Share.isPackageInstalled('com.instagram.android')
  //       .then(({isInstalled}) => setShowInstagramStory(isInstalled))
  //       .catch(err => console.log(err));
  //   }
  // }, []);

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 20, fontWeight: '600', textAlign: 'center'}}>
        인스타그램 공유 테스트
      </Text>
      <View
        ref={viewRef}
        style={{width: 200, height: 200, backgroundColor: 'black'}}>
        <Text style={{color: 'white'}}>{params}</Text>
      </View>
      <TouchableOpacity style={{marginTop: 30}} onPress={shareDummyImage}>
        <Text style={{fontSize: 20, fontWeight: '700', textAlign: 'center'}}>
          Share1
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 30}} onPress={shareDummyImage2}>
        <Text style={{fontSize: 20, fontWeight: '700', textAlign: 'center'}}>
          Share2
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InstaShare;
