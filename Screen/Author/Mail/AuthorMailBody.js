import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthorAPI} from '../../../API/AuthorAPI';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import FastImage from 'react-native-fast-image';

import WriteMail from '../../../assets/images/WriteMail.png';
import AuthorMail from '../../../assets/images/AuthorMail.png';
import MailRefresh from '../../../assets/images/MailRefresh.png';

const STATUSBAR_HEIGHT = 48;
const refreshingHeight = 100;

const AuthorMailBody = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [memberInfo, setMemberInfo] = useState();
  const [recentSelect, setRecentSelect] = useState(true);
  const [mail, setMail] = useState([{key: 'category'}]); //메일 데이터
  const [refreshing, setRefreshing] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const animation = useRef(new Animated.Value(0)).current; //스크롤 애니메이션

  const {isLoading: mailLoading, data: mailData} = useQuery(
    ['AuthorMail'],
    AuthorAPI.writerGetPublishing,
  );

  const {isLoading: authorInfoLoading, data: authorInfoData} = useQuery(
    ['AuthorInfo'],
    AuthorAPI.memberInfo,
  );

  useEffect(() => {
    if (authorInfoData) {
      setMemberInfo(authorInfoData);
    }
  }, [authorInfoData]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [animation]);

  useEffect(() => {
    if (mailData) {
      var temp = mailData.mailList.slice().sort(function (a, b) {
        if (a.publishedTime >= b.publishedTime) {
          return recentSelect ? -1 : 1;
        } else if (a.publishedTime < b.publishedTime) {
          return recentSelect ? 1 : -1;
        }
      });
      setMail([...temp]);
    }
  }, [mailData, recentSelect]);

  // useEffect(() => {
  //   setMail(data =>
  //     data.slice().sort(function (a, b) {
  //       if (a.publishedTime >= b.publishedTime) {
  //         return recentSelect ? -1 : 1;
  //       } else if (a.publishedTime < b.publishedTime) {
  //         return recentSelect ? 1 : -1;
  //       }
  //     }),
  //   );
  // }, [recentSelect]);

  //새로고침 스크롤
  function onScroll(event) {
    const {nativeEvent} = event;
    const {contentOffset} = nativeEvent;
    const {y} = contentOffset;
    setOffsetY(y);
  }

  //새로고침 이벤트
  const onRelease = async () => {
    if (offsetY <= -refreshingHeight && !refreshing) {
      setRefreshing(true);
      await queryClient.refetchQueries(['AuthorMail']);
      setRefreshing(false);
    }
  };

  const onPressRecent = () => {
    setRecentSelect(true);
  };

  const onPressOld = () => {
    setRecentSelect(false);
  };

  const onPressMailItem = data => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorReading',
      params: {data, memberInfo},
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={e => onPressMailItem(item)}>
        <View style={styles.itemView}>
          <Text style={styles.itemDateText}>
            {item.publishedTime ? item.publishedTime.slice(0, 10) : ''}
          </Text>
          <Text style={styles.itemTitleText}>{item.title}</Text>
          <Text style={styles.itemBodyText}>{item.preView}</Text>
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
          <Text style={styles.bodyHeaderText}>보낸 메일함</Text>
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
      <View style={{...styles.refreshView, height: refreshingHeight - offsetY}}>
        <View
          style={{
            marginTop: -offsetY / 2 > 0 ? -offsetY / 2 : 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Animated.Image
            style={{
              width: 14.67,
              height: 10.67,
              marginRight: 5,
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}
            source={MailRefresh}
          />
          <Text style={{...styles.refreshText}}>새 메일과 연결되는 중</Text>
        </View>
      </View>
      <FlatList
        onScroll={onScroll}
        onResponderRelease={onRelease}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <FastImage
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
                    {memberInfo ? memberInfo.nickName : null}&nbsp;
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
            {mail ? (
              mail.length ? (
                <View style={styles.bodyContainer}>
                  <FlatList data={mail} renderItem={renderItem} />
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
                  <FastImage
                    style={{
                      width: 261,
                      height: 211,
                    }}
                    source={WriteMail}
                  />
                </View>
              )
            ) : (
              <View
                style={{
                  width: '100%',
                  height: Dimensions.get('window').height - 301,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                }}>
                <FastImage
                  style={{
                    width: 261,
                    height: 211,
                  }}
                  source={WriteMail}
                />
              </View>
            )}
          </View>
        }
      />
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
    fontSize: 24,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  bodyContainer: {
    height: '100%',
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
    width: '100%',
    backgroundColor: '#FFF',
    paddingVertical: 15,
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
  refreshView: {
    backgroundColor: '#4562F1',
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  refreshText: {
    color: '#fff',
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
  },
});

export default AuthorMailBody;
