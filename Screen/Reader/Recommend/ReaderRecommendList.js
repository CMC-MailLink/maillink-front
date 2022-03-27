import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {useNavigation} from '@react-navigation/native';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import ReaderRecommendModal from './ReaderRecommendModal';
import {ReaderAPI} from '../../../API/ReaderAPI';
import FastImage from 'react-native-fast-image';

import DefaultProfile from '../../../assets/images/DefaultProfile.png';

const ReaderRecommendList = ({modalVisible, setModalVisible, allSelect}) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [branch, setBranch] = useState([
    {name: 'Poetry', category: '시', select: true},
    {name: 'Novels', category: '소설', select: true},
    {name: 'Essays', category: '에세이', select: true},
  ]);
  const [vive, setVive] = useState([
    {name: 'Comfortable', category: '편안', select: true},
    {name: 'Clear', category: '맑은', select: true},
    {name: 'Lyrical', category: '서정', select: true},
    {name: 'Calm', category: '잔잔', select: true},
    {name: 'Light', category: '명랑', select: true},
    {name: 'Cheerful', category: '유쾌', select: true},
    {name: 'Sweet', category: '달달', select: true},
    {name: 'Kitsch', category: '키치', select: true},
  ]);
  const [author, setAuthor] = useState([]);
  const [filterAuthor, setFilterAuthor] = useState([]);

  const {isLoading: authorListLoading, data: authorListData} = useQuery(
    ['AuthorList'],
    ReaderAPI.getWriters,
  );

  useEffect(() => {
    if (authorListData && !allSelect) {
      var temp = authorListData.filter(data => {
        if (data.interestedCheck) return true;
      });
      setAuthor([...temp]);
    } else if (authorListData) setAuthor([...authorListData]);
  }, [authorListData, allSelect]);

  useEffect(() => {
    if (!author) return;
    var temp = author.filter(data => {
      for (var i = 0; i < 3; i++) {
        if (branch[i].select)
          if (data.writerInfo.primaryGenre === branch[i].name) return true;
      }
      return false;
    });
    temp = temp.filter(data => {
      for (var i = 0; i < 8; i++) {
        if (vive[i].select)
          if (data.writerInfo.primaryMood === vive[i].name) return true;
      }
      return false;
    });
    setFilterAuthor([...temp]);
  }, [author, branch, vive]);

  //구독하기 버튼 클릭
  const onPressSubscribe = async writerId => {
    var result = await ReaderAPI.subscribing({writerId: writerId});
    if (result) await queryClient.refetchQueries(['AuthorList']);
    await queryClient.refetchQueries(['SubscribeAuthorList']);
  };

  //구독 취소하기 버튼 클릭
  const onPressCancelSubscribe = async writerId => {
    var result = await ReaderAPI.cancelSubscribing({writerId: writerId});
    if (result) await queryClient.refetchQueries(['AuthorList']);
    await queryClient.refetchQueries(['SubscribeAuthorList']);
  };

  //작가 선택
  const onPressAuthor = data => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAuthorProfile',
      params: {id: data.writerInfo.id},
    });
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <ReaderRecommendModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          branch={branch}
          setBranch={setBranch}
          vive={vive}
          setVive={setVive}
          filterAuthor={filterAuthor}
          setFilterAuthor={setFilterAuthor}></ReaderRecommendModal>
      </Modal>

      <View style={{minHeight: 400}}>
        {filterAuthor && filterAuthor.length ? (
          <View>
            {filterAuthor.map((data, index) => (
              <TouchableOpacity onPress={() => onPressAuthor(data)} key={index}>
                <View style={styles.itemView}>
                  <FastImage
                    style={{
                      width: 42,
                      height: 42,
                      marginRight: 15,
                      borderRadius: 90,
                    }}
                    source={
                      data.writerInfo.imgUrl === ''
                        ? DefaultProfile
                        : {uri: data.writerInfo.imgUrl}
                    }></FastImage>
                  <View>
                    <Text style={styles.itemName}>
                      {data.writerInfo.nickName}
                    </Text>
                    <Text style={styles.itemIntro}>
                      {data.writerInfo.introduction
                        ? data.writerInfo.introduction.slice(0, 20)
                        : ''}
                    </Text>
                  </View>
                  {data.subscribeCheck ? (
                    <TouchableOpacity
                      style={{position: 'absolute', right: 20}}
                      onPress={() =>
                        onPressCancelSubscribe(data.writerInfo.id)
                      }>
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
              </TouchableOpacity>
            ))}
            <View style={{height: 200, backgroundColor: 'white'}}></View>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
            }}>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Regular',
                color: '#3C3C3C',
                includeFontPadding: false,
              }}>
              작가가 없습니다.
            </Text>
          </View>
        )}
      </View>
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
    width: 200,
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

export default ReaderRecommendList;
