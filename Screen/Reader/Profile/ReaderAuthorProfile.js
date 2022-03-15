import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import SettingProfile from '../../../assets/images/SettingProfile.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import BackMail from '../../../assets/images/BackMail.png';
import HeartProfile from '../../../assets/images/HeartProfile.png';
import NotHeartProfile from '../../../assets/images/NotHeartProfile.png';

import AuthorProfileIntro from './ReaderAuthorProfileIntro';
import AuthorProfileMail from './ReaderAuthorProfileMail';

const ReaderAuthorProfile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('덩이');
  const [subscribe, setSubscribe] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [introSelect, setIntroSelect] = useState(true);
  const [heart, setHeart] = useState(false);
  const [filePath, setFilePath] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileUri, setFileUri] = useState(null);

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressIntro = () => {
    setIntroSelect(true);
  };

  const onPressMail = () => {
    setIntroSelect(false);
  };

  const copyToClipboard = data => {
    Clipboard.setString(data);
  };

  const onPressEditImage = async () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
        maxWidth: 78,
        maxHeight: 78,
      },
      includeBase64: true,
    };
    // launchImageLibrary(options, response => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.errorCode) {
    //     console.log('ImagePicker Error: ', response.errorCode);
    //     console.log('ImagePicker Error: ', response.errorMessage);
    //   } else {
    //     const source = {
    //       uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
    //     };
    //     setImageUri(source);
    //   }
    // });
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <StatusBar barStyle="light-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail}></Image>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>작가프로필</Text>
      </View>
      <ScrollView stickyHeaderIndices={[2]} bounces={false}>
        <View style={{height: 43, backgroundColor: '#4562F1'}}>
          <TouchableOpacity
            style={{position: 'absolute', right: 20, bottom: 18}}
            onPress={() => setHeart(!heart)}>
            {heart ? (
              <Image
                style={{
                  width: 22,
                  height: 20.17,
                }}
                source={HeartProfile}></Image>
            ) : (
              <Image
                style={{
                  width: 22,
                  height: 20.17,
                }}
                source={NotHeartProfile}></Image>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.profileView}>
          <View
            style={{
              alignItems: 'center',
              top: -39,
              width: 160,
            }}>
            <View>
              <Image
                style={{width: 78, height: 78, borderRadius: 90}}
                source={imageUri == '' ? DefaultProfile : imageUri}></Image>
            </View>
            <View style={{alignItems: 'center', top: 5}}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileCategory}>작가님</Text>
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
          </View>
        </View>
        <View style={styles.bodyHeader}>
          <View
            style={{
              width: 128,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={introSelect ? styles.bodyHeaderBorder : null}>
              <TouchableOpacity onPress={onPressIntro}>
                <Text
                  style={{
                    ...styles.bodyHeaderText,
                    color: introSelect ? '#3C3C3C' : '#BEBEBE',
                  }}>
                  작가소개
                </Text>
              </TouchableOpacity>
            </View>
            <View style={introSelect ? null : styles.bodyHeaderBorder}>
              <TouchableOpacity onPress={onPressMail}>
                <Text
                  style={{
                    ...styles.bodyHeaderText,
                    color: introSelect ? '#BEBEBE' : '#3C3C3C',
                  }}>
                  작성메일
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {introSelect ? (
          <AuthorProfileIntro></AuthorProfileIntro>
        ) : (
          <AuthorProfileMail></AuthorProfileMail>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 78 - 48,
    backgroundColor: '#4562F1',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#fff',
    includeFontPadding: false,
  },
  profileView: {
    height: 150,
    backgroundColor: '#fff',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 3,
    alignItems: 'center',
  },
  bodyHeader: {
    height: 40,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bodyHeaderBorder: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#4562F1',
    justifyContent: 'center',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    includeFontPadding: false,
  },
  profileName: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  profileCategory: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  subscribeView: {
    marginTop: 8,
    width: 75,
    height: 30,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  notSubscribeView: {
    marginTop: 8,
    width: 75,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4562F1',
  },
  notSubscribeText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#FFF',
    includeFontPadding: false,
  },
});

export default ReaderAuthorProfile;
