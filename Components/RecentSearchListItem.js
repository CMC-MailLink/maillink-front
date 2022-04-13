import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';

import RecentSearchMail from '../assets/images/RecentSearchMail.png';
import DeleteMail from '../assets/images/DeleteMail.png';

const RecentSearchListItem = ({data, index, recentSearch, setRecentSearch}) => {
  const onPressDelete = (data, index) => {
    var temp = recentSearch;
    temp.splice(index, 1);
    setRecentSearch([...temp]);
  };

  return (
    <View style={styles.recentSearch}>
      <FastImage
        style={{width: 35, height: 35}}
        source={RecentSearchMail}></FastImage>
      <Text style={styles.recentSearchText}>{data}</Text>
      <TouchableWithoutFeedback onPress={e => onPressDelete(data, index)}>
        <View
          style={{
            position: 'absolute',
            right: 20,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            style={{
              width: 12,
              height: 12,
            }}
            source={DeleteMail}></FastImage>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  recentSearch: {
    paddingVertical: 8,
    paddingHorizontal: 23,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  recentSearchText: {
    marginLeft: 16,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
});

export default RecentSearchListItem;
