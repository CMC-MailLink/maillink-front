import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useNavigation} from '@react-navigation/native';
import {ReaderAPI} from '../../../API/ReaderAPI';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';

import SubscribeMail from '../../../assets/images/SubscribeMail.png';
import NoBookMarkMail from '../../../assets/images/NoBookMarkMail.png';
import SendMail from '../../../assets/images/SendMail.png';
import StarMail from '../../../assets/images/StarMail.png';
import NoStarMail from '../../../assets/images/NoStarMail.png';
import AuthorProfileImage from '../../../assets/images/AuthorProfileImage.png';
import ReaderMail from '../../../assets/images/ReaderMail.png';

const STATUSBAR_HEIGHT = 48;

const ReaderMailBody = () => {
  const navigation = useNavigation();
  const [memberInfo, setMemberInfo] = useState();
  const [mailSelect, setMailSelect] = useState(true);
  const [recentSelect, setRecentSelect] = useState(true);
  const [rowList, setRowList] = useState(null);
  const [rowOpen, setRowOpen] = useState(null);
  const [count, setCount] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [mail, setMail] = useState([{key: 'category'}]);
  const [bookmark, setBookmark] = useState([]);
  const {isLoading: mailLoading, data: mailData} = useQuery(
    ['ReaderMail', recentSelect],
    ReaderAPI.readerMailBox,
  );

  useEffect(() => {
    async function getMemberInfo() {
      const result = await ReaderAPI.memberInfo();
      console.log(result);
      setMemberInfo(result);
    }

    getMemberInfo();
  }, []);

  useEffect(() => {
    if (mailSelect) {
      setMail(data =>
        data.slice().sort(function (a, b) {
          if (a.date >= b.date) {
            return recentSelect ? -1 : 1;
          } else if (a.date < b.date) {
            return recentSelect ? 1 : -1;
          }
        }),
      );
    } else {
      setBookmark(data =>
        data.slice().sort(function (a, b) {
          if (a.date >= b.date) {
            return recentSelect ? -1 : 1;
          } else if (a.date < b.date) {
            return recentSelect ? 1 : -1;
          }
        }),
      );
    }
  }, [recentSelect, mailSelect]);

  useEffect(() => {
    var temp = mail.filter(item => {
      if (item.key === 'category') return true;
      if (item.bookmark) return true;
    });
    setBookmark([...temp]);

    var tempCount = 0;
    mail.map(item => {
      if (item.read === false) tempCount++;
    });
    setCount(tempCount);
  }, [mail]);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const bookmarkRow = (rowMap, key) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
    var temp = mail;
    temp.map(item => {
      if (item.key === key) {
        item.bookmark = !item.bookmark;
      }
    });
    setMail([...temp]);
  };

  const sendRow = (rowMap, key) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
  };

  const onPressMail = () => {
    rowList ? (rowList[rowOpen] ? rowList[rowOpen].closeRow() : null) : null;
    setMailSelect(true);
  };

  const onPressSave = () => {
    rowList ? (rowList[rowOpen] ? rowList[rowOpen].closeRow() : null) : null;
    setMailSelect(false);
  };

  const onPressRecent = () => {
    rowList ? (rowList[rowOpen] ? rowList[rowOpen].closeRow() : null) : null;
    setRecentSelect(true);
  };

  const onPressOld = () => {
    rowList ? (rowList[rowOpen] ? rowList[rowOpen].closeRow() : null) : null;
    setRecentSelect(false);
  };

  const onRowOpen = (rowKey, rowMap, toValue) => {
    setRowList(rowMap);
    setRowOpen(rowKey);
  };

  const onRowClose = (rowKey, rowMap, toValue) => {
    setRowOpen(null);
  };

  const onPressMailItem = (rowMap, data) => {
    rowList ? (rowList[rowOpen] ? null : setReadItem(data)) : setReadItem(data);
  };

  const setReadItem = data => {
    var temp = mail;
    temp.map(item => {
      if (item.key === data.item.key) {
        item.read = true;
      }
    });
    setMail([...temp]);
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderReading',
      params: {...data},
    });
  };

  const renderItem = (data, rowMap, rowKey) => {
    if (data.item.key === 'category') {
      return <RenderCategory></RenderCategory>;
    } else {
      return (
        <TouchableWithoutFeedback onPress={e => onPressMailItem(rowMap, data)}>
          <View style={styles.itemView}>
            <Image
              style={{
                width: 42,
                height: 42,
                // opacity: data.item.read ? 0.4 : null,
              }}
              source={AuthorProfileImage}
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
                    color: data.item.read ? '#BEBEBE' : '#4562F1',
                  }}>
                  {data.item.author}
                </Text>
                <Text style={styles.itemDateText}>{data.item.date}</Text>
              </View>
              <Text
                style={{
                  ...styles.itemTitleText,
                  color: data.item.read ? '#BEBEBE' : '#3C3C3C',
                }}>
                {data.item.title}
              </Text>
              <Text
                style={{
                  ...styles.itemBodyText,
                  color: data.item.read ? '#BEBEBE' : '#828282',
                }}>
                {data.item.body}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => bookmarkRow(rowMap, data.item.key)}>
        {data.item.bookmark ? (
          <Image style={{width: 21, height: 20.5}} source={StarMail} />
        ) : (
          <Image style={{width: 21, height: 20.5}} source={NoStarMail} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => sendRow(rowMap, data.item.key)}>
        <Image style={{width: 21.54, height: 23.82}} source={SendMail} />
      </TouchableOpacity>
    </View>
  );
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
      <View
        style={{
          height: 300,
          width: '100%',
          backgroundColor: '#4562F1',
          position: 'absolute',
        }}></View>
      <View style={styles.bodyContainer}>
        <SwipeListView
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListHeaderComponent={
            <View>
              <View style={styles.header}>
                <Image
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
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-150}
          stopRightSwipe={-150}
          disableRightSwipe={true}
          onRowOpen={onRowOpen}
          onRowClose={onRowClose}
          closeOnScroll={false}
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
                <Image
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
                <Image
                  style={{
                    width: 160,
                    height: 16,
                    bottom: 48,
                  }}
                  source={NoBookMarkMail}
                />
              </View>
            ) : (
              <View style={{height: 150, backgroundColor: 'white'}}></View>
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
  itemNewView: {
    position: 'absolute',
    top: 0,
    left: -16,
    width: 10,
    height: 10,
    backgroundColor: '#FF9B9B',
    borderRadius: 90,
  },
});

export default ReaderMailBody;
