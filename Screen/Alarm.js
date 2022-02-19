/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import SubscribeMail from '../assets/images/SubscribeMail.png';
import AuthorMail from '../assets/images/AuthorMail.png';

const STATUSBAR_HEIGHT = 48;

const Alarm = () => {
  const [alarmData, setAlarmData] = useState(true);
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
      newpost: '님을 구독했습니다.',
      subscribe: null,
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
  ]);

  const navigation = useNavigation();

  const renderItem = data => (
    <View
      style={{
        height: 71,
        backgroundColor: '#FFF',
        paddingTop: 14,
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
      }}>
      <Image
        style={{position: 'absolute', width: 42, height: 42, left: 36, top: 14}}
        source={AuthorMail}
      />
      <Text
        style={{
          color: '#3C3C3C',
          fontSize: 14,
          left: 93,
        }}>
        <Text
          style={{
            fontFamily: 'NotoSansKR-Bold',
          }}>
          {data.item.author}&nbsp;
        </Text>
        <Text
          style={{
            fontFamily: 'NotoSansKR-Regular',
          }}>
          {data.item.newpost ? data.item.newpost : data.item.subscribe}
        </Text>
      </Text>
      <Text
        style={{
          paddingTop: 3,
          color: '#828282',
          fontFamily: 'NotoSansKR-Regular',
          fontSize: 14,
          left: 93,
        }}>
        {data.item.newpost ? data.item.title : data.item.context}
      </Text>
      <Text
        style={{
          position: 'absolute',
          color: '#BEBEBE',
          fontFamily: 'NotoSansKR-Light',
          fontSize: 12,
          right: 20,
        }}>
        {data.item.date}
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      {/* body */}
      <View style={styles.bodyHeader}>
        <View
          style={{
            width: 273,
            flexDirection: 'row',
            justifyContent: 'space-between',
            left: 36,
          }}>
          <View
            style={{
              width: 123,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#4562F1',
              borderBottomLength: 100,
            }}>
            <Text style={{...styles.bodyHeaderText, color: '#000000'}}>
              알림함
            </Text>
          </View>
          <View>
            <Text style={styles.bodyHeaderText}>쪽지함</Text>
          </View>
        </View>
      </View>
      {alarmData ? (
        <FlatList
          style={styles.bodyContainer}
          data={alarm}
          renderItem={renderItem}
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
  header: {
    height: 261 - STATUSBAR_HEIGHT,
    backgroundColor: '#4562F1',
  },
  headerText: {
    fontSize: 25,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  searchButton: {
    position: 'absolute',
    top: 261 - STATUSBAR_HEIGHT - 22,
    left: 326,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 23,
  },
  searchView: {
    width: 44,
    height: 44,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    color: '#BEBEBE',
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
  backTextWhite: {
    color: '#FFF',
  },
});

export default Alarm;
