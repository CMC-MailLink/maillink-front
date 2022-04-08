import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {AuthorAPI} from '../../../API/AuthorAPI';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import FastImage from 'react-native-fast-image';

import SettingProfile from '../../../assets/images/SettingProfile.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import FollowerIcon from '../../../assets/images/FollowerIcon.png';

import AuthorProfileIntro from './AuthorProfileIntro';
import AuthorProfileMail from './AuthorProfileMail';

const refreshingHeight = 100;

const AuthorProfile = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [introSelect, setIntroSelect] = useState(true);
  const [writerInfo, setWriterInfo] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const {isLoading: authorProfileLoading, data: authorProfileData} = useQuery(
    ['AuthorProfile'],
    AuthorAPI.writerInfo,
  );
  const {isLoading: authorFollowerNumLoading, data: authorFollowerNumData} =
    useQuery(['AuthorFollowerNum'], AuthorAPI.getfollowerNum);

  useEffect(() => {
    if (authorProfileData) {
      setWriterInfo(authorProfileData);
      setName(authorProfileData.nickName);
      setImageUri(authorProfileData.imageUrl);
    }
  }, [authorProfileData]);

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
      params: {writerInfo},
    });
  };

  //새로고침 스크롤
  function onScroll(event) {
    const {nativeEvent} = event;
    const {contentOffset} = nativeEvent;
    const {y} = contentOffset;
    setOffsetY(y);
  }

  //새로고침 이벤트
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['AuthorProfile']);
    await queryClient.refetchQueries(['AuthorFollowerNum']);
    setRefreshing(false);
  };

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
        <Text style={styles.headerText}>프로필</Text>
      </View>
      <ScrollView
        style={{backgroundColor: '#fff'}}
        onScroll={onScroll}
        scrollEventThrottle={0}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"></RefreshControl>
        }
        stickyHeaderIndices={[2]}>
        <View style={{height: 43, backgroundColor: '#4562F1'}}>
          <TouchableOpacity
            style={{position: 'absolute', right: 20, bottom: 18}}
            onPress={() => {
              navigation.navigate('AuthorStacks', {
                screen: 'Setting',
              });
            }}>
            <FastImage
              style={{
                width: 18.68,
                height: 19.2,
              }}
              source={SettingProfile}></FastImage>
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
              <FastImage
                style={{width: 78, height: 78, borderRadius: 90}}
                defaultSource={DefaultProfile}
                source={
                  !writerInfo || writerInfo.imgUrl == '' || !writerInfo.imgUrl
                    ? DefaultProfile
                    : {uri: writerInfo.imgUrl}
                }></FastImage>
            </View>
            <View style={{alignItems: 'center', top: 8}}>
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
          <TouchableOpacity
            style={{position: 'absolute', right: 20, top: 10}}
            onPress={() => {
              navigation.navigate('AuthorStacks', {
                screen: 'AuthorProfileFollowerList',
                params: {name: name},
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FastImage
                style={{width: 10.38, height: 12.27, marginRight: 6, top: 1}}
                source={FollowerIcon}></FastImage>
              <Text
                style={{
                  fontFamily: 'NotoSansKR-Medium',
                  fontSize: 14,
                  color: '#BEBEBE',
                  includeFontPadding: false,
                }}>
                구독자&nbsp;&nbsp;
              </Text>
              <Text
                style={{
                  fontFamily: 'NotoSansKR-Medium',
                  fontSize: 14,
                  color: '#3c3c3c',
                  includeFontPadding: false,
                }}>
                {authorFollowerNumData ? authorFollowerNumData : '0'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {introSelect ? (
          <AuthorProfileIntro writerInfo={writerInfo}></AuthorProfileIntro>
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
    justifyContent: 'center',
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
  refreshView: {
    backgroundColor: '#4562F1',
    position: 'absolute',
    left: 0,
    right: 0,
    top: -5,
    alignItems: 'center',
  },
});

export default AuthorProfile;
