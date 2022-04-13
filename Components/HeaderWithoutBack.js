import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const HeaderWithoutBack = ({title, theme}) => (
  <View
    style={theme === 'white' ? styles.headerViewWhite : styles.headerViewBlue}>
    <Text
      style={
        theme === 'white' ? styles.headerTextWhite : styles.headerTextBlue
      }>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  headerViewWhite: {
    height: 83 - 47,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 7,
    backgroundColor: 'pink',
  },
  headerViewBlue: {
    height: 83 - 47,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 7,
    // backgroundColor: '#4562F1',
    backgroundColor: 'pink',
  },
  headerTextWhite: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  headerTextBlue: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#fff',
    includeFontPadding: false,
  },
});

export default HeaderWithoutBack;
