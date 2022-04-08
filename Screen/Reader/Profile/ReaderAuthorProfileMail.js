import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {ReaderAPI} from '../../../API/ReaderAPI';
import FastImage from 'react-native-fast-image';

import NoRepresentMail from '../../../assets/images/NoRepresentMail.png';
import NoAuthorMail from '../../../assets/images/NoAuthorMail.png';

const ReaderAuthorProfileMail = ({id}) => {
  const navigation = useNavigation();
  const [recentSelect, setRecentSelect] = useState(true);
  const [mail, setMail] = useState(); //메일 데이터
  const [repMail, setRepMail] = useState();
  const onPressRecent = () => {
    setRecentSelect(true);
  };
  const onPressOld = () => {
    setRecentSelect(false);
  };
  const {isLoading: authorMailListLoading, data: authorMailListData} = useQuery(
    ['AuthorMailList', id],
    ReaderAPI.getWriterPublishList,
  );

  useEffect(() => {
    if (authorMailListData) {
      var tempMail = authorMailListData.publicMailList
        .slice()
        .sort(function (a, b) {
          if (a.publishedTime >= b.publishedTime) {
            return recentSelect ? -1 : 1;
          } else if (a.publishedTime < b.publishedTime) {
            return recentSelect ? 1 : -1;
          }
        });
      setMail([...tempMail]);
      if (authorMailListData.represent)
        setRepMail(authorMailListData.represent);
    }
  }, [recentSelect, authorMailListData]);

  //메일 아이템 클릭
  const onPressMailItem = async data => {
    console.log(data.id, data.writerId);
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAuthorReading',
      params: {mailId: data.id, writerId: data.writerId},
    });
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
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 150, backgroundColor: '#fff'}}>
      <View style={styles.refView}>
        <Text style={styles.refText}>대표글</Text>
        {repMail && repMail.isPublic ? (
          <TouchableOpacity onPress={() => onPressMailItem(repMail)}>
            <View style={styles.mailItemView}>
              <Text style={styles.mailItemTitle}>{repMail.title}</Text>
              <Text style={styles.mailItemBody}>{repMail.preView}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.mailItemDate}>
                  {repMail.publishedTime.slice(0, 10)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <FastImage
              style={{width: 187, height: 56, marginTop: 10}}
              source={NoRepresentMail}></FastImage>
          </View>
        )}
      </View>
      <View style={styles.publishView}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.refText}>발행글</Text>
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
      {mail && mail.length ? (
        mail.map((data, index) =>
          data.isPublic ? (
            <RenderItem data={data} key={data.id}></RenderItem>
          ) : null,
        )
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FastImage
            style={{width: 261, height: 224}}
            source={NoAuthorMail}></FastImage>
        </View>
      )}
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
    includeFontPadding: false,
    height: 30,
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

export default ReaderAuthorProfileMail;
