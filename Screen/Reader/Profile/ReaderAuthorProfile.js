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
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {ReaderAPI} from '../../../API/ReaderAPI';
import FastImage from 'react-native-fast-image';

import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import BackMail from '../../../assets/images/BackMail.png';
import HeartProfile from '../../../assets/images/HeartProfile.png';
import NotHeartProfile from '../../../assets/images/NotHeartProfile.png';

import AuthorProfileIntro from './ReaderAuthorProfileIntro';
import AuthorProfileMail from './ReaderAuthorProfileMail';

const refreshingHeight = 100;

const ReaderAuthorProfile = ({navigation: {setOptions}, route: {params}}) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [introSelect, setIntroSelect] = useState(true);
  const [offsetY, setOffsetY] = useState(0);
  const [refreshing, setRefreshing] = useState(false); //새로고침 상태
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

  //새로고침 이벤트
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['AuthorInfo']);
    setRefreshing(false);
  };

  //구독 취소하기 버튼 클릭
  const onPressCancelSubscribe = async writerId => {
    var result = await ReaderAPI.cancelSubscribing({writerId: writerId});
    if (result) {
      await queryClient.refetchQueries(['AuthorInfo']);
      await queryClient.refetchQueries(['AuthorList']);
      await queryClient.refetchQueries(['SubscribeAuthorList']);
    }
  };

  //구독하기 버튼 클릭
  const onPressSubscribe = async writerId => {
    var result = await ReaderAPI.subscribing({writerId: writerId});
    if (result) {
      await queryClient.refetchQueries(['AuthorInfo']);
      await queryClient.refetchQueries(['AuthorList']);
      await queryClient.refetchQueries(['SubscribeAuthorList']);
    }
  };

  //관심 버튼 클릭
  const onPressInterest = async writerId => {
    var result = await ReaderAPI.interesting({writerId: writerId});
    if (result) {
      await queryClient.refetchQueries(['AuthorInfo']);
      await queryClient.refetchQueries(['AuthorList']);
      await queryClient.refetchQueries(['SubscribeAuthorList']);
    }
  };

  //관심 취소하기 버튼 클릭
  const onPressCancelInterest = async writerId => {
    var result = await ReaderAPI.cancelInteresting({writerId: writerId});
    if (result) {
      await queryClient.refetchQueries(['AuthorInfo']);
      await queryClient.refetchQueries(['AuthorList']);
      await queryClient.refetchQueries(['SubscribeAuthorList']);
    }
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
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View
            style={{
              position: 'absolute',
              left: 24,
              width: 20,
              height: 20,
            }}>
            <FastImage
              style={{width: 9.5, height: 19}}
              source={BackMail}></FastImage>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>작가프로필</Text>
      </View>
      <ScrollView
        stickyHeaderIndices={[2]}
        onScroll={onScroll}
        scrollEventThrottle={0}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }>
        <View style={{height: 43, backgroundColor: '#4562F1'}}>
          {authorInfoData && authorInfoData.interestedCheck ? (
            <TouchableOpacity
              style={{position: 'absolute', right: 20, bottom: 18}}
              onPress={() => onPressCancelInterest(params.id)}>
              <FastImage
                style={{
                  width: 22,
                  height: 20.17,
                }}
                source={HeartProfile}></FastImage>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{position: 'absolute', right: 20, bottom: 18}}
              onPress={() => onPressInterest(params.id)}>
              <FastImage
                style={{
                  width: 22,
                  height: 20.17,
                }}
                source={NotHeartProfile}></FastImage>
            </TouchableOpacity>
          )}
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
                source={
                  !authorInfoData ||
                  authorInfoData.writerInfo.imgUrl === '' ||
                  !authorInfoData.writerInfo.imgUrl
                    ? DefaultProfile
                    : {uri: authorInfoData.writerInfo.imgUrl}
                }></FastImage>
            </View>
            <View style={{alignItems: 'center', top: 5}}>
              <Text style={styles.profileName}>
                {authorInfoData ? authorInfoData.writerInfo.nickName : ''}
              </Text>
              <Text style={styles.profileCategory}>작가님</Text>
              {authorInfoData && authorInfoData.subscribeCheck ? (
                <TouchableOpacity
                  onPress={() => {
                    onPressCancelSubscribe(params.id);
                  }}>
                  <View style={styles.subscribeView}>
                    <Text style={styles.subscribeText}>구독중</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    onPressSubscribe(params.id);
                  }}>
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
              authorInfoData ? authorInfoData.writerInfo : null
            }></AuthorProfileIntro>
        ) : (
          <AuthorProfileMail id={params.id}></AuthorProfileMail>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 55,
    backgroundColor: '#4562F1',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
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
