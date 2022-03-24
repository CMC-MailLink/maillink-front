import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
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

import SearchRecommend from '../../../assets/images/SearchRecommend.png';
import AuthorRecommend from '../../../assets/images/AuthorRecommend.png';
import TestPageRecommend from '../../../assets/images/TestPageRecommend.png';
import {useNavigation} from '@react-navigation/native';

const colorCategory = {
  편안: {back: '#E2FAE2', font: '#00402D', heart: '#7FCE7F'},
  맑은: {back: '#DDF9FF', font: '#002C36', heart: '#6BD0E6'},
  서정: {back: '#E6DDFF', font: '#1E0072', heart: '#AE92FF'},
  잔잔: {back: '#C5F0E3', font: '#00573D', heart: '#5ECEAC'},
  명랑: {back: '#FFF2AD', font: '#5D4300', heart: '#FFC839'},
  유쾌: {back: '#FFDDDD', font: '#370000', heart: '#FF8E8E'},
  달달: {back: '#FFE8FB', font: '#3E0035', heart: '#FFACDE'},
  키치: {back: '#FFE6B7', font: '#432C00', heart: '#FFAD62'},
};

const ReaderRecommend = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [recommend, setRecommend] = useState([
    {
      key: 0,
      name: '희희낙락',
      intro: '최대글자수입니다소개앞부분까지보이게함니당…',
      repBranch: '소설',
      repVive: '명랑',
    },
    {
      key: 1,
      name: '주주',
      intro: '최대글자수입니다소개앞부분까지보이게함니당…',
      repBranch: '에세이',
      repVive: '키치',
    },
    {
      key: 2,
      name: '주주1',
      intro: '최대글자수입니다소개앞부분까지보이게함니당…',
      repBranch: '소설',
      repVive: '잔잔',
    },
    {
      key: 3,
      name: '주주2',
      intro: '최대글자수입니다소개앞부분까지보이게함니당…',
      repBranch: '시',
      repVive: '달달',
    },
  ]);
  const {isLoading: readerInfoLoading, data: readerInfoData} = useQuery(
    ['ReaderInfo'],
    ReaderAPI.memberInfo,
  );

  useEffect(() => {
    if (readerInfoData) {
      setName(readerInfoData.nickName);
    }
  }, [readerInfoData]);

  const onPressAuthor = () => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAuthorProfile',
    });
  };
  const onPressAnalyze = () => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAnalyze',
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['AuthorList']);
    setRefreshing(false);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={onPressAuthor}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.itemView}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemAuthor}>작가님</Text>
            <Text style={styles.itemIntro}>{item.intro}</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{...styles.itemCategoryView, marginRight: 10}}>
                <Text
                  style={{
                    ...styles.itemCategoryText,
                    color: '#0021C6',
                  }}>
                  <Text style={{...styles.itemCategoryText, color: '#4562F1'}}>
                    ♥&nbsp;
                  </Text>
                  {item.repBranch}
                </Text>
              </View>
              <View
                style={{
                  ...styles.itemCategoryView,
                  backgroundColor: colorCategory[item.repVive].back,
                }}>
                <Text
                  style={{
                    ...styles.itemCategoryText,
                    color: colorCategory[item.repVive].font,
                  }}>
                  <Text
                    style={{
                      ...styles.itemCategoryText,
                      color: colorCategory[item.repVive].heart,
                    }}>
                    ♥&nbsp;
                  </Text>
                  {item.repVive}
                </Text>
              </View>
            </View>
          </View>
          <Image
            style={{width: 56, height: 56, position: 'absolute', top: 10}}
            source={AuthorRecommend}></Image>
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
        style={{flex: 1}}
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
            <Image
              style={{
                width: 19,
                height: 20,
              }}
              source={SearchRecommend}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.recView}>
          <FlatList
            data={recommend}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 30}}
            renderItem={renderItem}></FlatList>
        </View>
        <View style={styles.testPageView}>
          <TouchableOpacity onPress={onPressAnalyze}>
            <Image
              style={{
                width: Dimensions.get('window').width,
                height: (Dimensions.get('window').width * 131) / 390,
              }}
              source={TestPageRecommend}></Image>
          </TouchableOpacity>
        </View>
        <ReaderRecommendList></ReaderRecommendList>
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
    width: 53,
    height: 24,
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
});

export default ReaderRecommend;
