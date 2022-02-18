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
      title: '청춘예찬2',
      date: '21. 02. 12',
    },
    {
      key: '1',
      author: '이작가',
      title: '별 헤는 밤',
      date: '21. 02. 12',
    },
    {
      key: '2',
      author: '덩이',
      title: '청춘예찬',
      date: '21. 02. 11',
    },
    {
      key: '3',
      author: '리티',
      title: '파란 하늘',
      date: '21. 02. 11',
    },
    {
      key: '4',
      author: '덩이',
      title: '파란 하늘',
      date: '21. 02. 11',
    },
    {
      key: '5',
      author: '비비',
      title: '파란 하늘',
      date: '21. 02. 11',
    },
    {
      key: '6',
      author: '비비',
      title: '파란 하늘',
      date: '21. 02. 11',
    },
    {
      key: '7',
      author: '비비',
      title: '파란 하늘',
      date: '21. 02. 11',
    },
    {
      key: '8',
      author: '비비',
      title: '파란 하늘',
      date: '21. 02. 11',
    },
  ]);

  const navigation = useNavigation();

  const renderItem = (data, rowMap) => (
    <View
      style={{
        height: 114,
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
          color: '#4562F1',
          fontFamily: 'NotoSansKR-Bold',
          fontSize: 16,
          left: 93,
        }}>
        {data.item.author}
      </Text>
      <Text
        style={{
          color: '#000',
          fontFamily: 'NotoSansKR-Bold',
          fontSize: 14,
          left: 93,
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
  );

  return (
    <View style={{flex: 1}}>
      {/* body */}
      <View style={styles.bodyHeader}>
        <View
          style={{
            width: 232,
            flexDirection: 'row',
            justifyContent: 'space-between',
            left: 78,
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#4562F1',
              borderBottomLength: 10,
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
        <View style={styles.bodyContainer}>
          <SwipeListView
            data={alarm}
            renderItem={renderItem}
            rightOpenValue={-150}
            stopRightSwipe={-150}
            disableRightSwipe={true}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
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
