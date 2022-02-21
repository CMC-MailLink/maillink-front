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
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useNavigation} from '@react-navigation/native';

import SubscribeMail from '../../assets/images/SubscribeMail.png';
import SendMail from '../../assets/images/SendMail.png';
import StarMail from '../../assets/images/StarMail.png';
import AuthorMail from '../../assets/images/AuthorMail.png';
import ReaderMail from '../../assets/images/ReaderMail.png';

const STATUSBAR_HEIGHT = 48;

const MailBody = () => {
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
        : navigation.navigate('Stacks', {
            screen: 'Reading',
            params: {...data},
          })
      : navigation.navigate('Stacks', {
          screen: 'Reading',
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
          source={AuthorMail}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: '#4562F1',
              fontFamily: 'NotoSansKR-Bold',
              fontSize: 16,
              left: 93,
            }}>
            {data.item.author}
          </Text>
          <Text
            style={{
              position: 'absolute',
              color: '#BEBEBE',
              fontFamily: 'NotoSansKR-Thin',
              fontSize: 12,
              right: 20,
            }}>
            {data.item.date}
          </Text>
        </View>
        <Text
          style={{
            color: '#000',
            fontFamily: 'NotoSansKR-Bold',
            fontSize: 14,
            left: 93,
            marginBottom: 5,
          }}>
          {data.item.title}
        </Text>
        <Text
          style={{
            color: '#828282',
            fontFamily: 'NotoSansKR-Thin',
            fontSize: 14,
            left: 93,
            width: 230,
          }}>
          {data.item.body}
        </Text>
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

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 300,
          width: '100%',
          backgroundColor: '#4562F1',
          position: 'absolute',
        }}></View>
      <ScrollView
        stickyHeaderIndices={[2]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            backgroundColor: 'red',
            height: -300,
            position: 'absolute',
            top: 300,
            left: 0,
            right: 0,
          }}
        />
        <View style={styles.header}>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              right: 30,
              width: 166,
              height: 178,
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
              <Text
                style={{
                  fontFamily: 'NotoSansKR-Bold',
                  ...styles.headerText,
                }}>
                영이&nbsp;
              </Text>
              <Text
                style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
                님,{' '}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{fontFamily: 'NotoSansKR-Bold', ...styles.headerText}}>
                0&nbsp;
              </Text>
              <Text
                style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
                개의 메일이
              </Text>
            </View>
            <Text
              style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
              도착했습니다.
            </Text>
          </View>
        </View>
        <View style={styles.bodyHeader}>
          <View
            style={{
              width: 111.5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              left: 20.5,
            }}>
            <View style={mailSelect ? styles.bodyHeaderBorder : null}>
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
            <View style={mailSelect ? null : styles.bodyHeaderBorder}>
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
              position: 'absolute',
              width: 92,
              flexDirection: 'row',
              justifyContent: 'space-between',
              right: 19,
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
            <Text style={{...styles.bodyHeaderTextOrder, color: '#BEBEBE'}}>
              •
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
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              flex: 1,
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 261 - STATUSBAR_HEIGHT - 35,
    backgroundColor: '#4562F1',
  },
  headerText: {
    fontSize: 25,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    // paddingBottom: 103 - 23.78,
    paddingBottom: 84.5,
  },
  bodyHeader: {
    height: 41.63,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#BEBEBE',
    paddingBottom: 8,
  },
  bodyHeaderBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#4562F1',
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    paddingBottom: 8,
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
});

export default MailBody;
