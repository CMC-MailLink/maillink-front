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
import LogoMail from '../assets/images/LogoMail.png';
import AlarmMail from '../assets/images/AlarmMail.png';
import BookMail from '../assets/images/BookMail.png';
import SearchMail from '../assets/images/SearchMail.png';
import SubscribeMail from '../assets/images/SubscribeMail.png';
import SendMail from '../assets/images/SendMail.png';
import StarMail from '../assets/images/StarMail.png';
import AuthorMail from '../assets/images/AuthorMail.png';

const STATUSBAR_HEIGHT = 48;

const Mail = () => {
  const [mailData, setMailData] = useState(true);
  const [mail, setMail] = useState([
    {
      key: '0',
      author: '이작가',
      title: '청춘예찬2',
      body: '피가 광야에서 이는 위하여 없으면, 풍부 하게 심장의 영락과 곳으로 것이다. 끝',
      date: '21. 02. 12',
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
      date: '21. 02. 11',
    },
  ]);

  const navigation = useNavigation();
  const goToAlarm = () => {
    navigation.navigate('Stack', {
      screen: 'Alarm',
    });
  };
  const pressSearch = () => {
    //search
  };
  const bookmarkRow = (rowMap, key) => {
    //즐겨찾기
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
  };
  const sendRow = (rowMap, key) => {
    //쪽지보내기
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
  };

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
        source={AuthorMail}></Image>
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

  return (
    <View style={{flex: 1}}>
      {/* header */}
      <View style={styles.header}>
        <Image
          style={{
            position: 'absolute',
            top: 56.25 - STATUSBAR_HEIGHT,
            left: 20,
            width: 101.94,
            height: 22.5,
          }}
          source={LogoMail}
        />
        <Image
          style={{
            position: 'absolute',
            top: 45 - STATUSBAR_HEIGHT,
            left: 133,
            width: 269,
            height: 283,
          }}
          source={BookMail}
        />
        <TouchableWithoutFeedback onPress={goToAlarm}>
          <Image
            style={{
              position: 'absolute',
              top: 56.24 - STATUSBAR_HEIGHT,
              left: 349,
              width: 19,
              height: 22.51,
            }}
            source={AlarmMail}
          />
        </TouchableWithoutFeedback>
        <View
          style={{position: 'absolute', top: 113 - STATUSBAR_HEIGHT, left: 20}}>
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
            <Text style={{fontFamily: 'NotoSansKR-Bold', ...styles.headerText}}>
              0&nbsp;
            </Text>
            <Text
              style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
              개의 메일이
            </Text>
          </View>
          <Text style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
            도착했습니다.
          </Text>
        </View>
      </View>
      {/* body */}
      <View style={styles.bodyHeader}>
        <View
          style={{
            width: 129,
            flexDirection: 'row',
            justifyContent: 'space-between',
            left: 36,
          }}>
          <View style={{borderBottomWidth: 2, borderBottomColor: '#4562F1'}}>
            <Text style={{...styles.bodyHeaderText, color: '#000000'}}>
              메일함
            </Text>
          </View>
          <View>
            <Text style={styles.bodyHeaderText}>저장함</Text>
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
          <Text style={{...styles.bodyHeaderTextOrder, color: '#000000'}}>
            최신순
          </Text>
          <Text style={styles.bodyHeaderTextOrder}>•</Text>
          <Text style={styles.bodyHeaderTextOrder}>오래된순</Text>
        </View>
      </View>
      {mailData ? (
        <View style={styles.bodyContainer}>
          <SwipeListView
            data={mail}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
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
      {/* Search */}
      <TouchableOpacity
        onPress={pressSearch}
        style={styles.searchButton}
        activeOpacity={1}>
        <View style={styles.searchView}>
          <Image
            style={{
              width: 22,
              height: 22,
            }}
            source={SearchMail}
          />
        </View>
      </TouchableOpacity>
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
    height: 62.01,
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

export default Mail;
