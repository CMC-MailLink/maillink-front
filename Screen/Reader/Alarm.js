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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import AuthorProfileImage from '../../assets/images/AuthorProfileImage.png';
import BackMail2 from '../../assets/images/BackMail2.png';
const STATUSBAR_HEIGHT = 48;

const Alarm = () => {
  const [alarmData, setAlarmData] = useState(true);
  const [alarmSelect, setAlarmSelect] = useState(true);
  const navigation = useNavigation();

  const [alarm, setAlarm] = useState([
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
  const [message, setMessage] = useState([
    {
      key: '0',
      sender: '이작가',
      messageContext: '저도 감사했습니다~',
      date: '21. 02. 10',
    },
    {
      key: '1',
      sender: '덩이',
      messageContext: '안녕하세요~',
      date: '21. 02. 11',
    },
    {
      key: '2',
      sender: '동구리',
      messageContext: '넵 맞습니다!',
      date: '21. 02. 12',
    },
    {
      key: '3',
      sender: '비비',
      messageContext: '이부분에서는 저렇게 생각했는데 ...',
      date: '21. 02. 13',
    },
  ]);
  //refreshing 기능
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
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
    navigation.navigate('ReaderStacks', {
      screen: 'Message',
      params: {...data},
    });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'You clicked Alarm Test!!!!',
      message: 'This is Test!',
    });
  };

  const renderItem = (data, rowMap) => (
    <TouchableOpacity
      disabled={alarmSelect}
      onPress={e => onPressMessageItem(data)}>
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
              <Text
                style={{
                  fontFamily: 'NotoSansKR-Bold',
                }}>
                {data.item.author ? data.item.author : data.item.sender}&nbsp;
              </Text>
              <Text>
                {data.item.newpost ? data.item.newpost : data.item.subscribe}
              </Text>
            </Text>
            <Text style={styles.itemDateText}>{data.item.date}</Text>
          </View>
          <Text style={styles.itemBodyText}>
            {data.item.messageContext}
            {data.item.newpost ? data.item.title : data.item.context}
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
      <TouchableOpacity onPress={handleNotification}>
        <View>
          <Text>Alarm Test</Text>
        </View>
      </TouchableOpacity>

      {/* mainHeader */}
      <View style={styles.bodyHeader}>
        <View
          style={{
            width: 241,
            flexDirection: 'row',
            justifyContent: 'space-between',
            left: 76,
          }}>
          <View style={alarmSelect ? styles.bodyHeaderBorder : null}>
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
          <View style={alarmSelect ? null : styles.bodyHeaderBorder}>
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
      {alarmData ? (
        <FlatList
          style={styles.bodyContainer}
          data={alarmSelect ? alarm : message}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              style={styles.refresh}
              tintColor="#4562F1"
            />
          }
          //keyExtractor={item => item.id}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            flex: 1,
          }}
        />
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
    fontFamily: 'NotoSansKR-Regular',
    color: '#3C3C3C',
    fontSize: 14,
    includeFontPadding: false,
  },
  itemDateText: {
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Light',
    fontSize: 12,
    includeFontPadding: false,
  },
  itemBodyText: {
    color: '#828282',
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    marginTop: 3,
    includeFontPadding: false,
  },
});

export default Alarm;
