import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const AuthorProfileMail = () => {
  const [recentSelect, setRecentSelect] = useState(true);
  const onPressRecent = () => {
    setRecentSelect(true);
  };
  const onPressOld = () => {
    setRecentSelect(false);
  };
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

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          ...styles.mailItemView,
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: 1,
          paddingHorizontal: 20,
          paddingVertical: 13,
          marginTop: 0,
        }}>
        <Text style={styles.mailItemTitle}>{item.title}</Text>
        <Text style={styles.mailItemBody}>{item.body}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.mailItemDate}>{item.date}</Text>
          <Text style={styles.mailItemOpen}>공개</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 150}}>
      <View style={styles.refView}>
        <Text style={styles.refText}>대표글</Text>
        <View style={styles.mailItemView}>
          <Text style={styles.mailItemTitle}>청춘예찬2</Text>
          <Text style={styles.mailItemBody}>
            피가 광야에서 이는 위하여 없으면, 풍부하게 심장의 영락과 곳으로
            것이다. 끝까지 목숨을 청춘 거선의 거선의 무엇을 얼리는...
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.mailItemDate}>21. 02. 12</Text>
            <Text style={styles.mailItemOpen}>공개</Text>
          </View>
        </View>
      </View>
      <View style={styles.publishView}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.refText}>발행글</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.publishText}>
            총&nbsp;<Text style={{color: '#3C3C3C'}}>{mail.length}</Text>편
          </Text>
          <View
            style={{
              width: 92,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
              position: 'absolute',
              right: 0,
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
              ・
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
      </View>
      <FlatList
        data={mail}
        renderItem={renderItem}
        keyExtractor={item => item.key}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  refView: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#F8F8F8',
  },
  refText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    color: '#3C3C3C',
  },
  mailItemView: {marginTop: 15},
  mailItemTitle: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
    marginBottom: 7,
  },
  mailItemBody: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#828282',
    paddingRight: 36,
    marginBottom: 7,
  },
  mailItemDate: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#BEBEBE',
  },
  mailItemOpen: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#4562F1',
    position: 'absolute',
    right: 36,
  },
  publishView: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  publishText: {
    marginTop: 12,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
  },
});

export default AuthorProfileMail;
