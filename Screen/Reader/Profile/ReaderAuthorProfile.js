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
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {ReaderAPI} from '../../../API/ReaderAPI';

import SettingProfile from '../../../assets/images/SettingProfile.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import BackMail from '../../../assets/images/BackMail.png';
import HeartProfile from '../../../assets/images/HeartProfile.png';
import NotHeartProfile from '../../../assets/images/NotHeartProfile.png';

import AuthorProfileIntro from './ReaderAuthorProfileIntro';
import AuthorProfileMail from './ReaderAuthorProfileMail';

const refreshingHeight = 100;

const ReaderAuthorProfile = ({navigation: {setOptions}, route: {params}}) => {
  console.log(params);
  const navigation = useNavigation();
  const [introSelect, setIntroSelect] = useState(true);
  const [heart, setHeart] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const {isLoading: authorInfoLoading, data: authorInfoData} = useQuery(
    ['AuthorInfo', params.id],
    ReaderAPI.getWriterInfo,
  );

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressIntro = () => {
    setIntroSelect(true);
  };

  const onPressMail = () => {
    setIntroSelect(false);
  };

  function onScroll(event) {
    const {nativeEvent} = event;
    const {contentOffset} = nativeEvent;
    const {y} = contentOffset;
    setOffsetY(y);
  }

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <StatusBar barStyle="light-content" />
      <View
        style={{
          ...styles.refreshView,
          height: refreshingHeight - offsetY + 40,
        }}></View>
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail}></Image>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>작가프로필</Text>
      </View>
      <ScrollView
        stickyHeaderIndices={[2]}
        onScroll={onScroll}
        scrollEventThrottle={0}>
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
                source={
                  !authorInfoData || authorInfoData.imgUrl === ''
                    ? DefaultProfile
                    : {uri: authorInfoData.imgUrl}
                }></Image>
            </View>
            <View style={{alignItems: 'center', top: 5}}>
              <Text style={styles.profileName}>
                {authorInfoData ? authorInfoData.nickName : ''}
              </Text>
              <Text style={styles.profileCategory}>작가님</Text>
              {authorInfoData && authorInfoData.subscribe ? (
                <TouchableOpacity onPress={() => {}}>
                  <View style={styles.subscribeView}>
                    <Text style={styles.subscribeText}>구독중</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => {}}>
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
          <AuthorProfileIntro
            authorInfoData={
              authorInfoData ? authorInfoData : null
            }></AuthorProfileIntro>
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
  refreshView: {
    backgroundColor: '#4562F1',
    position: 'absolute',
    left: 0,
    right: 0,
    top: -5,
    alignItems: 'center',
  },
});

export default ReaderAuthorProfile;
