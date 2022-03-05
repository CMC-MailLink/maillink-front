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

import EmptyHeartProfile from '../../../assets/images/EmptyHeartProfile.png';
import HeartProfile from '../../../assets/images/HeartProfile.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import BackMail from '../../../assets/images/BackMail.png';

import ReaderAuthorProfileIntro from './ReaderAuthorProfileIntro';
import ReaderAuthorProfileMail from './ReaderAuthorProfileMail';

const ReaderAuthorProfile = () => {
  const [name, setName] = useState('덩이');
  const [imageUri, setImageUri] = useState('');
  const [introSelect, setIntroSelect] = useState(true);
  const [heart, setHeart] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressIntro = () => {
    setIntroSelect(true);
  };
  const onPressMail = () => {
    setIntroSelect(false);
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
        <Text style={styles.headerText}>작가 프로필</Text>
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
                source={EmptyHeartProfile}></Image>
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
            <View style={{alignItems: 'center', marginTop: 8}}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileCategory}>작가님</Text>
              {subscribe ? (
                <TouchableOpacity onPress={() => setSubscribe(false)}>
                  <View
                    style={{
                      ...styles.profileEditView,
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#BEBEBE',
                    }}>
                    <Text style={{...styles.profileEditText, color: '#828282'}}>
                      구독중
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setSubscribe(true)}>
                  <View style={styles.profileEditView}>
                    <Text style={styles.profileEditText}>구독하기</Text>
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
          <ReaderAuthorProfileIntro></ReaderAuthorProfileIntro>
        ) : (
          <ReaderAuthorProfileMail></ReaderAuthorProfileMail>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#4562F1',
    marginTop: 7,
  },
  profileEditText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});

export default ReaderAuthorProfile;
