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
  Dimensions,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {AuthorAPI} from '../../../API/AuthorAPI';
import FastImage from 'react-native-fast-image';

import BackMail from '../../../assets/images/BackMail.png';
import SearchMail2 from '../../../assets/images/SearchMail2.png';
import RecentSearchMail from '../../../assets/images/RecentSearchMail.png';
import DeleteMail from '../../../assets/images/DeleteMail.png';
import NoRecentDataMail from '../../../assets/images/NoRecentDataMail.png';
import NoSearchDataMail from '../../../assets/images/NoSearchDataMail.png';

const STORAGE_KEY = '@recentDataAuthorMailSearch';

const AuthorMailSearch = () => {
  const [recentSearch, setRecentSearch] = useState([]);
  const [memberInfo, setMemberInfo] = useState();
  const [query, setQuery] = useState('');
  const [submit, setSubmit] = useState(false);
  const [result, setResult] = useState([]);
  const navigation = useNavigation();
  const {isLoading: mailLoading, data: mailData} = useQuery(
    ['AuthorMail'],
    AuthorAPI.writerGetPublishing,
  );

  useEffect(() => {
    getRecentSearch();

    async function getMemberInfo() {
      const result = await AuthorAPI.memberInfo();
      setMemberInfo(result);
    }

    getMemberInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    var res = mailData.filter(item => item.title.includes(data));
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
    var res = mailData.filter(item => item.title.includes(query));
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

  const onPressMailItem = data => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorReading',
      params: {data, memberInfo},
    });
  };

  const getRecentSearch = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      JSON.parse(value) !== null ? setRecentSearch(JSON.parse(value)) : null;
    } catch (e) {
      //error
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <StatusBar barStyle="light-content" />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>메일 검색</Text>
        <View style={styles.headerSearchContainer}>
          <TouchableWithoutFeedback onPress={onPressBack}>
            <View
              style={{
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FastImage
                style={{width: 9.5, height: 19}}
                source={BackMail}></FastImage>
            </View>
          </TouchableWithoutFeedback>
          <View>
            <View style={styles.headerSearchBar}>
              <TextInput
                style={styles.searchTextInput}
                value={query}
                placeholder="제목을 검색해보세요."
                placeholderTextColor="#D2D2D2"
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}></TextInput>
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
              <Text style={styles.titleText}>메일에서 찾은 결과</Text>
            </View>
            {result.length ? (
              result.map((data, index) => (
                <TouchableWithoutFeedback
                  onPress={e => onPressMailItem(data)}
                  key={index}>
                  <View style={styles.itemView}>
                    <Text style={styles.itemDateText}>
                      {data.publishedTime.slice(0, 10)}
                    </Text>
                    <Text style={styles.itemTitleText}>{data.title}</Text>
                    <Text style={styles.itemBodyText}>{data.preView}</Text>
                  </View>
                </TouchableWithoutFeedback>
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
                  source={NoSearchDataMail}></FastImage>
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
                    <FastImage
                      style={{width: 35, height: 35}}
                      source={RecentSearchMail}></FastImage>
                    <Text style={styles.recentSearchText}>{data}</Text>
                    <TouchableWithoutFeedback
                      onPress={e => onPressDelete(data, index)}>
                      <View
                        style={{
                          position: 'absolute',
                          right: 20,
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <FastImage
                          style={{
                            width: 12,
                            height: 12,
                          }}
                          source={DeleteMail}></FastImage>
                      </View>
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
                <FastImage
                  style={{
                    width: 390,
                    height: 78,
                  }}
                  source={NoRecentDataMail}></FastImage>
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
    includeFontPadding: false,
  },
  itemView: {
    height: 100,
    backgroundColor: '#FFF',
    paddingTop: 12,
    paddingBottom: 17,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  itemDateText: {
    position: 'absolute',
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Thin',
    fontSize: 12,
    right: 20,
    top: 12,
    includeFontPadding: false,
  },
  itemTitleText: {
    color: '#3C3C3C',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    marginBottom: 8,
    includeFontPadding: false,
  },
  itemBodyText: {
    color: '#828282',
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    width: 301,
    includeFontPadding: false,
  },
});

export default AuthorMailSearch;
