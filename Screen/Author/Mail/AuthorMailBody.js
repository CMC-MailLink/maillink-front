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
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import WriteMail from '../../../assets/images/WriteMail.png';
import AuthorMail from '../../../assets/images/AuthorMail.png';

const STATUSBAR_HEIGHT = 48;

const AuthorMailBody = () => {
  const navigation = useNavigation();
  const [recentSelect, setRecentSelect] = useState(true);
  const [mailDataExist, setMailDataExist] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
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

  const onPressRecent = () => {
    setRecentSelect(true);
  };

  const onPressOld = () => {
    setRecentSelect(false);
  };

  const onPressMailItem = data => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorReading',
      params: {...data},
    });
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={e => onPressMailItem(item)}>
        <View style={styles.itemView}>
          <Text style={styles.itemDateText}>{item.date}</Text>
          <Text style={styles.itemTitleText}>{item.title}</Text>
          <Text style={styles.itemBodyText}>{item.body}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderCategory = ({item}) => {
    return (
      <View style={styles.bodyHeader}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={styles.bodyHeaderText}>메일함</Text>
        </View>
        <View
          style={{
            width: 92,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onPressRecent} activeOpacity={1}>
            <Text
              style={{
                ...styles.bodyHeaderTextOrder,
                color: recentSelect ? '#3C3C3C' : '#BEBEBE',
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
                color: recentSelect ? '#BEBEBE' : '#3C3C3C',
              }}>
              오래된순
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
      <FlatList
        stickyHeaderIndices={[1]}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <View style={styles.header}>
            <Image
              style={{
                position: 'absolute',
                top: -4,
                right: 32,
                width: 176,
                height: 182,
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
                <Text style={styles.headerText}>
                  <Text
                    style={{
                      ...styles.headerText,
                      fontFamily: 'NotoSansKR-Bold',
                    }}>
                    덩이&nbsp;
                  </Text>
                  님,
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.headerText}>새 메일을</Text>
              </View>
              <Text style={styles.headerText}>작성해보세요.</Text>
            </View>
          </View>
        }
        data={[{id: '1'}]}
        renderItem={renderCategory}
        ListFooterComponent={
          <View>
            {mailDataExist ? (
              <View style={styles.bodyContainer}>
                <FlatList data={mail} renderItem={renderItem}></FlatList>
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  height: Dimensions.get('window').height - 301,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                }}>
                <Image
                  style={{
                    width: 261,
                    height: 211,
                  }}
                  source={WriteMail}
                />
              </View>
            )}
          </View>
        }></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 261 - STATUSBAR_HEIGHT - 35,
    backgroundColor: '#4562F1',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 25,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  bodyContainer: {
    height: '100%',
    paddingBottom: 150,
  },
  bodyHeader: {
    height: 41.63,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    includeFontPadding: false,
  },
  itemView: {
    height: 100,
    backgroundColor: '#FFF',
    paddingTop: 12,
    paddingBottom: 17,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  itemDateText: {
    position: 'absolute',
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Thin',
    fontSize: 12,
    right: 20,
    top: 12,
    includeFontPadding: false,
  },
  itemTitleText: {
    color: '#3C3C3C',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    marginBottom: 8,
    includeFontPadding: false,
  },
  itemBodyText: {
    color: '#828282',
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    width: 301,
    includeFontPadding: false,
  },
});

export default AuthorMailBody;
