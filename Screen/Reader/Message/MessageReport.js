/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

import AuthorProfileImage from '../../../assets/images/AuthorProfileImage.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
const STATUSBAR_HEIGHT = 48;

const MessageReport = () => {
  const [alarmData, setAlarmData] = useState(true);
  const [alarmSelect, setAlarmSelect] = useState(true);
  const navigation = useNavigation();

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
                금전 요구
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.headerText}>신고하기</Text>
        </View>
      </View>

      {/* mainHeader */}
      <View style={styles.bodyHeader}>
        <View style={{paddingLeft: 21, paddingBottom: 17 + 25 - 27}}>
          <Text style={styles.bodyHeaderText}>
            해당 사용자를 신고하시겠습니까?
          </Text>
          <Text style={styles.bodyHeaderText}>
            사용자를 신고하는 이유를 선택해주세요. (중복가능)
          </Text>
        </View>
      </View>

      {/* body */}
      <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
        <View style={styles.ItemView}>
          <Text>금전요구</Text>
        </View>
      </View>
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
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
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
    height: 65,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  itemView: {
    height: 10,
    width: '100%',
    backgroundColor: 'red',
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

export default MessageReport;
