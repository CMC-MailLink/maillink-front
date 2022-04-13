import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import colorCategory from '../../Colors/ColorCategory';

import DefaultProfile from '../../assets/images/DefaultProfile.png';

const RecommendAuthorListItem = ({item}) => {
  const navigation = useNavigation();

  //작가프로필 선택
  const onPressAuthor = data => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAuthorProfile',
      params: {id: data.id},
    });
  };

  return (
    <TouchableOpacity onPress={() => onPressAuthor(item)}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>{item.nickName}</Text>
          <Text style={styles.itemAuthor}>작가님</Text>
          <Text style={styles.itemIntro} numberOfLines={2}>
            {item.introduction}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{...styles.itemCategoryView, marginRight: 10}}>
              <Text
                style={{
                  ...styles.itemCategoryText,
                  color: '#0021C6',
                }}>
                {colorCategory[item.primaryGenre].name}
              </Text>
            </View>
            <View
              style={{
                ...styles.itemCategoryView,
                backgroundColor: colorCategory[item.primaryMood].back,
              }}>
              <Text
                style={{
                  ...styles.itemCategoryText,
                  color: colorCategory[item.primaryMood].font,
                }}>
                {colorCategory[item.primaryMood].name}
              </Text>
            </View>
          </View>
        </View>
        <FastImage
          style={{
            width: 56,
            height: 56,
            position: 'absolute',
            top: 10,
            borderRadius: 90,
          }}
          source={
            !item || item.imgUrl === '' || !item.imgUrl
              ? DefaultProfile
              : {uri: item.imgUrl}
          }></FastImage>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemView: {
    width: 159,
    height: 155,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 9,
    elevation: 4,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    alignItems: 'center',
    paddingHorizontal: 21,
    marginTop: 40,
    paddingTop: 30,
    marginBottom: 20,
  },
  itemName: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  itemAuthor: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 10,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  itemIntro: {
    marginTop: 5,
    height: 32,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 11,
    color: '#828282',
    includeFontPadding: false,
  },
  itemCategoryView: {
    paddingHorizontal: 14.6,
    height: 24,
    borderRadius: 26,
    backgroundColor: '#E8EBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCategoryText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    includeFontPadding: false,
  },
});

export default RecommendAuthorListItem;
