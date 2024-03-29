import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useNavigation} from '@react-navigation/native';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {AuthorAPI} from '../../../API/AuthorAPI';
import FastImage from 'react-native-fast-image';

import MenuProfile from '../../../assets/images/MenuProfile.png';
import MenuItemProfile1 from '../../../assets/images/MenuItemProfile1.png';
import MenuItemProfile2 from '../../../assets/images/MenuItemProfile2.png';
import MenuItemProfile3 from '../../../assets/images/MenuItemProfile3.png';
import MenuItemProfile4 from '../../../assets/images/MenuItemProfile4.png';
import SearchAuthorProfile from '../../../assets/images/SearchAuthorProfile.png';

const AuthorProfileMail = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [recentSelect, setRecentSelect] = useState(true);
  const onPressRecent = () => {
    setRecentSelect(true);
  };
  const onPressOld = () => {
    setRecentSelect(false);
  };
  const [repMail, setRepMail] = useState(null);
  const [mail, setMail] = useState(); //메일 데이터
  const {isLoading: mailLoading, data: mailData} = useQuery(
    ['AuthorMail'],
    AuthorAPI.writerGetPublishing,
  );
  const {isLoading: authorInfoLoading, data: authorInfoData} = useQuery(
    ['AuthorInfo'],
    AuthorAPI.memberInfo,
  );
  useEffect(() => {
    if (mailData) {
      var tempMail = mailData.mailList.slice().sort(function (a, b) {
        if (a.publishedTime >= b.publishedTime) {
          return recentSelect ? -1 : 1;
        } else if (a.publishedTime < b.publishedTime) {
          return recentSelect ? 1 : -1;
        }
      });
      setMail([...tempMail]);
      setRepMail(mailData.represent);
    }
  }, [recentSelect, mailData]);

  const cancelRep = async id => {
    var result = await AuthorAPI.cancelRepresent({mailId: id});
    console.log(result);
    await queryClient.refetchQueries(['AuthorMail']);
  };

  const setRep = async id => {
    var result = await AuthorAPI.setRepresent({mailId: id});
    console.log(result);
    await queryClient.refetchQueries(['AuthorMail']);
  };
  const cancelShow = async id => {
    var result = await AuthorAPI.cancelPublic({mailId: id});
    console.log(result);
    await queryClient.refetchQueries(['AuthorMail']);
  };
  const setShow = async id => {
    var result = await AuthorAPI.setPublic({mailId: id});
    console.log(result);
    await queryClient.refetchQueries(['AuthorMail']);
  };
  const onPressSearch = () => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorProfileSearch',
    });
  };

  //메일 아이템 클릭
  const onPressMailItem = async data => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorReading',
      params: {data, memberInfo: authorInfoData},
    });
  };

  const RenderMenuItem = ({item}) => {
    return (
      <Menu style={styles.menuView}>
        <MenuTrigger style={styles.menuTriggerView}>
          <View
            style={{
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              style={{width: 13, height: 2.29}}
              source={MenuProfile}></FastImage>
          </View>
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          {repMail && repMail.id === item.id ? (
            <MenuOption onSelect={() => cancelRep(item.id)}>
              <Text>대표글 취소하기</Text>
              <FastImage
                style={styles.menuImage}
                source={MenuItemProfile4}></FastImage>
            </MenuOption>
          ) : (
            <MenuOption onSelect={() => setRep(item.id)}>
              <Text>대표글로 설정하기</Text>
              <FastImage
                style={{
                  width: 12,
                  height: 20,
                  position: 'absolute',
                  right: 22.5,
                }}
                source={MenuItemProfile1}></FastImage>
            </MenuOption>
          )}
          {item.isPublic ? (
            <MenuOption
              style={{borderBottomWidth: 0}}
              onSelect={() => cancelShow(item.id)}>
              <Text>비공개글로 전환하기</Text>
              <FastImage
                style={styles.menuImage2}
                source={MenuItemProfile3}></FastImage>
            </MenuOption>
          ) : (
            <MenuOption onSelect={() => setShow(item.id)}>
              <Text>공개글로 전환하기</Text>
              <FastImage
                style={styles.menuImage2}
                source={MenuItemProfile2}></FastImage>
            </MenuOption>
          )}
        </MenuOptions>
      </Menu>
    );
  };

  const RenderItem = ({data}) => {
    return (
      <TouchableOpacity onPress={() => onPressMailItem(data)}>
        <View
          style={{
            ...styles.mailItemView,
            borderBottomColor: '#EBEBEB',
            borderBottomWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 13,
            marginTop: 0,
          }}>
          <Text style={styles.mailItemTitle} numberOfLines={1}>
            {data.title}
          </Text>
          <Text style={styles.mailItemBody} numberOfLines={2}>
            {data.preView}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.mailItemDate}>
              {data.publishedTime.slice(0, 10)}
            </Text>
            {data.isPublic ? (
              <Text style={styles.mailItemOpen}>공개</Text>
            ) : (
              <Text style={styles.mailItemClose}>비공개</Text>
            )}
            <RenderMenuItem item={data}></RenderMenuItem>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 150}}>
      <View style={styles.refView}>
        <Text style={styles.refText}>대표글</Text>
        {repMail ? (
          <TouchableOpacity onPress={() => onPressMailItem(repMail)}>
            <View style={styles.mailItemView}>
              <Text style={styles.mailItemTitle}>{repMail.title}</Text>
              <Text style={styles.mailItemBody}>{repMail.preView}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.mailItemDate}>
                  {' '}
                  {repMail.publishedTime.slice(0, 10)}
                </Text>
                {repMail.isPublic ? (
                  <Text style={styles.mailItemOpen}>공개</Text>
                ) : (
                  <Text style={styles.mailItemClose}>비공개</Text>
                )}
                <RenderMenuItem item={repMail}></RenderMenuItem>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Light',
                fontSize: 14,
                color: '#828282',
                includeFontPadding: false,
              }}>
              설정된 대표글이 없습니다.
            </Text>
          </View>
        )}
      </View>
      <View style={styles.publishView}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.refText}>발행글</Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 0}}
            onPress={onPressSearch}>
            <FastImage
              style={{width: 16, height: 16}}
              source={SearchAuthorProfile}></FastImage>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.publishText}>
            총&nbsp;
            <Text style={{color: '#3C3C3C'}}>{mail ? mail.length : ''}</Text>편
          </Text>
          <View
            style={{
              width: 92,
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              right: 0,
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
      </View>
      {mail
        ? mail.map((data, index) => (
            <RenderItem data={data} key={data.id}></RenderItem>
          ))
        : null}
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
    height: 30,
    includeFontPadding: false,
  },
  mailItemView: {marginTop: 15},
  mailItemTitle: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
    marginBottom: 7,
    includeFontPadding: false,
  },
  mailItemBody: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#828282',
    paddingRight: 36,
    marginBottom: 7,
    includeFontPadding: false,
  },
  mailItemDate: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  mailItemOpen: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#4562F1',
    position: 'absolute',
    right: 36,
    includeFontPadding: false,
  },
  mailItemClose: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#BEBEBE',
    position: 'absolute',
    right: 36,
    includeFontPadding: false,
  },
  publishView: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  publishText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
    includeFontPadding: false,
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    includeFontPadding: false,
  },
  menuItemText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 15,
    color: '#5F5F5F',
    includeFontPadding: false,
  },
  menuView: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  menuTriggerView: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuImage: {
    width: 11,
    height: 17,
    position: 'absolute',
    right: 22.5,
  },
  menuImage2: {
    width: 16,
    height: 21,
    position: 'absolute',
    right: 22.5,
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.082,
    shadowRadius: 29,
  },
  optionWrapper: {
    paddingHorizontal: 22.5,
    paddingVertical: 17.5,
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default AuthorProfileMail;
