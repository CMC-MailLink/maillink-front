import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import ReaderRecommendModal from './ReaderRecommendModal';
import AuthorListItem from '../../../Components/Reader/AuthorListItem';

import NoHeartAuthor from '../../../assets/images/NoHeartAuthor.png';

const ReaderRecommendList = ({
  modalVisible,
  setModalVisible,
  allSelect,
  authorListData,
}) => {
  const navigation = useNavigation();
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
            {filterAuthor.map((data, index) =>
              data.writerInfo.nickName === '탈퇴한 회원 입니다.' ? null : (
                <TouchableOpacity
                  onPress={() => onPressAuthor(data)}
                  key={index}>
                  <AuthorListItem data={data}></AuthorListItem>
                </TouchableOpacity>
              ),
            )}
            <View style={{height: 200, backgroundColor: 'white'}}></View>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              height: 400,
            }}>
            <FastImage
              style={{width: 261, height: 193, marginTop: 90}}
              source={NoHeartAuthor}></FastImage>
          </View>
        )}
      </View>
    </View>
  );
};

export default ReaderRecommendList;
