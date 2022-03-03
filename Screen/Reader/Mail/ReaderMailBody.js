import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
  Dimensions,
  FlatList,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useNavigation} from '@react-navigation/native';

import SubscribeMail from '../../../assets/images/SubscribeMail.png';
import SendMail from '../../../assets/images/SendMail.png';
import StarMail from '../../../assets/images/StarMail.png';
import AuthorProfileImage from '../../../assets/images/AuthorProfileImage.png';
import ReaderMail from '../../../assets/images/ReaderMail.png';

const STATUSBAR_HEIGHT = 48;

const ReaderMailBody = () => {
  const navigation = useNavigation();
  const [mailSelect, setMailSelect] = useState(true);
  const [recentSelect, setRecentSelect] = useState(true);
  const [mailDataExist, setMailDataExist] = useState(true);
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
    {
      key: '4',
      author: '최작가',
      title: '파란 하늘',
      body: '피가 광야에서 이는 위하여 없으면, 풍부 하게 심장의 영락과 곳으로 것이다. 끝',
      date: '21. 02. 10',
    },
    {
      key: '5',
      author: '최작가',
      title: '파란 하늘',
      body: '피가 광야에서 이는 위하여 없으면, 풍부 하게 심장의 영락과 곳으로 것이다. 끝',
      date: '21. 02. 10',
    },
    {
      key: '6',
      author: '최작가',
      title: '파란 하늘',
      body: '피가 광야에서 이는 위하여 없으면, 풍부 하게 심장의 영락과 곳으로 것이다. 끝',
      date: '21. 02. 10',
    },
  ]);
  const [bookmark, setBookmark] = useState([
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
  ]);
  const [rowList, setRowList] = useState(null);
  const [rowOpen, setRowOpen] = useState(null);
  const bookmarkRow = (rowMap, key) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
  };
  const sendRow = (rowMap, key) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
  };
  const onPressMail = () => {
    rowList ? (rowList[rowOpen] ? rowList[rowOpen].closeRow() : null) : null;
    setMailSelect(true);
  };
  const onPressSave = () => {
    rowList ? (rowList[rowOpen] ? rowList[rowOpen].closeRow() : null) : null;
    setMailSelect(false);
  };
  const onPressRecent = () => {
    rowList ? (rowList[rowOpen] ? rowList[rowOpen].closeRow() : null) : null;
    setRecentSelect(true);
  };
  const onPressOld = () => {
    rowList ? (rowList[rowOpen] ? rowList[rowOpen].closeRow() : null) : null;
    setRecentSelect(false);
  };
  const onRowOpen = (rowKey, rowMap, toValue) => {
    setRowList(rowMap);
    setRowOpen(rowKey);
  };
  const onRowClose = (rowKey, rowMap, toValue) => {
    setRowOpen(null);
  };
  const onPressMailItem = (rowMap, data) => {
    rowList
      ? rowList[rowOpen]
        ? null
        : navigation.navigate('ReaderStacks', {
            screen: 'ReaderReading',
            params: {...data},
          })
      : navigation.navigate('ReaderStacks', {
          screen: 'ReaderReading',
          params: {...data},
        });
  };

  useEffect(() => {
    if (mailSelect) {
      setMail(data =>
        data.slice().sort(function (a, b) {
          if (a.date >= b.date) {
            return recentSelect ? -1 : 1;
          } else if (a.date < b.date) {
            return recentSelect ? 1 : -1;
          }
        }),
      );
    } else {
      setBookmark(data =>
        data.slice().sort(function (a, b) {
          if (a.date >= b.date) {
            return recentSelect ? -1 : 1;
          } else if (a.date < b.date) {
            return recentSelect ? 1 : -1;
          }
        }),
      );
    }
  }, [recentSelect, mailSelect]);

  const renderItem = (data, rowMap, rowKey) => (
    <TouchableWithoutFeedback onPress={e => onPressMailItem(rowMap, data)}>
      <View style={styles.itemView}>
        <View style={styles.itemTextView}>
          <View style={styles.itemNewView}></View>
          <Image
            style={{
              position: 'absolute',
              width: 42,
              height: 42,
            }}
            source={AuthorProfileImage}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.itemAuthorText}>{data.item.author}</Text>
            <Text style={styles.itemDateText}>{data.item.date}</Text>
          </View>
          <Text style={styles.itemTitleText}>{data.item.title}</Text>
          <Text style={styles.itemBodyText}>{data.item.body}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => bookmarkRow(rowMap, data.item.key)}>
        <Image style={{width: 21, height: 20.5}} source={StarMail} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => sendRow(rowMap, data.item.key)}>
        <Image style={{width: 21.54, height: 23.82}} source={SendMail} />
      </TouchableOpacity>
    </View>
  );

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderCategory = ({item}) => {
    return (
      <View style={styles.bodyHeader}>
        <View
          style={{
            width: 111.5,
            height: 41.63,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={
              mailSelect ? styles.bodyHeaderBorder : styles.bodyHeaderBorderNone
            }>
            <TouchableOpacity onPress={onPressMail}>
              <Text
                style={{
                  ...styles.bodyHeaderText,
                  color: mailSelect ? '#3C3C3C' : '#BEBEBE',
                }}>
                메일함
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              mailSelect ? styles.bodyHeaderBorderNone : styles.bodyHeaderBorder
            }>
            <TouchableOpacity onPress={onPressSave}>
              <Text
                style={{
                  ...styles.bodyHeaderText,
                  color: mailSelect ? '#BEBEBE' : '#000000',
                }}>
                저장함
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: 92,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onPressRecent} activeOpacity={1}>
            <Text
              style={{
                ...styles.bodyHeaderTextOrder,
                color: recentSelect ? '#000000' : '#BEBEBE',
              }}>
              최신순
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              ...styles.bodyHeaderTextOrder,
              color: '#BEBEBE',
            }}>
            ・
          </Text>
          <TouchableOpacity onPress={onPressOld} activeOpacity={1}>
            <Text
              style={{
                ...styles.bodyHeaderTextOrder,
                color: recentSelect ? '#BEBEBE' : '#000000',
              }}>
              오래된순
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 300,
          width: '100%',
          backgroundColor: '#4562F1',
          position: 'absolute',
        }}></View>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        stickyHeaderIndices={[1]}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Image
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 32,
                  width: 164,
                  height: 179,
                }}
                source={ReaderMail}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 113 - STATUSBAR_HEIGHT - 35,
                  left: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.headerText}>
                    <Text
                      style={{
                        ...styles.headerText,
                        fontFamily: 'NotoSansKR-Bold',
                      }}>
                      영이&nbsp;
                    </Text>
                    님,
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.headerText}>
                    <Text
                      style={{
                        ...styles.headerText,
                        fontFamily: 'NotoSansKR-Bold',
                      }}>
                      0&nbsp;
                    </Text>
                    개의 메일이
                  </Text>
                </View>
                <Text style={styles.headerText}>도착했습니다.</Text>
              </View>
            </View>
          </View>
        }
        data={[{id: '1'}]}
        renderItem={renderCategory}
        ListFooterComponent={
          <View>
            {mailDataExist ? (
              <View style={styles.bodyContainer}>
                <SwipeListView
                  data={mailSelect ? mail : bookmark}
                  renderItem={renderItem}
                  renderHiddenItem={renderHiddenItem}
                  rightOpenValue={-150}
                  stopRightSwipe={-150}
                  disableRightSwipe={true}
                  onRowOpen={onRowOpen}
                  onRowClose={onRowClose}
                />
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  height: Dimensions.get('window').height - 301,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                }}>
                <Image
                  style={{
                    width: 261,
                    height: 211,
                  }}
                  source={SubscribeMail}
                />
              </View>
            )}
          </View>
        }></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 261 - STATUSBAR_HEIGHT - 35,
    backgroundColor: '#4562F1',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 25,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  bodyContainer: {
    height: '100%',
    paddingBottom: 150,
  },
  bodyHeader: {
    height: 41.63,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  bodyHeaderBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#4562F1',
    height: 41.63,
    justifyContent: 'center',
  },
  bodyHeaderBorderNone: {
    height: 41.63,
    justifyContent: 'center',
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    includeFontPadding: false,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#F5F8FF',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#E8ECFF',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
  itemView: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 10,
    paddingLeft: 36,
    paddingRight: 20,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    backgroundColor: '#FFF',
  },
  itemTextView: {
    width: '100%',
    paddingLeft: 57,
  },
  itemAuthorText: {
    color: '#4562F1',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    includeFontPadding: false,
    marginBottom: 2,
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
    color: '#828282',
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    width: 230,
    includeFontPadding: false,
  },
  itemNewView: {
    position: 'absolute',
    top: 0,
    left: -16,
    width: 10,
    height: 10,
    backgroundColor: '#FF9B9B',
    borderRadius: 90,
  },
});

export default ReaderMailBody;
