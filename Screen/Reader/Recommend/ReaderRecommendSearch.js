import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {ReaderAPI} from '../../../API/ReaderAPI';

import BackMail from '../../../assets/images/BackMail.png';
import SearchMail2 from '../../../assets/images/SearchMail2.png';
import RecentSearchMail from '../../../assets/images/RecentSearchMail.png';
import DeleteMail from '../../../assets/images/DeleteMail.png';
import NoRecentDataMail from '../../../assets/images/NoRecentDataMail.png';
import NoSearchDataMail from '../../../assets/images/NoSearchDataMail.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';

const STORAGE_KEY = '@recentDataReaderRecommendSearch';

const ReaderRecommendSearch = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [recentSearch, setRecentSearch] = useState([]);
  const [query, setQuery] = useState('');
  const [submit, setSubmit] = useState(false);
  const [result, setResult] = useState([]);
  const {isLoading: authrListLoading, data: authorListData} = useQuery(
    ['AuthorList'],
    ReaderAPI.getWriters,
  );

  useEffect(() => {
    getRecentSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setSubmit(true);
    var res = authorListData.filter(item =>
      item.writerInfo.nickName.includes(query),
    );
    setResult([...res]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorListData]);

  useEffect(() => {
    if (query === '') setSubmit(false);
  }, [query]);

  useEffect(() => {
    async function addRecentSearch() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearch));
      } catch (e) {}
    }
    addRecentSearch();
  }, [recentSearch]);

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressRecentSearch = (data, index) => {
    setQuery(data);
    setSubmit(true);
    var res = authorListData.filter(item =>
      item.writerInfo.nickName.includes(data),
    );
    setResult([...res]);

    var temp = recentSearch;
    temp.splice(index, 1);
    temp.unshift(data);
    setRecentSearch([...temp]);
  };

  const onPressDelete = (data, index) => {
    var temp = recentSearch;
    temp.splice(index, 1);
    setRecentSearch([...temp]);
  };

  const onChangeText = text => setQuery(text);

  const onSubmit = () => {
    if (query === '') {
      return;
    }
    setSubmit(true);
    var res = authorListData.filter(item =>
      item.writerInfo.nickName.includes(query),
    );
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

  const onPressAuthorItem = data => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAuthorProfile',
      params: {id: data.writerInfo.id},
    });
  };

  //구독하기 버튼 클릭
  const onPressSubscribe = async writerId => {
    var result = await ReaderAPI.subscribing({writerId: writerId});
    console.log(result);
    if (result) await queryClient.refetchQueries(['AuthorList']);
    await queryClient.refetchQueries(['SubscribeAuthorList']);
  };

  //구독 취소하기 버튼 클릭
  const onPressCancelSubscribe = async writerId => {
    var result = await ReaderAPI.cancelSubscribing({writerId: writerId});
    console.log(result);
    if (result) await queryClient.refetchQueries(['AuthorList']);
    await queryClient.refetchQueries(['SubscribeAuthorList']);
  };

  const getRecentSearch = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('getRecentSearch : ', JSON.parse(value));
      JSON.parse(value) !== null ? setRecentSearch(JSON.parse(value)) : null;
    } catch (e) {
      //error
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="light-content" />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>작가 검색</Text>
        <View style={styles.headerSearchContainer}>
          <TouchableWithoutFeedback onPress={onPressBack}>
            <View>
              <Image style={{width: 9.5, height: 19}} source={BackMail}></Image>
            </View>
          </TouchableWithoutFeedback>
          <View>
            <View style={styles.headerSearchBar}>
              <TextInput
                style={styles.searchTextInput}
                value={query}
                placeholder="작가를 검색해보세요."
                placeholderTextColor="#D2D2D2"
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}></TextInput>
              <TouchableWithoutFeedback onPress={onSubmit}>
                <View style={styles.searchView}>
                  <Image
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
      </View>
      <ScrollView style={{height: '100%'}} showsVerticalScrollIndicator={false}>
        {submit ? (
          <View
            style={{
              paddingBottom: 50,
              minHeight:
                Platform.OS == 'ios'
                  ? Dimensions.get('window').height - 335
                  : Dimensions.get('window').height - 235,
            }}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>작가 검색 결과</Text>
            </View>
            {result.length ? (
              result.map((data, index) => (
                <TouchableOpacity
                  onPress={e => onPressAuthorItem(data)}
                  key={index}>
                  <View key={index} style={styles.bodyItem}>
                    <Image
                      style={{
                        width: 42,
                        height: 42,
                        marginRight: 10,
                        borderRadius: 90,
                      }}
                      source={
                        data.writerInfo.imgUrl === ''
                          ? DefaultProfile
                          : {uri: data.writerInfo.imgUrl}
                      }
                    />
                    <View>
                      <Text style={styles.bodyItemName}>
                        {data.writerInfo.nickName}
                      </Text>
                      <Text style={styles.bodyItemIntro}>
                        {data.writerInfo.introduction}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        data.subscribeCheck
                          ? onPressCancelSubscribe(data.writerInfo.id)
                          : onPressSubscribe(data.writerInfo.id)
                      }
                      style={
                        data.subscribeCheck
                          ? styles.subscribeView
                          : styles.subscribeNotView
                      }>
                      <View>
                        <Text
                          style={
                            data.subscribeCheck
                              ? styles.subscribeText
                              : styles.subscribeNotText
                          }>
                          {data.subscribeCheck ? '구독중' : '구독하기'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 390,
                    height: 78,
                  }}
                  source={NoSearchDataMail}></Image>
              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              minHeight:
                Platform.OS == 'ios'
                  ? Dimensions.get('window').height - 335
                  : Dimensions.get('window').height - 235,
            }}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>최근 검색</Text>
            </View>
            {recentSearch.length ? (
              recentSearch.map((data, index) => (
                <TouchableOpacity
                  onPress={e => onPressRecentSearch(data, index)}
                  key={index}>
                  <View style={styles.recentSearch}>
                    <Image
                      style={{width: 35, height: 35}}
                      source={RecentSearchMail}></Image>
                    <Text style={styles.recentSearchText}>{data}</Text>
                    <TouchableWithoutFeedback
                      onPress={e => onPressDelete(data, index)}>
                      <Image
                        style={{
                          position: 'absolute',
                          width: 12,
                          height: 12,
                          right: 28,
                        }}
                        source={DeleteMail}></Image>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 390,
                    height: 78,
                  }}
                  source={NoRecentDataMail}></Image>
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
    height: 150 - 48,
    backgroundColor: '#4562F1',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#fff',
    includeFontPadding: false,
  },
  headerBack: {
    height: 150 - 48,
    width: 20,
  },
  headerSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerSearchBar: {
    backgroundColor: '#fff',
    width: 322,
    height: 44,
    borderRadius: 43,
    marginLeft: 15,
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
  recentSearch: {
    paddingVertical: 8,
    paddingHorizontal: 23,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  recentSearchText: {
    marginLeft: 16,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  bodyItem: {
    height: 68,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  bodyItemName: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  bodyItemIntro: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
    includeFontPadding: false,
  },
  subscribeView: {
    position: 'absolute',
    right: 20,
    width: 75,
    height: 30,
    borderRadius: 15,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeNotView: {
    position: 'absolute',
    right: 20,
    width: 75,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#828282',
    includeFontPadding: false,
  },
  subscribeNotText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#FFF',
    includeFontPadding: false,
  },
});

export default ReaderRecommendSearch;
