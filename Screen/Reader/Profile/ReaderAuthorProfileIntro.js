import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import CopyProfile from '../../../assets/images/CopyProfile.png';

const ReaderAuthorProfileIntro = () => {
  const copyToClipboard = data => {
    Clipboard.setString(data);
  };

  return (
    <View style={{flex: 1}}>
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
            <Text style={styles.bodyInterestItemText1}>시</Text>
          </View>
          <View style={styles.bodyInterestItemView2}>
            <Text style={styles.bodyInterestItemText2}>소설</Text>
          </View>
          <View style={styles.bodyInterestItemView3}>
            <Text style={styles.bodyInterestItemText3}>에세이</Text>
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
        <Text style={styles.bodyIntroHeadText}>관심사</Text>
        <Text style={styles.bodyIntroText}>facebook.com/덩이</Text>
        <TouchableOpacity
          style={{position: 'absolute', top: 50, right: 20}}
          onPress={() => copyToClipboard('facebook.com/덩이')}>
          <Image style={{width: 13, height: 16}} source={CopyProfile}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyIntroView: {
    height: 114,
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
  },
  bodyIntroText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#828282',
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
  },
});

export default ReaderAuthorProfileIntro;
