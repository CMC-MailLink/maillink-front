import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useQueryClient} from 'react-query';

import {ReaderAPI} from '../../API/ReaderAPI';

import DefaultProfile from '../../assets/images/DefaultProfile.png';

const AuthorListItem = ({data}) => {
  const queryClient = useQueryClient();

  //구독하기 버튼 클릭
  const onPressSubscribe = async writerId => {
    console.log(writerId);
    var result = await ReaderAPI.subscribing({writerId: writerId});
    if (result) {
      await queryClient.refetchQueries(['AuthorList']);
      await queryClient.refetchQueries(['SubscribeAuthorList']);
    }
  };

  //구독 취소하기 버튼 클릭
  const onPressCancelSubscribe = async writerId => {
    var result = await ReaderAPI.cancelSubscribing({writerId: writerId});
    if (result) {
      await queryClient.refetchQueries(['AuthorList']);
      await queryClient.refetchQueries(['SubscribeAuthorList']);
    }
  };

  return (
    <View style={styles.itemView}>
      <FastImage
        style={{
          width: 42,
          height: 42,
          marginRight: 15,
          borderRadius: 90,
        }}
        source={
          data.writerInfo.imgUrl === '' || !data.writerInfo.imgUrl
            ? DefaultProfile
            : {uri: data.writerInfo.imgUrl}
        }></FastImage>
      <View>
        <Text style={styles.itemName}>{data.writerInfo.nickName}</Text>
        <Text style={styles.itemIntro} numberOfLines={2}>
          {data.writerInfo.introduction ? data.writerInfo.introduction : ''}
        </Text>
      </View>
      {data.subscribeCheck ? (
        <TouchableOpacity
          style={{position: 'absolute', right: 20}}
          onPress={() => onPressCancelSubscribe(data.writerInfo.id)}>
          <View style={styles.subscribeView}>
            <Text style={styles.subscribeText}>구독중</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{position: 'absolute', right: 20}}
          onPress={() => onPressSubscribe(data.writerInfo.id)}>
          <View style={styles.notSubscribeView}>
            <Text style={styles.notSubscribeText}>구독하기</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  itemName: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
    marginBottom: 3,
    includeFontPadding: false,
  },
  itemIntro: {
    width: Dimensions.get('window').width - 40 - 42 - 15 - 75 - 10,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
    includeFontPadding: false,
  },
  subscribeView: {
    width: 75,
    height: 30,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  notSubscribeView: {
    width: 75,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4562F1',
  },
  notSubscribeText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#FFF',
    includeFontPadding: false,
  },
});

export default AuthorListItem;
