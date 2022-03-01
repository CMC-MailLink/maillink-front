import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useState} from 'react/cjs/react.development';

import ReaderRecommendList from './ReaderRecommendList';

import SearchRecommend from '../../../assets/images/SearchRecommend.png';
import AuthorRecommend from '../../../assets/images/AuthorRecommend.png';
import TestPageRecommend from '../../../assets/images/TestPageRecommend.png';

const ReaderRecommend = () => {
  const [recommend, setRecommend] = useState([
    {
      key: 0,
      name: '희희낙락',
      intro: '최대글자수입니다소개앞부분까지보이게함니당…',
      branch: '소설',
      vive: '명랑',
    },
    {
      key: 1,
      name: '주주',
      intro: '최대글자수입니다소개앞부분까지보이게함니당…',
      branch: '에세이',
      vive: '키치',
    },
    {
      key: 2,
      name: '주주1',
      intro: '최대글자수입니다소개앞부분까지보이게함니당…',
      branch: '에세이',
      vive: '키치',
    },
    {
      key: 3,
      name: '주주2',
      intro: '최대글자수입니다소개앞부분까지보이게함니당…',
      branch: '에세이',
      vive: '키치',
    },
  ]);

  const renderItem = ({item}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemAuthor}>작가님</Text>
          <Text style={styles.itemIntro}>{item.intro}</Text>
        </View>
        <Image
          style={{width: 56, height: 56, position: 'absolute', top: 10}}
          source={AuthorRecommend}></Image>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>작가찾기</Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Bold',
                fontSize: 20,
                color: '#3C3C3C',
              }}>
              영이
            </Text>
            님,
          </Text>
          <Text style={styles.titleText}>오늘의 추천작가입니다.</Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 20, bottom: 5}}>
            <Image
              style={{
                width: 19,
                height: 20,
              }}
              source={SearchRecommend}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.recView}>
          <FlatList
            data={recommend}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 30}}
            renderItem={renderItem}></FlatList>
        </View>
        <View style={styles.testPageView}>
          <TouchableOpacity>
            <Image
              style={{
                width: Dimensions.get('window').width,
                height: (Dimensions.get('window').width * 131) / 390,
              }}
              source={TestPageRecommend}></Image>
          </TouchableOpacity>
        </View>
        <ReaderRecommendList></ReaderRecommendList>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height: 83 - 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
  },
  titleView: {
    paddingHorizontal: 20,
  },
  titleText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 20,
    color: '#3C3C3C',
  },
  recView: {
    paddingTop: 5,
  },
  itemView: {
    width: 159,
    height: 155,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 9,
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
  },
  itemAuthor: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 10,
    color: '#BEBEBE',
  },
  itemIntro: {
    marginTop: 5,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 11,
    color: '#828282',
  },
  testPageView: {
    paddingBottom: 24,
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 6,
  },
});

export default ReaderRecommend;
