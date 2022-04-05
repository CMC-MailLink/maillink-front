import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {AuthorAPI} from '../../../API/AuthorAPI';

import BackMail2 from '../../../assets/images/BackMail2.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';

const AuthorProfileFollowerList = ({
  navigation: {setOptions},
  route: {params},
}) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {isLoading: authorFollowerListLoading, data: authorFollowerListData} =
    useQuery(['AuthorFollowerList'], AuthorAPI.getfollowerList);
  console.log(authorFollowerListData);

  const onPressBack = () => {
    navigation.goBack();
  };

  //새로고침 이벤트
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['AuthorFollowerList']);
    setRefreshing(false);
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24, width: 20, height: 20}}>
            <FastImage
              style={{width: 9.5, height: 19}}
              source={BackMail2}></FastImage>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>
          <Text
            style={{
              color: '#4562F1',
              fontFamily: 'NotoSansKR-Bold',
              fontSize: 16,
              includeFontPadding: false,
            }}>
            {params.name}&nbsp;
          </Text>
          작가의 구독자
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}></RefreshControl>
        }>
        {authorFollowerListData
          ? authorFollowerListData.map((item, index) => (
              <View style={styles.menuView} key={index}>
                <FastImage
                  style={{
                    width: 33,
                    height: 33,
                    marginRight: 20,
                    borderRadius: 90,
                  }}
                  source={
                    item.imgUrl == '' || !item.imgUrl
                      ? DefaultProfile
                      : {uri: item.imgUrl}
                  }></FastImage>
                <Text style={styles.menuText}>{item.nickname}</Text>
              </View>
            ))
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 6,
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3c3c3c',
    includeFontPadding: false,
  },
  menuView: {
    height: 56,
    width: '100%',
    paddingHorizontal: 21,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  menuText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
});

export default AuthorProfileFollowerList;
