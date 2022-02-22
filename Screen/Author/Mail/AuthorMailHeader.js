import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AuthorProfileImage from '../../../assets/images/AuthorProfileImage.png';

const STATUSBAR_HEIGHT = 48;

const AuthorMailHeader = () => {
  return (
    <View style={styles.header}>
      <Image
        style={{
          position: 'absolute',
          top: 0,
          right: 30,
          width: 166,
          height: 178,
        }}
        source={AuthorProfileImage}
      />

      <View
        style={{
          position: 'absolute',
          top: 113 - STATUSBAR_HEIGHT - 35,
          left: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'NotoSansKR-Bold',
              ...styles.headerText,
            }}>
            영이&nbsp;
          </Text>
          <Text style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
            님,{' '}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontFamily: 'NotoSansKR-Bold', ...styles.headerText}}>
            0&nbsp;
          </Text>
          <Text style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
            개의 메일이
          </Text>
        </View>
        <Text style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
          도착했습니다.
        </Text>
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
    fontSize: 25,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});

export default AuthorMailHeader;
