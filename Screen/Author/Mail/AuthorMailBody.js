/* eslint-disable react-native/no-inline-styles */
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
  LogBox,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useNavigation} from '@react-navigation/native';

import WriteMail from '../../../assets/images/WriteMail.png';
import SendMail from '../../../assets/images/SendMail.png';
import StarMail from '../../../assets/images/StarMail.png';
import AuthorProfileImage from '../../../assets/images/AuthorProfileImage.png';
import AuthorMail from '../../../assets/images/AuthorMail.png';

const STATUSBAR_HEIGHT = 48;

const AuthorMailBody = () => {
  const navigation = useNavigation();
  const [recentSelect, setRecentSelect] = useState(true);
  const [mailDataExist, setMailDataExist] = useState(true);
  const [mail, setMail] = useState([
    {
      key: '0',
      author: '이작가',
      title: '청춘예찬2',
      body: '피가 광야에서 이는 위하여 없으면, 풍부하게 심장의 영락과 곳으로 것이다. 끝까지 목숨을 청춘 거선의',
      date: '21. 02. 13',
    },
    {
      key: '1',
      author: '김작가',
      title: '청춘예찬1',
      body: '그것은 장식하는 발휘하기 싶이 그들의 때까지 피어나는 원질이 쓸쓸하랴? 일월과 따뜻한 꾸며 열락의',
      date: '21. 02. 12',
    },
    {
      key: '2',
      author: '이작가',
      title: '청춘예찬0',
      body: '그들은 광야에서 얼마나 무엇을 때문이다. 인생을 것은 같으며, 것이다. 발휘하기 굳세게 인생의 설산에',
      date: '21. 02. 11',
    },
    {
      key: '3',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
    },
    {
      key: '4',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
    },
    {
      key: '5',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
    },
    {
      key: '6',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
    },
  ]);

  const onPressRecent = () => {
    setRecentSelect(true);
  };
  const onPressOld = () => {
    setRecentSelect(false);
  };
  const onPressMailItem = (rowMap, data) => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorReading',
      params: {...data},
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    setMail(data =>
      data.slice().sort(function (a, b) {
        if (a.date >= b.date) {
          return recentSelect ? -1 : 1;
        } else if (a.date < b.date) {
          return recentSelect ? 1 : -1;
        }
      }),
    );
  }, [recentSelect]);

  const renderItem = (data, rowMap, rowKey) => (
    <TouchableWithoutFeedback onPress={e => onPressMailItem(rowMap, data)}>
      <View
        style={{
          height: 100,
          backgroundColor: '#FFF',
          paddingTop: 12,
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            position: 'absolute',
            color: '#BEBEBE',
            fontFamily: 'NotoSansKR-Thin',
            fontSize: 12,
            right: 20,
            top: 16,
          }}>
          {data.item.date}
        </Text>
        <Text
          style={{
            color: '#3C3C3C',
            fontFamily: 'NotoSansKR-Bold',
            fontSize: 16,
            left: 20,
            marginBottom: 8,
          }}>
          {data.item.title}
        </Text>
        <Text
          style={{
            color: '#828282',
            fontFamily: 'NotoSansKR-Thin',
            fontSize: 14,
            left: 20,
            width: 301,
          }}>
          {data.item.body}
        </Text>
      </View>
    </TouchableWithoutFeedback>
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
        }}
      />
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
            flex: 1,
          }}
        />
        <View style={styles.header}>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              right: 32,
              width: 176,
              height: 179,
            }}
            source={AuthorMail}
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
                덩이&nbsp;
              </Text>
              <Text
                style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
                님,{' '}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
                새 메일을
              </Text>
            </View>
            <Text
              style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
              작성해보세요.
            </Text>
          </View>
        </View>
        <View style={styles.bodyHeader}>
          <View
            style={{
              justifyContent: 'center',
              left: 20.5,
            }}>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Medium',
                fontSize: 14,
                color: '#3C3C3C',
              }}>
              메일함
            </Text>
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
              data={mail}
              renderItem={renderItem}
              disableRightSwipe={true}
              disableLeftSwipe={true}
            />
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              height: 400,
            }}>
            <Image
              style={{
                width: 261,
                height: 211,
                top: 100,
              }}
              source={WriteMail}
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
    alignItems: 'center',
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

export default AuthorMailBody;
