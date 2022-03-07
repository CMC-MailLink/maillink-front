import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import Facebook from '../../../assets/images/Facebook.png';
import Twitter from '../../../assets/images/Twitter.png';
import Instagram from '../../../assets/images/Instagram.png';
import URL from '../../../assets/images/URL.png';
import FacebookNone from '../../../assets/images/FacebookNone.png';
import TwitterNone from '../../../assets/images/TwitterNone.png';
import InstagramNone from '../../../assets/images/InstagramNone.png';
import URLNone from '../../../assets/images/URLNone.png';

const colorCategory = {
  편안: {back: '#E2FAE2', font: '#00402D', heart: '#7FCE7F'},
  맑은: {back: '#DDF9FF', font: '#002C36', heart: '#6BD0E6'},
  서정: {back: '#E6DDFF', font: '#1E0072', heart: '#AE92FF'},
  잔잔: {back: '#C5F0E3', font: '#00573D', heart: '#5ECEAC'},
  명랑: {back: '#FFF2AD', font: '#5D4300', heart: '#FFC839'},
  유쾌: {back: '#FFDDDD', font: '#370000', heart: '#FF8E8E'},
  달달: {back: '#FFE8FB', font: '#3E0035', heart: '#FFACDE'},
  키치: {back: '#FFE6B7', font: '#432C00', heart: '#FFAD62'},
};

const AuthorProfileIntro = () => {
  const author = {
    name: '덩이',
    facebook: null,
    twitter: 'twitter',
    instagram: 'instagram',
    url: 'url',
  };
  const onPressFacebook = data => {
    Clipboard.setString(data);
  };
  const onPressTwitter = data => {
    Clipboard.setString(data);
  };
  const onPressInstagram = data => {
    Clipboard.setString(data);
  };
  const onPressURL = data => {
    Clipboard.setString(data);
  };

  return (
    <View style={{flex: 1, paddingBottom: 150}}>
      <View style={styles.bodyIntroView}>
        <Text style={styles.bodyIntroHeadText}>소개</Text>
        <Text style={styles.bodyIntroText}>
          안녕하세요, 신진작가 ‘덩이’입니다 :) 재미있는 글을 쓰고 싶습니다.
        </Text>
      </View>
      <View style={styles.bodyInterestView}>
        <Text style={styles.bodyIntroHeadText}>관심사</Text>
        <Text style={styles.bodyInterestHeadText}>갈래</Text>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={styles.bodyInterestItemView1}>
            <Text style={styles.bodyInterestItemText1}>
              <Text
                style={{
                  ...styles.bodyInterestItemText1,
                  color: '#4562F1',
                }}>
                ♥&nbsp;
              </Text>
              시
            </Text>
          </View>
          <View style={styles.bodyInterestItemView2}>
            <Text style={styles.bodyInterestItemText2}>
              <Text
                style={{
                  ...styles.bodyInterestItemText1,
                  color: '#4562F1',
                }}>
                ♥&nbsp;
              </Text>
              소설
            </Text>
          </View>
          <View style={styles.bodyInterestItemView3}>
            <Text style={styles.bodyInterestItemText3}>
              <Text
                style={{
                  ...styles.bodyInterestItemText1,
                  color: '#4562F1',
                }}>
                ♥&nbsp;
              </Text>
              에세이
            </Text>
          </View>
        </View>
        <Text style={styles.bodyInterestHeadText}>분위기</Text>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View
            style={{
              ...styles.bodyInterestItemView2,
              backgroundColor: '#E6DDFF',
            }}>
            <Text style={{...styles.bodyInterestItemText2, color: '#1E0072'}}>
              서정
            </Text>
          </View>
          <View
            style={{
              ...styles.bodyInterestItemView2,
              backgroundColor: '#C5F0E3',
            }}>
            <Text style={{...styles.bodyInterestItemText2, color: '#00402D'}}>
              잔잔
            </Text>
          </View>
          <View
            style={{
              ...styles.bodyInterestItemView2,
              backgroundColor: '#FFF2AD',
            }}>
            <Text style={{...styles.bodyInterestItemText2, color: '#3D3300'}}>
              명랑
            </Text>
          </View>
          <View
            style={{
              ...styles.bodyInterestItemView2,
              backgroundColor: '#FFDDDD',
            }}>
            <Text style={{...styles.bodyInterestItemText2, color: '#370000'}}>
              유쾌
            </Text>
          </View>
          <View
            style={{
              ...styles.bodyInterestItemView2,
              backgroundColor: '#FFE8FB',
            }}>
            <Text style={{...styles.bodyInterestItemText2, color: '#3E0035'}}>
              달달
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.bodyInterestView,
          borderBottomWidth: 0,
        }}>
        <Text style={styles.bodyIntroHeadText}>웹사이트</Text>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          {author.facebook ? (
            <TouchableOpacity
              onPress={() => onPressFacebook('facebook.com/덩이')}>
              <Image
                style={{width: 39.83, height: 38.24, marginRight: 21}}
                source={Facebook}></Image>
            </TouchableOpacity>
          ) : (
            <Image
              style={{width: 39.83, height: 38.24, marginRight: 21}}
              source={FacebookNone}></Image>
          )}
          {author.twitter ? (
            <TouchableOpacity
              onPress={() => onPressTwitter('facebook.com/덩이')}>
              <Image
                style={{width: 39.83, height: 38.24, marginRight: 21}}
                source={Twitter}></Image>
            </TouchableOpacity>
          ) : (
            <Image
              style={{width: 39.83, height: 38.24, marginRight: 21}}
              source={TwitterNone}></Image>
          )}
          {author.instagram ? (
            <TouchableOpacity
              onPress={() => onPressInstagram('facebook.com/덩이')}>
              <Image
                style={{width: 39.83, height: 38.24, marginRight: 21}}
                source={Instagram}></Image>
            </TouchableOpacity>
          ) : (
            <Image
              style={{width: 39.83, height: 38.24, marginRight: 21}}
              source={InstagramNone}></Image>
          )}
          {author.url ? (
            <TouchableOpacity onPress={() => onPressURL('facebook.com/덩이')}>
              <Image
                style={{width: 39.83, height: 38.24, marginRight: 21}}
                source={URL}></Image>
            </TouchableOpacity>
          ) : (
            <Image
              style={{width: 39.83, height: 38.24, marginRight: 21}}
              source={URLNone}></Image>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyIntroView: {
    paddingTop: 19,
    paddingBottom: 19,
    paddingLeft: 21,
    paddingRight: 21,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  bodyIntroHeadText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    color: '#3C3C3C',
    height: 30,
    includeFontPadding: false,
  },
  bodyIntroText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#828282',
    includeFontPadding: false,
  },
  bodyInterestView: {
    paddingVertical: 19,
    paddingHorizontal: 21,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  bodyInterestHeadText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 12,
    color: '#828282',
    marginBottom: 5,
  },
  bodyInterestItemView1: {
    width: 43,
    height: 24,
    borderRadius: 26,
    backgroundColor: '#E8EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
  bodyInterestItemText1: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#0021C6',
    includeFontPadding: false,
  },
  bodyInterestItemView2: {
    width: 53,
    height: 24,
    borderRadius: 26,
    backgroundColor: '#E8EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
  bodyInterestItemText2: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#0021C6',
    includeFontPadding: false,
  },
  bodyInterestItemView3: {
    width: 63,
    height: 24,
    borderRadius: 26,
    backgroundColor: '#E8EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
  bodyInterestItemText3: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#0021C6',
    includeFontPadding: false,
  },
});

export default AuthorProfileIntro;
