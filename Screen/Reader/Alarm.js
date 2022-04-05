/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
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
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {MessageAPI} from '../../API/MessageAPI';
import FastImage from 'react-native-fast-image';

import BackMail2 from '../../assets/images/BackMail2.png';
import DefaultProfile from '../../assets/images/DefaultProfile.png';
import NoMessage from '../../assets/images/NoMessage.png';
const STATUSBAR_HEIGHT = 48;

const Alarm = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  //refreshing 기능
  const [refreshingMessage, setRefreshingMessage] = useState(false);
  const {isLoading: messageLoading, data: messageData} = useQuery(
    ['Message'],
    MessageAPI.getMessageList,
  );

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressMessageItem = data => {
    navigation.navigate('ReaderStacks', {
      screen: 'Message',
      params: {partnerId: data.item.message.partnerId},
    });
  };

  const onRefreshMessage = async () => {
    setRefreshingMessage(true);
    await queryClient.refetchQueries(['Message']);
    setRefreshingMessage(false);
  };

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'You clicked Alarm Test!!!!',
      message: 'This is Test!',
    });
  };

  const renderMessageItem = data => (
    <TouchableOpacity onPress={e => onPressMessageItem(data)}>
      <View style={styles.itemView}>
        <View style={styles.itemTextView}>
          {/* <View style={styles.itemNewView} /> */}
          <FastImage
            style={{
              position: 'absolute',
              width: 42,
              height: 42,
              borderRadius: 90,
            }}
            source={
              data.item.partnerImgUrl === '' || !data.item.partnerImgUrl
                ? DefaultProfile
                : {uri: data.item.partnerImgUrl}
            }
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.itemAuthorText}>
              {data.item.partnerNickname ? data.item.partnerNickname : ''}
            </Text>
            <Text style={styles.itemDateText}>
              {data.item.message.time
                ? data.item.message.time.slice(0, 10)
                : ''}
            </Text>
          </View>
          <Text style={styles.itemBodyText} numberOfLines={2}>
            {data.item.message.text ? data.item.message.text : ''}
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
          <View style={{position: 'absolute', left: 24, width: 20, height: 20}}>
            <FastImage style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>쪽지함</Text>
      </View>
      {messageData && messageData.length ? (
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
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={refreshingMessage}
              onRefresh={onRefreshMessage}
              style={styles.refresh}
              tintColor="#4562F1"
            />
          }>
          <View
            style={{
              flex: 1,
              paddingTop: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FastImage style={{width: 190, height: 215}} source={NoMessage} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 6,
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingBottom: 103 - 23.78,
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
