import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {useNavigation} from '@react-navigation/native';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import ReaderRecommendModal from './ReaderRecommendModal';
import {ReaderAPI} from '../../../API/ReaderAPI';

import FilterRecommend from '../../../assets/images/FilterRecommend.png';
import AuthorProfileRecommend from '../../../assets/images/AuthorProfileRecommend.png';

const ReaderRecommendList = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [allSelect, setAllSelect] = useState(true);
  const [branch, setBranch] = useState([
    {category: '시', select: true},
    {category: '소설', select: true},
    {category: '에세이', select: true},
  ]);
  const [vive, setVive] = useState([
    {category: '편안', select: true},
    {category: '맑은', select: true},
    {category: '서정', select: true},
    {category: '잔잔', select: true},
    {category: '명랑', select: true},
    {category: '유쾌', select: true},
    {category: '달달', select: true},
    {category: '키치', select: true},
  ]);
  const [author, setAuthor] = useState([]);
  const [filterAuthor, setFilterAuthor] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const {isLoading: authorListLoading, data: authorListData} = useQuery(
    ['AuthorList'],
    ReaderAPI.getWriters,
  );

  useEffect(() => {
    if (authorListData) setAuthor([...authorListData]);
  }, [authorListData]);

  useEffect(() => {
    setFilterAuthor([...author]);
  }, [author]);

  const onPressAll = () => {
    setAllSelect(true);
  };
  const onPressInterest = () => {
    setAllSelect(false);
  };

  const onPressSubscribe = async writerId => {
    var result = await ReaderAPI.subscribing({writerId: writerId});
    console.log(result);
    if (result) await await queryClient.refetchQueries(['AuthorList']);
  };
  const onPressCancelSubscribe = async writerId => {
    var result = await ReaderAPI.cancelSubscribing({writerId: writerId});
    console.log(result);
    if (result) await await queryClient.refetchQueries(['AuthorList']);
  };

  const onPressAuthor = () => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAuthorProfile',
    });
  };

  return (
    <View style={{flex: 1}}>
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
          setFilterAuthor={setFilterAuthor}
          author={author}></ReaderRecommendModal>
      </Modal>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>전체 메일링크 작가</Text>
        <TouchableOpacity
          style={{position: 'absolute', right: 20}}
          onPress={() => setModalVisible(true)}>
          <Image
            style={{
              width: 21,
              height: 17,
            }}
            source={FilterRecommend}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyHeader}>
        <View
          style={{
            width: 128,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={allSelect ? styles.bodyHeaderBorder : null}>
            <TouchableOpacity onPress={onPressAll}>
              <Text
                style={{
                  ...styles.bodyHeaderText,
                  color: allSelect ? '#3C3C3C' : '#BEBEBE',
                }}>
                전체목록
              </Text>
            </TouchableOpacity>
          </View>
          <View style={allSelect ? null : styles.bodyHeaderBorder}>
            <TouchableOpacity onPress={onPressInterest}>
              <Text
                style={{
                  ...styles.bodyHeaderText,
                  color: allSelect ? '#BEBEBE' : '#3C3C3C',
                }}>
                관심작가
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{marginBottom: 150, minHeight: 400}}>
        {filterAuthor.map((data, index) => (
          <TouchableOpacity onPress={onPressAuthor} key={index}>
            <View style={styles.itemView}>
              <Image
                style={{width: 42, height: 42, marginRight: 15}}
                source={{uri: data.writerInfo.imgUrl}}></Image>
              <View>
                <Text style={styles.itemName}>{data.writerInfo.nickName}</Text>
                <Text style={styles.itemIntro}>
                  {data.writerInfo.introduction}
                </Text>
              </View>
              {data.isSubscribe ? (
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
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerView: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  bodyHeader: {
    paddingHorizontal: 20,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    justifyContent: 'center',
  },
  bodyHeaderBorder: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#4562F1',
    justifyContent: 'center',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    includeFontPadding: false,
  },
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
