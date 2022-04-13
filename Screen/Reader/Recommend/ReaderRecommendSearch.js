import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import {useQueryClient, useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

import RecentSearchListItem from '../../../Components/RecentSearchListItem';
import {ReaderAPI} from '../../../API/ReaderAPI';
import HeaderWithoutBack from '../../../Components/HeaderWithoutBack';

import BackMail from '../../../assets/images/BackMail.png';
import SearchMail2 from '../../../assets/images/SearchMail2.png';
import NoRecentDataMail from '../../../assets/images/NoRecentDataMail.png';
import NoSearchDataMail from '../../../assets/images/NoSearchDataMail.png';
import AuthorListItem from '../../../Components/Reader/AuthorListItem';

const STORAGE_KEY = '@recentSearch';

const ReaderRecommendSearch = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const [recentSearch, setRecentSearch] = useState([]); //최근 검색어 리스트
  const [query, setQuery] = useState(''); //검색어
  const [submit, setSubmit] = useState(false); //검색 유무
  const [result, setResult] = useState([]); //검색결과
  //전체작가리스트
  const {isLoading: authorListLoading, data: authorListData} = useQuery(
    ['AuthorList'],
    ReaderAPI.getWriters,
  );

  useEffect(() => {
    //최근 검색어 불러오기
    async function getRecentSearch() {
      try {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        JSON.parse(value) !== null ? setRecentSearch(JSON.parse(value)) : null;
      } catch (e) {
        //error
      }
    }

    getRecentSearch();
  }, []);

  useEffect(() => {
    onSubmit();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorListData]);

  useEffect(() => {
    if (query === '') setSubmit(false);
  }, [query]);

  useEffect(() => {
    //최근 검색어 변경
    async function updateRecentSearch() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearch));
      } catch (e) {}
    }
    updateRecentSearch();
  }, [recentSearch]);

  //최근 검색어 선택
  const onPressRecentSearch = (data, index) => {
    setQuery(data);
    setSubmit(true);
    var res = authorListData.filter(item => {
      if (item.writerInfo.nickName === '탈퇴한 회원 입니다.') return false;
      if (item.writerInfo.nickName.toLowerCase().includes(data.toLowerCase()))
        return true;
    });
    setResult([...res]);

    var temp = recentSearch;
    temp.splice(index, 1);
    temp.unshift(data);
    setRecentSearch([...temp]);
  };

  //검색
  const onSubmit = () => {
    if (query === '') {
      return;
    }
    setSubmit(true);
    var res = authorListData.filter(item => {
      if (item.writerInfo.nickName === '탈퇴한 회원 입니다.') return false;
      if (item.writerInfo.nickName.toLowerCase().includes(query.toLowerCase()))
        return true;
    });
    setResult([...res]);

    var temp = recentSearch;
    if (temp.length) {
      if (temp.length > 9) temp.pop();
      temp.unshift(query);
    } else {
      temp = [query];
      setRecentSearch([query]);
    }
    setRecentSearch([...temp]);
  };

  //작가 프로필 선택
  const onPressAuthorItem = data => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAuthorProfile',
      params: {id: data.writerInfo.id},
    });
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="light-content" />
      <HeaderWithoutBack title={'작가 검색'} theme={'blue'} />
      <View style={styles.headerView}>
        <View style={styles.headerSearchContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={styles.backIcon}>
              <FastImage style={{width: 9.5, height: 19}} source={BackMail} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.headerSearchBar}>
            <TextInput
              style={styles.searchTextInput}
              value={query}
              placeholder="작가를 검색해보세요."
              placeholderTextColor="#D2D2D2"
              returnKeyType="search"
              onChangeText={text => setQuery(text)}
              onSubmitEditing={onSubmit}
            />
            <TouchableWithoutFeedback onPress={onSubmit}>
              <View style={styles.searchView}>
                <FastImage
                  style={{
                    width: 19,
                    height: 20,
                  }}
                  source={SearchMail2}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <ScrollView style={{height: '100%'}} showsVerticalScrollIndicator={false}>
        {submit ? (
          <View style={styles.resultView}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>작가 검색 결과</Text>
            </View>
            {result.length ? (
              result.map((data, index) => (
                <TouchableOpacity
                  onPress={e => onPressAuthorItem(data)}
                  key={index}>
                  <AuthorListItem data={data} />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noResultView}>
                <FastImage
                  style={{
                    width: 390,
                    height: 78,
                  }}
                  source={NoSearchDataMail}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={styles.resultView}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>최근 검색</Text>
            </View>
            {recentSearch.length ? (
              recentSearch.map((data, index) => (
                <TouchableOpacity
                  onPress={e => onPressRecentSearch(data, index)}
                  key={index}>
                  <RecentSearchListItem
                    data={data}
                    index={index}
                    recentSearch={recentSearch}
                    setRecentSearch={setRecentSearch}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FastImage
                  style={{
                    width: 390,
                    height: 78,
                  }}
                  source={NoRecentDataMail}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 150 - 83,
    backgroundColor: '#4562F1',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    paddingRight: 20,
    paddingLeft: 48,
  },
  headerSearchBar: {
    backgroundColor: '#fff',
    width: '100%',
    height: 44,
    borderRadius: 43,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 44,
  },
  searchView: {
    position: 'absolute',
    right: 0,
    width: 44,
    height: 44,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchTextInput: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 15,
    includeFontPadding: false,
  },
  titleView: {
    height: 44,
    width: '100%',
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    paddingLeft: 21,
  },
  titleText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    color: '#000',
    includeFontPadding: false,
  },
  bodyItem: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  bodyItemName: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
    marginBottom: 3,
    includeFontPadding: false,
  },
  bodyItemIntro: {
    width: Dimensions.get('window').width - 40 - 42 - 15 - 75 - 10,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
    includeFontPadding: false,
  },
  subscribeView: {
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
  backIcon: {
    position: 'absolute',
    left: 13,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultView: {
    paddingBottom: 50,
    minHeight:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height - 335
        : Dimensions.get('window').height - 235,
  },
  noResultView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReaderRecommendSearch;
