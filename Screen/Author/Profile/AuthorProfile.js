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
import ImageEditProfile from '../../../assets/images/ImageEditProfile.png';

import AuthorProfileIntro from './AuthorProfileIntro';
import AuthorProfileMail from './AuthorProfileMail';

const AuthorProfile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('비비작가');
  const [imageUri, setImageUri] = useState('');
  const [introSelect, setIntroSelect] = useState(true);
  const [filePath, setFilePath] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileUri, setFileUri] = useState(null);

  const onPressIntro = () => {
    setIntroSelect(true);
  };

  const onPressMail = () => {
    setIntroSelect(false);
  };

  const copyToClipboard = data => {
    Clipboard.setString(data);
  };

  const onPressProfileEdit = () => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorProfileEdit',
    });
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
        <Text style={styles.headerText}>프로필</Text>
      </View>
      <ScrollView stickyHeaderIndices={[2]} bounces={false}>
        <View style={{height: 43, backgroundColor: '#4562F1'}}>
          <TouchableOpacity
            style={{position: 'absolute', right: 20, bottom: 18}}
            onPress={() => {
              navigation.navigate('AuthorStacks', {
                screen: 'Setting',
              });
            }}>
            <Image
              style={{
                width: 18.68,
                height: 19.2,
              }}
              source={SettingProfile}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.profileView}>
          <View
            style={{
              alignItems: 'center',
              top: -39,
              width: 160,
            }}>
            <TouchableWithoutFeedback onPress={onPressEditImage}>
              <Image
                style={{width: 78, height: 78, borderRadius: 90}}
                source={imageUri == '' ? DefaultProfile : imageUri}></Image>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPressEditImage}>
              <Image
                style={{width: 27.76, height: 27.76, top: -31, left: 25}}
                source={ImageEditProfile}></Image>
            </TouchableWithoutFeedback>
            <View style={{alignItems: 'center', top: -21}}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileCategory}>작가님</Text>
              <TouchableOpacity onPress={onPressProfileEdit}>
                <View style={styles.profileEditView}>
                  <Text style={styles.profileEditText}>프로필 수정</Text>
                </View>
              </TouchableOpacity>
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
  profileEditView: {
    width: 75,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    marginTop: 7,
  },
  profileEditText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
});

export default AuthorProfile;
