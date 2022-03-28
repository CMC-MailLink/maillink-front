import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
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
  Comfortable: {
    name: '편안',
    back: '#E2FAE2',
    font: '#00402D',
    num: '#7FCE7F',
  },
  Clear: {name: '맑은', back: '#DDF9FF', font: '#002C36', num: '#6BD0E6'},
  Lyrical: {name: '서정', back: '#E6DDFF', font: '#1E0072', num: '#AE92FF'},
  Calm: {name: '잔잔', back: '#C5F0E3', font: '#00573D', num: '#5ECEAC'},
  Light: {name: '명랑', back: '#FFF2AD', font: '#5D4300', num: '#FFC839'},
  Cheerful: {name: '유쾌', back: '#FFDDDD', font: '#370000', num: '#FF8E8E'},
  Sweet: {name: '달달', back: '#FFE8FB', font: '#3E0035', num: '#FFACDE'},
  Kitsch: {name: '키치', back: '#FFE6B7', font: '#432C00', num: '#FFAD62'},
  Poetry: {name: '시', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
  Novels: {name: '소설', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
  Essays: {name: '에세이', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
};

const AuthorProfileIntro = ({writerInfo}) => {
  const onPressFacebook = async url => {
    await Linking.openURL(url);
  };
  const onPressTwitter = async url => {
    await Linking.openURL(url);
  };
  const onPressInstagram = async url => {
    await Linking.openURL(url);
  };
  const onPressURL = async url => {
    await Linking.openURL(url);
  };

  return (
    <View style={{flex: 1, paddingBottom: 150}}>
      <View style={styles.bodyIntroView}>
        <Text style={styles.bodyIntroHeadText}>소개</Text>
        <Text style={styles.bodyIntroText}>
          {writerInfo
            ? writerInfo.introduction
              ? writerInfo.introduction
              : '작성된 소개글이 없습니다.'
            : ''}
        </Text>
      </View>
      <View style={styles.bodyInterestView}>
        <Text style={styles.bodyIntroHeadText}>관심사</Text>
        <Text style={styles.bodyInterestHeadText}>갈래</Text>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          {writerInfo && writerInfo.genre1 ? (
            <View
              style={{
                ...styles.bodyInterestItemView,
                backgroundColor: colorCategory[writerInfo.genre1].back,
              }}>
              <Text
                style={{
                  ...styles.bodyInterestItemText,
                  color: colorCategory[writerInfo.genre1].font,
                }}>
                <Text
                  style={{
                    ...styles.bodyInterestItemRankText,
                    color: colorCategory[writerInfo.genre1].rank,
                  }}>
                  1&nbsp;&nbsp;&nbsp;
                </Text>
                {colorCategory[writerInfo.genre1].name}
              </Text>
            </View>
          ) : (
            <Text style={styles.bodyInterestHeadText}>
              설정된 갈래가 없습니다.
            </Text>
          )}
          {writerInfo && writerInfo.genre2 ? (
            <View
              style={{
                ...styles.bodyInterestItemView,
                backgroundColor: colorCategory[writerInfo.genre2].back,
              }}>
              <Text
                style={{
                  ...styles.bodyInterestItemText,
                  color: colorCategory[writerInfo.genre2].font,
                }}>
                <Text
                  style={{
                    ...styles.bodyInterestItemRankText,
                    color: colorCategory[writerInfo.genre2].rank,
                  }}>
                  2&nbsp;&nbsp;&nbsp;
                </Text>
                {colorCategory[writerInfo.genre2].name}
              </Text>
            </View>
          ) : null}
          {writerInfo && writerInfo.genre3 ? (
            <View
              style={{
                ...styles.bodyInterestItemView,
                backgroundColor: colorCategory[writerInfo.genre3].back,
              }}>
              <Text
                style={{
                  ...styles.bodyInterestItemText,
                  color: colorCategory[writerInfo.genre3].font,
                }}>
                <Text
                  style={{
                    ...styles.bodyInterestItemRankText,
                    color: colorCategory[writerInfo.genre3].rank,
                  }}>
                  3&nbsp;&nbsp;&nbsp;
                </Text>
                {colorCategory[writerInfo.genre3].name}
              </Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.bodyInterestHeadText}>분위기</Text>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          {writerInfo && writerInfo.mood1 ? (
            <View
              style={{
                ...styles.bodyInterestItemView,
                backgroundColor: colorCategory[writerInfo.mood1].back,
              }}>
              <Text
                style={{
                  ...styles.bodyInterestItemText,
                  color: colorCategory[writerInfo.mood1].font,
                }}>
                <Text
                  style={{
                    ...styles.bodyInterestItemRankText,
                    color: colorCategory[writerInfo.mood1].rank,
                  }}>
                  1&nbsp;&nbsp;&nbsp;
                </Text>
                {colorCategory[writerInfo.mood1].name}
              </Text>
            </View>
          ) : (
            <Text style={styles.bodyInterestHeadText}>
              설정된 분위기가 없습니다.
            </Text>
          )}
          {writerInfo && writerInfo.mood2 ? (
            <View
              style={{
                ...styles.bodyInterestItemView,
                backgroundColor: colorCategory[writerInfo.mood2].back,
              }}>
              <Text
                style={{
                  ...styles.bodyInterestItemText,
                  color: colorCategory[writerInfo.mood2].font,
                }}>
                <Text
                  style={{
                    ...styles.bodyInterestItemRankText,
                    color: colorCategory[writerInfo.mood2].rank,
                  }}>
                  2&nbsp;&nbsp;&nbsp;
                </Text>
                {colorCategory[writerInfo.mood2].name}
              </Text>
            </View>
          ) : null}
          {writerInfo && writerInfo.mood3 ? (
            <View
              style={{
                ...styles.bodyInterestItemView,
                backgroundColor: colorCategory[writerInfo.mood3].back,
              }}>
              <Text
                style={{
                  ...styles.bodyInterestItemText,
                  color: colorCategory[writerInfo.mood3].font,
                }}>
                <Text
                  style={{
                    ...styles.bodyInterestItemRankText,
                    color: colorCategory[writerInfo.mood3].rank,
                  }}>
                  3&nbsp;&nbsp;&nbsp;
                </Text>
                {colorCategory[writerInfo.mood3].name}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View
        style={{
          ...styles.bodyInterestView,
          borderBottomWidth: 0,
        }}>
        <Text style={styles.bodyIntroHeadText}>웹사이트</Text>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          {writerInfo && writerInfo.facebook ? (
            <TouchableOpacity
              onPress={() =>
                onPressFacebook(
                  `https://www.facebook.com/${writerInfo.facebook}`,
                )
              }>
              <Image
                style={{width: 39.83, height: 38.24, marginRight: 21}}
                source={Facebook}></Image>
            </TouchableOpacity>
          ) : (
            <Image
              style={{width: 39.83, height: 38.24, marginRight: 21}}
              source={FacebookNone}></Image>
          )}
          {writerInfo && writerInfo.twitter ? (
            <TouchableOpacity
              onPress={() =>
                onPressTwitter(`https://twitter.com/${writerInfo.twitter}`)
              }>
              <Image
                style={{width: 39.83, height: 38.24, marginRight: 21}}
                source={Twitter}></Image>
            </TouchableOpacity>
          ) : (
            <Image
              style={{width: 39.83, height: 38.24, marginRight: 21}}
              source={TwitterNone}></Image>
          )}
          {writerInfo && writerInfo.instagram ? (
            <TouchableOpacity
              onPress={() =>
                onPressInstagram(
                  `https://www.instagram.com/${writerInfo.instagram}`,
                )
              }>
              <Image
                style={{width: 39.83, height: 38.24, marginRight: 21}}
                source={Instagram}></Image>
            </TouchableOpacity>
          ) : (
            <Image
              style={{width: 39.83, height: 38.24, marginRight: 21}}
              source={InstagramNone}></Image>
          )}
          {writerInfo && writerInfo.etc ? (
            <TouchableOpacity
              onPress={() => onPressURL(`https://${writerInfo.etc}`)}>
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
    includeFontPadding: false,
  },
  bodyInterestItemView: {
    paddingHorizontal: 14.6,
    height: 30,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },
  bodyInterestItemText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    includeFontPadding: false,
  },
  bodyInterestItemRankText: {
    fontFamily: 'NotoSansKR-BLACK',
    fontSize: 12,
    includeFontPadding: false,
  },
});

export default AuthorProfileIntro;
