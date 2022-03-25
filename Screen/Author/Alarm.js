/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StatusBar,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {MessageAPI} from '../../API/MessageAPI';

import AuthorProfileImage from '../../assets/images/AuthorProfileImage.png';
import BackMail2 from '../../assets/images/BackMail2.png';
const STATUSBAR_HEIGHT = 48;

const Alarm = () => {
  const [alarmSelect, setAlarmSelect] = useState(true);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  //refreshing 기능
  const [refreshingMessage, setRefreshingMessage] = useState(false);
  const [refreshingAlarm, setRefreshingAlarm] = useState(false);

  const [alarmData, setAlarmData] = useState([
    {
      key: '0',
      author: '이작가',
      date: '21. 02. 12',
      newpost: '님의 새 글입니다.',
      subscribe: null,
      title: '청춘예찬2',
      context: null,
    },
    {
      key: '1',
      author: '이작가',
      date: '21. 02. 12',
      newpost: null,
      subscribe: '님을 구독했습니다.',
      title: '청춘예찬2',
      context: '당신과 연결되어 기쁩니다.',
    },
    {
      key: '2',
      author: '덩이',
      date: '21. 02. 12',
      newpost: '님의 새 글입니다.',
      subscribe: null,
      title: '자화상2',
      context: null,
    },
    {
      key: '3',
      author: '리티',
      date: '21. 02. 12',
      newpost: '님의 새 글입니다.',
      subscribe: null,
      title: '날개 1-2',
      context: null,
    },
    {
      key: '4',
      author: '덩이',
      date: '21. 02. 12',
      newpost: null,
      subscribe: '님을 구독했습니다.',
      title: null,
      context: '당신과 연결되어 기쁩니다',
    },
    {
      key: '5',
      author: '비비',
      date: '21. 02. 12',
      newpost: '님의 새 글입니다.',
      subscribe: null,
      title: '봄',
      context: null,
    },
    {
      key: '6',
      author: '비비',
      date: '21. 02. 12',
      newpost: '님의 새 글입니다.',
      subscribe: null,
      title: '봄',
      context: null,
    },
    {
      key: '7',
      author: '비비',
      date: '21. 02. 12',
      newpost: '님의 새 글입니다.',
      subscribe: null,
      title: '봄',
      context: null,
    },
    {
      key: '8',
      author: '비비',
      date: '21. 02. 12',
      newpost: '님의 새 글입니다.',
      subscribe: null,
      title: '봄',
      context: null,
    },
  ]);
  const {isLoading: messageLoading, data: messageData} = useQuery(
    ['Message'],
    MessageAPI.getMessageList,
  );

  const onPressAlarm = () => {
    setAlarmSelect(true);
  };
  const onPressLetter = () => {
    setAlarmSelect(false);
  };
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressMessageItem = data => {
    navigation.navigate('AuthorStacks', {
      screen: 'Message',
      params: {partnerId: data.item.partnerId},
    });
  };

  const onPressAlarmItem = data => {};

  const onRefreshMessage = async () => {
    setRefreshingMessage(true);
    await queryClient.refetchQueries(['Message']);
    setRefreshingMessage(false);
  };

  const onRefreshAlarm = async () => {
    setRefreshingAlarm(true);
    await queryClient.refetchQueries(['Alarm']);
    setRefreshingAlarm(false);
  };

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'You clicked Alarm Test!!!!',
      message: 'This is Test!',
    });
  };

  const renderMessageItem = (data, rowMap) => (
    <TouchableOpacity onPress={e => onPressMessageItem(data)}>
      <View style={styles.itemView}>
        <View style={styles.itemTextView}>
          <View style={styles.itemNewView} />
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
            <Text style={styles.itemAuthorText}>
              {data.item.id ? data.item.id : ''}
            </Text>
            <Text style={styles.itemDateText}>
              {data.item.time ? data.item.time.slice(0, 10) : ''}
            </Text>
          </View>
          <Text style={styles.itemBodyText}>
            {data.item.text ? data.item.text.slice(0, 40) + '...' : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAlarmItem = (data, rowMap) => (
    <TouchableOpacity onPress={e => onPressAlarmItem(data)}>
      <View style={styles.itemView}>
        <View style={styles.itemTextView}>
          <View style={styles.itemNewView} />
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
            <Text style={styles.itemAuthorText}>
              {data.item.id ? data.item.id : ''}
            </Text>
            <Text style={styles.itemDateText}>
              {data.item.time ? data.item.time.slice(0, 10) : ''}
            </Text>
          </View>
          <Text style={styles.itemBodyText}>
            {data.item.text ? data.item.text : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* <TouchableOpacity onPress={handleNotification}>
        <View>
          <Text>Alarm Test</Text>
        </View>
      </TouchableOpacity> */}

      {/* mainHeader */}
      <View style={styles.bodyHeader}>
        <View
          style={{
            flex: 1,
            width: 241,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 36,
            marginRight: 36,
          }}>
          <View
            style={alarmSelect ? styles.bodyHeaderBorder : {marginLeft: 40}}>
            <TouchableOpacity onPress={onPressAlarm}>
              <Text
                style={{
                  ...styles.bodyHeaderText,
                  color: alarmSelect ? '#3C3C3C' : '#BEBEBE',
                }}>
                알림함
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={alarmSelect ? {marginRight: 40} : styles.bodyHeaderBorder}>
            <TouchableOpacity onPress={onPressLetter}>
              <Text
                style={{
                  ...styles.bodyHeaderText,
                  color: alarmSelect ? '#BEBEBE' : '#3C3C3C',
                }}>
                쪽지함
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* body */}
      {alarmSelect ? (
        alarmData && alarmData.length ? (
          <FlatList
            style={styles.bodyContainer}
            data={alarmData}
            renderItem={renderAlarmItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshingAlarm}
                onRefresh={onRefreshAlarm}
                style={styles.refresh}
                tintColor="#4562F1"
              />
            }
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Regular',
                color: '#3C3C3C',
                includeFontPadding: false,
              }}>
              알림이 없습니다.
            </Text>
          </View>
        )
      ) : messageData && messageData.length ? (
        <FlatList
          style={styles.bodyContainer}
          data={messageData}
          renderItem={renderMessageItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshingMessage}
              onRefresh={onRefreshMessage}
              style={styles.refresh}
              tintColor="#4562F1"
            />
          }
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshingMessage}
              onRefresh={onRefreshMessage}
              style={styles.refresh}
            />
          }>
          <View
            style={{
              top: 50,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Regular',
                color: '#3C3C3C',
                includeFontPadding: false,
              }}>
              메세지가 없습니다.
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 25,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  bodyHeaderBorder: {
    borderBottomWidth: 2,
    width: 123,
    borderBottomColor: '#4562F1',
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingBottom: 103 - 23.78,
  },
  bodyHeader: {
    height: 35,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#BEBEBE',
    textAlign: 'center',
    paddingBottom: 8,
    includeFontPadding: false,
  },
  itemView: {
    width: '100%',
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingLeft: 36,
    paddingRight: 20,
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
  itemTextView: {
    width: '100%',
    paddingLeft: 57,
  },
  itemAuthorText: {
    fontFamily: 'NotoSansKR-Bold',
    color: '#3C3C3C',
    fontSize: 16,
    includeFontPadding: false,
  },
  itemDateText: {
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Light',
    fontSize: 12,
    marginTop: 1,
    includeFontPadding: false,
  },
  itemBodyText: {
    color: '#828282',
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    includeFontPadding: false,
  },
});

export default Alarm;
