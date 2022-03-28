import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {useNavigation} from '@react-navigation/native';
import {ReaderAPI} from '../../../API/ReaderAPI';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import FastImage from 'react-native-fast-image';

import SubscribeMail from '../../../assets/images/SubscribeMail.png';
import NoBookMarkMail from '../../../assets/images/NoBookMarkMail.png';
import SendMail from '../../../assets/images/SendMail.png';
import StarMail from '../../../assets/images/StarMail.png';
import NoStarMail from '../../../assets/images/NoStarMail.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import ReaderMail from '../../../assets/images/ReaderMail.png';
import MailRefresh from '../../../assets/images/MailRefresh.png';

const STATUSBAR_HEIGHT = 48;
const refreshingHeight = 100;

const ReaderMailBody = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [memberInfo, setMemberInfo] = useState(); //유저 정보
  const [mailSelect, setMailSelect] = useState(true); //메일함,저장함 선택 toggle
  const [recentSelect, setRecentSelect] = useState(true); //최신순, 오래된순 선택 toggle
  const [count, setCount] = useState(0); //읽지않은 메일 수
  const [refreshing, setRefreshing] = useState(false); //새로고침 상태
  const [mail, setMail] = useState([{key: 'category'}]); //메일 데이터
  const [bookmark, setBookmark] = useState([]); //저장된 메일 데이터
  const [offsetY, setOffsetY] = useState(0); //스크롤 Y
  const animation = useRef(new Animated.Value(0)).current; //스크롤 애니메이션
  const {isLoading: mailLoading, data: mailData} = useQuery(
    ['ReaderMail'],
    ReaderAPI.readerMailBox,
  );
  const {isLoading: readerInfoLoading, data: readerInfoData} = useQuery(
    ['ReaderInfo'],
    ReaderAPI.memberInfo,
  );

  useEffect(() => {
    if (readerInfoData) {
      setMemberInfo(readerInfoData);
    }
  }, [readerInfoData]);

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
      var temp = mailData;
      if (!temp.length) {
        temp.map((data, index) => {
          data.key = index.toString();
        });
        temp.unshift({key: 'category'});
      } else if (temp && temp[0].key !== 'category') {
        temp.map((data, index) => {
          data.key = index.toString();
        });
        temp.unshift({key: 'category'});
      }
      var tempMail = temp.slice().sort(function (a, b) {
        if (a.publishedTime >= b.publishedTime) {
          return recentSelect ? -1 : 1;
        } else if (a.publishedTime < b.publishedTime) {
          return recentSelect ? 1 : -1;
        }
      });
      setMail([...tempMail]);
    } else setMail([{key: 'category'}]);
  }, [mailData, recentSelect, mailSelect]);

  // useEffect(() => {
  //   if (mailSelect) {
  //     setMail(data =>
  //       data.slice().sort(function (a, b) {
  //         if (a.publishedTime >= b.publishedTime) {
  //           return recentSelect ? -1 : 1;
  //         } else if (a.publishedTime < b.publishedTime) {
  //           return recentSelect ? 1 : -1;
  //         }
  //       }),
  //     );
  //   } else {
  //     setBookmark(data =>
  //       data.slice().sort(function (a, b) {
  //         if (a.publishedTime >= b.publishedTime) {
  //           return recentSelect ? -1 : 1;
  //         } else if (a.publishedTime < b.publishedTime) {
  //           return recentSelect ? 1 : -1;
  //         }
  //       }),
  //     );
  //   }
  // }, [recentSelect, mailSelect]);

  useEffect(() => {
    var temp = mail.filter(item => {
      if (item.key === 'category') return true;
      if (item.isSaved) return true;
    });
    setBookmark([...temp]);

    var tempCount = 0;
    mail.map(item => {
      if (item.isRead === false) tempCount++;
    });
    setCount(tempCount);
  }, [mail]);

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
      await queryClient.refetchQueries(['ReaderMail']);
      setRefreshing(false);
    }
  };

  //저장하기 버튼 클릭
  const bookmarkRow = async (rowMap, key, item) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
    if (!item.isSaved) {
      var result = await ReaderAPI.mailSaving({mailId: item.id});
      if (result) await queryClient.refetchQueries(['ReaderMail']);
    } else {
      var result = await ReaderAPI.mailCancelSaving({mailId: item.id});
      if (result) await queryClient.refetchQueries(['ReaderMail']);
    }
  };

  //쪽지 보내기 버튼 클릭
  const sendRow = (rowMap, key, writerId) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
    navigation.navigate('ReaderStacks', {
      screen: 'MessageWrite',
      params: {writerId: writerId},
    });
  };

  //메일함 클릭
  const onPressMail = () => {
    setMailSelect(true);
  };

  //저장함 클릭
  const onPressSave = () => {
    setMailSelect(false);
  };

  //최신순 클릭
  const onPressRecent = () => {
    setRecentSelect(true);
  };

  //오래된순 클릭
  const onPressOld = () => {
    setRecentSelect(false);
  };

  //메일 아이템 클릭
  const onPressMailItem = async (rowMap, data) => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderReading',
      params: {mailId: data.item.id, writerId: data.item.writerId},
    });
  };

  //메일 아이템 render
  const renderItem = (data, rowMap) => (
    <SwipeRow
      rightOpenValue={-150}
      stopRightSwipe={-150}
      disableRightSwipe={true}
      disableLeftSwipe={data.item.key === 'category' ? true : false}>
      <RenderHiddenItem data={data} rowMap={rowMap} />
      {data.item.key === 'category' ? (
        <RenderCategory />
      ) : (
        <TouchableWithoutFeedback onPress={e => onPressMailItem(rowMap, data)}>
          <View style={styles.itemView}>
            <FastImage
              style={{
                width: 42,
                height: 42,
                opacity: data.item.isRead ? 0.4 : null,
                borderRadius: 90,
              }}
              source={
                data.item.writerImgUrl === ''
                  ? DefaultProfile
                  : {uri: data.item.writerImgUrl}
              }
            />
            <View style={styles.itemTextView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    ...styles.itemAuthorText,
                    color: data.item.isRead ? '#BEBEBE' : '#4562F1',
                  }}>
                  {data.item.writerNickname}
                </Text>
                <Text style={styles.itemDateText}>
                  {data.item.publishedTime
                    ? data.item.publishedTime.slice(0, 10)
                    : null}
                </Text>
              </View>
              <Text
                style={{
                  ...styles.itemTitleText,
                  color: data.item.isRead ? '#BEBEBE' : '#3C3C3C',
                }}>
                {data.item.title}
              </Text>
              <Text
                style={{
                  ...styles.itemBodyText,
                  color: data.item.isRead ? '#BEBEBE' : '#828282',
                }}>
                {data.item.preview}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SwipeRow>
  );

  //메일아이템 swipe render
  const RenderHiddenItem = ({data, rowMap}) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => bookmarkRow(rowMap, data.item.key, data.item)}>
        {data.item.isSaved ? (
          <FastImage style={{width: 21, height: 20.5}} source={StarMail} />
        ) : (
          <FastImage style={{width: 21, height: 20.5}} source={NoStarMail} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => sendRow(rowMap, data.item.key, data.item.writerId)}>
        <FastImage style={{width: 21.54, height: 23.82}} source={SendMail} />
      </TouchableOpacity>
    </View>
  );

  //카테고리 render
  const RenderCategory = () => (
    <View style={styles.bodyHeader}>
      <View
        style={{
          width: 111.5,
          height: 41.63,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={
            mailSelect ? styles.bodyHeaderBorder : styles.bodyHeaderBorderNone
          }>
          <TouchableOpacity onPress={onPressMail}>
            <Text
              style={{
                ...styles.bodyHeaderText,
                color: mailSelect ? '#3C3C3C' : '#BEBEBE',
              }}>
              메일함
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={
            mailSelect ? styles.bodyHeaderBorderNone : styles.bodyHeaderBorder
          }>
          <TouchableOpacity onPress={onPressSave}>
            <Text
              style={{
                ...styles.bodyHeaderText,
                color: mailSelect ? '#BEBEBE' : '#3C3C3C',
              }}>
              저장함
            </Text>
          </TouchableOpacity>
        </View>
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
        <Text
          style={{
            ...styles.bodyHeaderTextOrder,
            color: '#BEBEBE',
          }}>
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
            source={MailRefresh}></Animated.Image>
          <Text style={{...styles.refreshText}}>새 메일과 연결되는 중</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <SwipeListView
          onScroll={onScroll}
          onResponderRelease={onRelease}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <View style={styles.header}>
                <FastImage
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 32,
                    width: 164,
                    height: 179,
                  }}
                  source={ReaderMail}
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
                          fontFamily: 'NotoSansKR-Medium',
                        }}>
                        {memberInfo ? memberInfo.nickName : null}&nbsp;
                      </Text>
                      님,
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.headerText}>
                      <Text
                        style={{
                          ...styles.headerText,
                          fontFamily: 'NotoSansKR-Medium',
                        }}>
                        당신의 작가
                      </Text>
                      {mail.length === 1 ? '를' : '가'}
                    </Text>
                  </View>
                  <Text style={styles.headerText}>
                    {mail.length === 1
                      ? '기다려보세요.'
                      : count
                      ? '찾아왔어요.'
                      : '글을 쓰고 있어요.'}
                  </Text>
                </View>
              </View>
            </View>
          }
          data={mailSelect ? mail : bookmark}
          closeOnScroll={true}
          renderItem={renderItem}
          // renderHiddenItem={renderHiddenItem}
          ListFooterComponent={
            mail.length === 1 ? (
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
                  source={SubscribeMail}
                />
              </View>
            ) : bookmark.length === 1 && !mailSelect ? (
              <View
                style={{
                  width: '100%',
                  height: Dimensions.get('window').height - 301,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFF',
                }}>
                <FastImage
                  style={{
                    width: 160,
                    height: 16,
                    bottom: 48,
                  }}
                  source={NoBookMarkMail}
                />
              </View>
            ) : (
              <View style={{height: 150, backgroundColor: 'white'}} />
            )
          }
        />
      </View>
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
    // paddingBottom: 150,
  },
  bodyHeader: {
    height: 41.63,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  bodyHeaderBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#4562F1',
    height: 41.63,
    justifyContent: 'center',
  },
  bodyHeaderBorderNone: {
    height: 41.63,
    justifyContent: 'center',
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    includeFontPadding: false,
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
  itemView: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    backgroundColor: '#FFF',
  },
  itemTextView: {
    paddingLeft: 15,
    paddingRight: 42,
    width: '100%',
    top: -4,
  },
  itemAuthorText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    includeFontPadding: false,
    marginBottom: 3,
  },
  itemDateText: {
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Light',
    fontSize: 12,
    includeFontPadding: false,
  },
  itemTitleText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    marginBottom: 4,
    includeFontPadding: false,
  },
  itemBodyText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
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

export default ReaderMailBody;
