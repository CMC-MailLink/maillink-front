import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import SubscribeMail from '../../assets/images/SubscribeMail.png';
import SendMail from '../../assets/images/SendMail.png';
import StarMail from '../../assets/images/StarMail.png';
import AuthorMail from '../../assets/images/AuthorMail.png';
import {set} from 'lodash';

const MailBody = () => {
  const [mailSelect, setMailSelect] = useState(true);
  const [mailRecentSelect, setMailRecentSelect] = useState(true);
  const [bookmarkRecentSelect, setBookmarkRecentSelect] = useState(true);
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
  ]);
  const [bookmark, setBookMark] = useState([
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
  const [rowList, setRowList] = useState([]);
  const [rowOpen, setRowOpen] = useState();
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
  const onPressMail = () => {
    rowList.lenngth ? rowList[rowOpen].closeRow() : null;
    setMailSelect(true);
  };
  const onPressSave = () => {
    rowList.lenngth ? rowList[rowOpen].closeRow() : null;
    setMailSelect(false);
  };
  const onPressRecent = () => {
    rowList.lenngth ? rowList[rowOpen].closeRow() : null;
    if (mailSelect) {
      setMailRecentSelect(true);
      setMail(data =>
        data.slice().sort(function (a, b) {
          if (a.date >= b.date) {
            return -1;
          } else if (a.date < b.date) {
            return 1;
          }
        }),
      );
    } else {
      setBookmarkRecentSelect(true);
      setBookMark(data =>
        data.slice().sort(function (a, b) {
          if (a.date >= b.date) {
            return -1;
          } else if (a.date < b.date) {
            return 1;
          }
        }),
      );
    }
  };
  const onPressOld = () => {
    rowList.lenngth ? rowList[rowOpen].closeRow() : null;
    if (mailSelect) {
      setMailRecentSelect(false);
      setMail(data =>
        data.slice().sort(function (a, b) {
          if (a.date >= b.date) {
            return 1;
          } else if (a.date < b.date) {
            return -1;
          }
        }),
      );
    } else {
      setBookmarkRecentSelect(false);
      setBookMark(data =>
        data.slice().sort(function (a, b) {
          if (a.date >= b.date) {
            return 1;
          } else if (a.date < b.date) {
            return -1;
          }
        }),
      );
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
        source={AuthorMail}
      />
      <View style={{flexDirection: 'row'}}>
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
  const onRowOpen = (rowKey, rowMap, toValue) => {
    setRowList(rowMap);
    setRowOpen(rowKey);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.bodyHeader}>
        <View
          style={{
            width: 129,
            flexDirection: 'row',
            justifyContent: 'space-between',
            left: 36,
          }}>
          <View style={mailSelect ? styles.bodyHeaderBorder : null}>
            <TouchableOpacity onPress={onPressMail}>
              <Text
                style={{
                  ...styles.bodyHeaderText,
                  color: mailSelect ? '#000000' : '#BEBEBE',
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
                color: mailSelect
                  ? mailRecentSelect
                    ? '#000000'
                    : '#BEBEBE'
                  : bookmarkRecentSelect
                  ? '#000000'
                  : '#BEBEBE',
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
                color: mailSelect
                  ? mailRecentSelect
                    ? '#BEBEBE'
                    : '#000000'
                  : bookmarkRecentSelect
                  ? '#BEBEBE'
                  : '#000000',
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
