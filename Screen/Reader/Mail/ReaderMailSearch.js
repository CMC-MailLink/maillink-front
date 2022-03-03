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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackMail from '../../../assets/images/BackMail.png';
import SearchMail2 from '../../../assets/images/SearchMail2.png';
import RecentSearchMail from '../../../assets/images/RecentSearchMail.png';
import DeleteMail from '../../../assets/images/DeleteMail.png';
import NoDataMail from '../../../assets/images/NoDataMail.png';
import AuthorProfileImage from '../../../assets/images/AuthorProfileImage.png';

const STORAGE_KEY = '@recentDataReaderMailSearch';

const ReaderMailSearch = () => {
  const [recentSearch, setRecentSearch] = useState([]);
  const [mail, setMail] = useState([
    {
      key: '0',
      author: '이작가',
      title: '청춘예찬2',
      body: '피가 광야에서 이는 위하여 없으면, 풍부 하게 심장의 영락과 곳으로 것이다. 끝',
      date: '21. 02. 13',
    },
    {
      key: '1',
      author: '김작가',
      title: '별 헤는 밤',
      body: '하나에 경, 우는 이국 그리워 파란 애기듯 합니다.오는 잔디가 밤이 봅니다. 말같',
      date: '21. 02. 12',
    },
    {
      key: '2',
      author: '이작가',
      title: '청춘예찬',
      body: '하나에 경, 우는 이국 그리워 파란 애기듯 합니다.오는 잔디가 밤이 봅니다. 말같',
      date: '21. 02. 11',
    },
    {
      key: '3',
      author: '최작가',
      title: '파란 하늘',
      body: '피가 광야에서 이는 위하여 없으면, 풍부 하게 심장의 영락과 곳으로 것이다. 끝',
      date: '21. 02. 10',
    },
  ]);
  const [query, setQuery] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [result, setResult] = useState([]);
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressRecentSearch = (data, index) => {
    setQuery(data);
    setSubmit(true);
    var res = mail.filter(
      item => item.author.includes(data) || item.title.includes(data),
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
    var res = mail.filter(
      item => item.author.includes(query) || item.title.includes(query),
    );
    setResult([...res]);

    var temp = recentSearch;
    if (temp.length) {
      if (temp.length > 9) temp.pop();
      temp.unshift(query);
    } else temp = [query];
    setRecentSearch([query]);
    setRecentSearch([...temp]);
  };

  const onPressMailItem = data => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderReading',
      params: {item: {...data}},
    });
  };
  useEffect(() => {
    getRecentSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query === '') setSubmit(false);
  }, [query]);

  useEffect(() => {
    async function addRecentSearch() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearch));
      } catch (e) {
        console.log(e);
      }
    }
    addRecentSearch();
  }, [recentSearch]);

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
        <Text style={styles.headerText}>메일 검색</Text>
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
                placeholder="작가 또는 제목을 검색해보세요."
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
      <ScrollView>
        {submit ? (
          <View>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>메일에서 찾은 결과</Text>
            </View>
            {result.length ? (
              result.map((data, index) => (
                <TouchableWithoutFeedback
                  onPress={e => onPressMailItem(data)}
                  key={index}>
                  <View
                    style={{
                      height: 114,
                      backgroundColor: '#FFF',
                      paddingTop: 14,
                      borderBottomColor: '#EBEBEB',
                      borderBottomWidth: 1,
                    }}>
                    <Image
                      style={{
                        position: 'absolute',
                        width: 42,
                        height: 42,
                        left: 36,
                        top: 14,
                      }}
                      source={AuthorProfileImage}
                    />
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#4562F1',
                          fontFamily: 'NotoSansKR-Bold',
                          fontSize: 16,
                          left: 93,
                        }}>
                        {data.author}
                      </Text>
                      <Text
                        style={{
                          position: 'absolute',
                          color: '#BEBEBE',
                          fontFamily: 'NotoSansKR-Thin',
                          fontSize: 12,
                          right: 20,
                        }}>
                        {data.date}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#000',
                        fontFamily: 'NotoSansKR-Bold',
                        fontSize: 14,
                        left: 93,
                      }}>
                      {data.title}
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontFamily: 'NotoSansKR-Thin',
                        fontSize: 14,
                        left: 93,
                        width: 230,
                      }}>
                      {data.body}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))
            ) : (
              <Image
                style={{width: 390, height: 78, top: 244}}
                source={NoDataMail}></Image>
            )}
          </View>
        ) : (
          <View>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>최근 검색</Text>
            </View>
            {recentSearch.length
              ? recentSearch.map((data, index) => (
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
              : null}
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
    height: 43,
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
    color: '#3C3C3C',
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
  },
});

export default ReaderMailSearch;
