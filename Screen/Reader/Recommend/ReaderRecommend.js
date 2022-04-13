import React, {useState} from 'react';
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
  RefreshControl,
} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {ReaderAPI} from '../../../API/ReaderAPI';
import ReaderRecommendList from './ReaderRecommendList';
import Loader from '../../../Components/Loader';
import RecommendAuthorListItem from '../../../Components/Reader/RecommendAuthorListItem';

import SearchRecommend from '../../../assets/images/SearchRecommend.png';
import TestPageRecommend from '../../../assets/images/TestPageRecommend.png';
import FilterRecommend from '../../../assets/images/FilterRecommend.png';

const ReaderRecommend = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false); //새로고침 상태
  const [modalVisible, setModalVisible] = useState(false); //전체작가 modal 화면 표시 유무
  const [allSelect, setAllSelect] = useState(true); //전체작가 or 관심작가 선택

  //독자 멤버정보
  const {isLoading: readerInfoLoading, data: readerInfoData} = useQuery(
    ['ReaderInfo'],
    ReaderAPI.memberInfo,
  );
  //오늘의 추천작가리스트
  const {isLoading: recommendListLoading, data: recommendListData} = useQuery(
    ['RecommendList'],
    ReaderAPI.getRecommendList,
  );
  //전체작가리스트
  const {isLoading: authorListLoading, data: authorListData} = useQuery(
    ['AuthorList'],
    ReaderAPI.getWriters,
  );

  //화면 로딩
  const loading =
    readerInfoLoading || recommendListLoading || authorListLoading;

  //취향분석페이지 선택
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

  //새로고침
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['ReaderInfo']);
    await queryClient.refetchQueries(['AuthorList']);
    await queryClient.refetchQueries(['RecommendList']);
    setRefreshing(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>작가찾기</Text>
      </View>
      <ScrollView
        stickyHeaderIndices={[3]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
              {readerInfoData.nickName}
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
              source={SearchRecommend}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.recView}>
          <FlatList
            data={recommendListData}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 20}}
            renderItem={({item}) => <RecommendAuthorListItem item={item} />}
          />
        </View>
        <View style={styles.testPageView}>
          <TouchableOpacity onPress={onPressAnalyze}>
            <FastImage
              style={{
                width: Dimensions.get('window').width,
                height: (Dimensions.get('window').width * 131) / 390,
              }}
              source={TestPageRecommend}
            />
          </TouchableOpacity>
        </View>
        <View style={{borderTopColor: '#F8F8F8', borderTopWidth: 6}}>
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
                source={FilterRecommend}
              />
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
          authorListData={authorListData}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          allSelect={allSelect}
        />
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
  testPageView: {
    paddingBottom: 24,
  },
});

export default ReaderRecommend;
