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
  Modal,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import SettingProfile from '../../../assets/images/SettingProfile.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import ImageEditProfile from '../../../assets/images/ImageEditProfile.png';
import CopyProfile from '../../../assets/images/CopyProfile.png';

import AuthorProfileModal from './AuthorProfileModal';

const AuthorProfile = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('영이');
  const [editName, setEditName] = useState('영이');
  const [imageUri, setImageUri] = useState('');
  const [introSelect, setIntroSelect] = useState(true);

  const onPressModalConfirm = () => {
    setName(editName);
    setModalVisible(!modalVisible);
  };
  const onPressIntro = () => {
    setIntroSelect(true);
  };
  const onPressMail = () => {
    setIntroSelect(false);
  };
  const [filePath, setFilePath] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileUri, setFileUri] = useState(null);

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
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };
        setImageUri(source);
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <StatusBar barStyle="light-content" />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <AuthorProfileModal
          editName={editName}
          setEditName={setEditName}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onPressModalConfirm={onPressModalConfirm}></AuthorProfileModal>
      </Modal>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>프로필</Text>
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
              style={{width: 42, height: 42, top: -31, left: 25}}
              source={ImageEditProfile}></Image>
          </TouchableWithoutFeedback>
          <View style={{alignItems: 'center', top: -37}}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileCategory}>작가님</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                  color: introSelect ? '#BEBEBE' : '#000000',
                }}>
                작성메일
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bodyIntroView}>
        <Text style={styles.bodyIntroHeadText}>소개</Text>
        <Text style={styles.bodyIntroText}>
          안녕하세요, 신진작가 ‘덩이’입니다 :) 재미있는 글을 쓰고 싶습니다.
        </Text>
      </View>
      <View style={styles.bodyInterestView}>
        <Text style={styles.bodyIntroHeadText}>관심사</Text>
        <Text style={styles.bodyInterestHeadText}>갈래</Text>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <TouchableOpacity>
            <View style={styles.bodyInterestItemView1}>
              <Text style={styles.bodyInterestItemText1}>시</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.bodyInterestItemView2}>
              <Text style={styles.bodyInterestItemText2}>소설</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.bodyInterestItemView3}>
              <Text style={styles.bodyInterestItemText3}>에세이</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.bodyInterestHeadText}>분위기</Text>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <TouchableOpacity>
            <View
              style={{
                ...styles.bodyInterestItemView2,
                backgroundColor: '#E6DDFF',
              }}>
              <Text style={{...styles.bodyInterestItemText2, color: '#1E0072'}}>
                서정
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                ...styles.bodyInterestItemView2,
                backgroundColor: '#C5F0E3',
              }}>
              <Text style={{...styles.bodyInterestItemText2, color: '#00402D'}}>
                잔잔
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                ...styles.bodyInterestItemView2,
                backgroundColor: '#FFF2AD',
              }}>
              <Text style={{...styles.bodyInterestItemText2, color: '#3D3300'}}>
                명랑
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                ...styles.bodyInterestItemView2,
                backgroundColor: '#FFDDDD',
              }}>
              <Text style={{...styles.bodyInterestItemText2, color: '#370000'}}>
                유쾌
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                ...styles.bodyInterestItemView2,
                backgroundColor: '#FFE8FB',
              }}>
              <Text style={{...styles.bodyInterestItemText2, color: '#3E0035'}}>
                달달
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          ...styles.bodyInterestView,
          borderBottomWidth: 0,
        }}>
        <Text style={styles.bodyIntroHeadText}>관심사</Text>
        <Text style={styles.bodyIntroText}>facebook.com/덩이</Text>
        <TouchableOpacity
          style={{position: 'absolute', top: 50, right: 20}}
          onPress={() => copyToClipboard('facebook.com/덩이')}>
          <Image style={{width: 13, height: 16}} source={CopyProfile}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 121 - 48,
    backgroundColor: '#4562F1',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#fff',
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
  },
  bodyIntroView: {
    height: 114,
    paddingTop: 19,
    paddingBottom: 19,
    paddingLeft: 21,
    paddingRight: 21,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  bodyIntroHeadText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    color: '#3C3C3C',
    height: 30,
  },
  bodyIntroText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#828282',
  },
  bodyInterestView: {
    paddingVertical: 19,
    paddingHorizontal: 21,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  bodyInterestHeadText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 12,
    color: '#828282',
    marginBottom: 5,
  },
  bodyInterestItemView1: {
    width: 43,
    height: 24,
    borderRadius: 26,
    backgroundColor: '#E8EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
  bodyInterestItemText1: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#0021C6',
  },
  bodyInterestItemView2: {
    width: 53,
    height: 24,
    borderRadius: 26,
    backgroundColor: '#E8EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
  bodyInterestItemText2: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#0021C6',
  },
  bodyInterestItemView3: {
    width: 63,
    height: 24,
    borderRadius: 26,
    backgroundColor: '#E8EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
  bodyInterestItemText3: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#0021C6',
  },
});

export default AuthorProfile;
