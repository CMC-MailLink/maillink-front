import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import ReaderRecommendList from './ReaderRecommendList';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {ReaderAPI} from '../../../API/ReaderAPI';
import FastImage from 'react-native-fast-image';

import SearchRecommend from '../../../assets/images/SearchRecommend.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import TestPageRecommend from '../../../assets/images/TestPageRecommend.png';
import FilterRecommend from '../../../assets/images/FilterRecommend.png';
import {useNavigation} from '@react-navigation/native';

const colorCategory = {
  Comfortable: {
    name: '편안',
    back: '#E2FAE2',
    font: '#00402D',
    num: '#7FCE7F',
  },
  Clear: {name: '맑은', back: '#DDF9FF', font: '#002C36', num: '#6BD0E6'},
  Lyrical: {name: '서정', back: '#E6DDFF', font: '#1E0072', num: '#AE92FF'},
  Calm: {name: '잔잔', back: '#C5F0E3', font: '#00573D', num: '#5ECEAC'},
  Light: {name: '명랑', back: '#FFF2AD', font: '#5D4300', num: '#FFC839'},
  Cheerful: {name: '유쾌', back: '#FFDDDD', font: '#370000', num: '#FF8E8E'},
  Sweet: {name: '달달', back: '#FFE8FB', font: '#3E0035', num: '#FFACDE'},
  Kitsch: {name: '키치', back: '#FFE6B7', font: '#432C00', num: '#FFAD62'},
  Poetry: {name: '시', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
  Novels: {name: '소설', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
  Essays: {name: '에세이', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
};

const ReaderRecommend = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [allSelect, setAllSelect] = useState(true);
  const {isLoading: readerInfoLoading, data: readerInfoData} = useQuery(
    ['ReaderInfo'],
    ReaderAPI.memberInfo,
  );
  const {isLoading: authorInfoLoading, data: authorInfoData} = useQuery(
    ['AuthorInfo', 1],
    ReaderAPI.getWriterInfo,
  );

  useEffect(() => {
    if (readerInfoData) {
      setName(readerInfoData.nickName);
    }
  }, [readerInfoData]);

  const onPressAuthor = data => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAuthorProfile',
      params: {id: data.writerInfo.id},
    });
  };
  const onPressAnalyze = () => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAnalyze',
    });
  };

  //전체목록 선택
  const onPressAll = () => {
    setAllSelect(true);
  };

  //관심작가 선택
  const onPressInterest = () => {
    setAllSelect(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['AuthorList']);
    setRefreshing(false);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => onPressAuthor(item)}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.itemView}>
            <Text style={styles.itemName}>{item.writerInfo.nickName}</Text>
            <Text style={styles.itemAuthor}>작가님</Text>
            <Text style={styles.itemIntro} numberOfLines={2}>
              {item.writerInfo.introduction}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{...styles.itemCategoryView, marginRight: 10}}>
                <Text
                  style={{
                    ...styles.itemCategoryText,
                    color: '#0021C6',
                  }}>
                  {colorCategory[item.writerInfo.genre1].name}
                </Text>
              </View>
              <View
                style={{
                  ...styles.itemCategoryView,
                  backgroundColor: colorCategory[item.writerInfo.mood1].back,
                }}>
                <Text
                  style={{
                    ...styles.itemCategoryText,
                    color: colorCategory[item.writerInfo.mood1].font,
                  }}>
                  {colorCategory[item.writerInfo.mood1].name}
                </Text>
              </View>
            </View>
          </View>
          <FastImage
            style={{
              width: 56,
              height: 56,
              position: 'absolute',
              top: 10,
              borderRadius: 90,
            }}
            source={
              !item || item.writerInfo.imgUrl === ''
                ? DefaultProfile
                : {uri: item.writerInfo.imgUrl}
            }></FastImage>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>작가찾기</Text>
      </View>
      <ScrollView
        stickyHeaderIndices={[3]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}></RefreshControl>
        }>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Bold',
                fontSize: 20,
                color: '#3C3C3C',
                includeFontPadding: false,
              }}>
              {name}
            </Text>
            님,
          </Text>
          <Text style={styles.titleText}>오늘의 추천작가입니다.</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ReaderStacks', {
                screen: 'ReaderRecommendSearch',
              })
            }
            style={{position: 'absolute', right: 20, bottom: 5}}>
            <FastImage
              style={{
                width: 19,
                height: 20,
              }}
              source={SearchRecommend}></FastImage>
          </TouchableOpacity>
        </View>
        <View style={styles.recView}>
          <FlatList
            data={authorInfoData ? [authorInfoData] : []}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 20}}
            renderItem={renderItem}></FlatList>
        </View>
        <View style={styles.testPageView}>
          <TouchableOpacity onPress={onPressAnalyze}>
            <FastImage
              style={{
                width: Dimensions.get('window').width,
                height: (Dimensions.get('window').width * 131) / 390,
              }}
              source={TestPageRecommend}></FastImage>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.headerMiddleView}>
            <Text style={styles.headerMiddleText}>전체 메일링크 작가</Text>
            <TouchableOpacity
              style={{position: 'absolute', right: 20}}
              onPress={() => setModalVisible(true)}>
              <FastImage
                style={{
                  width: 21,
                  height: 17,
                }}
                source={FilterRecommend}></FastImage>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyHeader}>
            <View
              style={{
                width: 128,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={allSelect ? styles.bodyHeaderBorder : null}>
                <TouchableOpacity onPress={onPressAll}>
                  <Text
                    style={{
                      ...styles.bodyHeaderText,
                      color: allSelect ? '#3C3C3C' : '#BEBEBE',
                    }}>
                    전체목록
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={allSelect ? null : styles.bodyHeaderBorder}>
                <TouchableOpacity onPress={onPressInterest}>
                  <Text
                    style={{
                      ...styles.bodyHeaderText,
                      color: allSelect ? '#BEBEBE' : '#3C3C3C',
                    }}>
                    관심작가
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <ReaderRecommendList
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          allSelect={allSelect}></ReaderRecommendList>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height: 83 - 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  titleView: {
    paddingHorizontal: 20,
  },
  titleText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 20,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  recView: {
    paddingTop: 5,
  },
  itemView: {
    width: 159,
    height: 155,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 9,
    elevation: 4,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    alignItems: 'center',
    paddingHorizontal: 21,
    marginTop: 40,
    paddingTop: 30,
    marginBottom: 20,
  },
  itemName: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  itemAuthor: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 10,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  itemIntro: {
    marginTop: 5,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 11,
    color: '#828282',
    includeFontPadding: false,
  },
  testPageView: {
    paddingBottom: 24,
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 6,
  },
  itemCategoryView: {
    paddingHorizontal: 14.6,
    height: 30,
    borderRadius: 26,
    backgroundColor: '#E8EBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCategoryText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    includeFontPadding: false,
  },
  bodyHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    justifyContent: 'center',
  },
  bodyHeaderBorder: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#4562F1',
    justifyContent: 'center',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    includeFontPadding: false,
  },
  headerMiddleView: {
    backgroundColor: '#fff',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMiddleText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
});

export default ReaderRecommend;
