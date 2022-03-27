import React, {useEffect, useState} from 'react';
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
  Dimensions,
  Platform,
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

const STORAGE_KEY = '@recentDataReaderMailSearch';

const ReaderMailSearch = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [recentSearch, setRecentSearch] = useState([]);
  const [query, setQuery] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [result, setResult] = useState([]);
  const [mail, setMail] = useState();
  const {isLoading: mailLoading, data: mailListSearchData} = useQuery(
    ['ReaderMail'],
    ReaderAPI.readerMailBox,
  );

  useEffect(() => {
    getRecentSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mailListSearchData) setMail([...mailListSearchData]);
  }, [mailListSearchData]);

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
    var res = mail.filter(item => {
      if (
        item.key !== 'category' &&
        (item.title.includes(data) || item.writerNickname.includes(data))
      )
        return true;
    });
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
    var res = mail.filter(item => {
      if (
        item.key !== 'category' &&
        (item.title.includes(query) || item.writerNickname.includes(query))
      )
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

  const onPressMailItem = async data => {
    console.log(data);
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderReading',
      params: {mailId: data.id, writerId: data.writerId},
    });
    await queryClient.refetchQueries(['ReaderMail']);
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
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
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
                  key={index}
                  onPress={e => onPressMailItem(data)}>
                  <View style={styles.itemView}>
                    <Image
                      style={{
                        width: 42,
                        height: 42,
                        opacity: data.isRead ? 0.4 : null,
                        borderRadius: 90,
                      }}
                      source={
                        data.writerImgUrl === ''
                          ? DefaultProfile
                          : {uri: data.writerImgUrl}
                      }
                    />
                    <View style={styles.itemTextView}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            ...styles.itemAuthorText,
                            color: data.isRead ? '#BEBEBE' : '#4562F1',
                          }}>
                          {data.writerNickname}
                        </Text>
                        <Text style={styles.itemDateText}>
                          {data.publishedTime
                            ? data.publishedTime.slice(0, 10)
                            : null}
                        </Text>
                      </View>
                      <Text
                        style={{
                          ...styles.itemTitleText,
                          color: data.isRead ? '#BEBEBE' : '#3C3C3C',
                        }}>
                        {data.title}
                      </Text>
                      <Text
                        style={{
                          ...styles.itemBodyText,
                          color: data.isRead ? '#BEBEBE' : '#828282',
                        }}>
                        {data.preview}
                      </Text>
                    </View>
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
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    backgroundColor: '#FFF',
  },
  itemTextView: {
    paddingLeft: 15,
    paddingRight: 42,
    width: '100%',
    top: -4,
  },
  itemAuthorText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    includeFontPadding: false,
    marginBottom: 3,
  },
  itemDateText: {
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Light',
    fontSize: 12,
    includeFontPadding: false,
  },
  itemTitleText: {
    color: '#3C3C3C',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    marginBottom: 4,
    includeFontPadding: false,
  },
  itemBodyText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    includeFontPadding: false,
  },
});

export default ReaderMailSearch;
