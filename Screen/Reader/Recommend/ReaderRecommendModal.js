import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import CloseRecommend from '../../../assets/images/CloseRecommend.png';
import RefreshAllRecommend from '../../../assets/images/RefreshAllRecommend.png';

const ReaderRecommendModal = ({
  modalVisible,
  setModalVisible,
  branch,
  setBranch,
  vive,
  setVive,
  filterAuthor,
  setFilterAuthor,
  author,
}) => {
  const onPressBranch = index => {
    var temp = branch;
    temp[index].select = !temp[index].select;
    setBranch([...temp]);
  };
  const onPressVive = index => {
    var temp = vive;
    temp[index].select = !temp[index].select;
    setVive([...temp]);
  };
  const onPressAll = () => {
    setBranch([
      {category: '시', select: true},
      {category: '소설', select: true},
      {category: '에세이', select: true},
    ]);
    setVive([
      {category: '편안', select: true},
      {category: '맑은', select: true},
      {category: '서정', select: true},
      {category: '잔잔', select: true},
      {category: '명랑', select: true},
      {category: '유쾌', select: true},
      {category: '달달', select: true},
      {category: '키치', select: true},
    ]);
  };
  const submit = () => {
    var temp = author.filter(data => {
      for (var i = 0; i < 3; i++) {
        if (branch[i].select)
          if (data.repBranch === branch[i].category) return true;
      }
      return false;
    });
    temp = temp.filter(data => {
      for (var i = 0; i < 8; i++) {
        if (vive[i].select) if (data.repVive === vive[i].category) return true;
      }
      return false;
    });
    setFilterAuthor([...temp]);
    setModalVisible(false);
  };

  return (
    <View style={styles.bottomView}>
      <View style={styles.modalView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.modalText}>필터</Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 20}}
            onPress={() => setModalVisible(false)}>
            <Image
              style={{width: 14, height: 14}}
              source={CloseRecommend}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.branchView}>
          <Text style={styles.categoryText}>갈래</Text>
          <View style={{flexDirection: 'row'}}>
            {branch.length
              ? branch.map((data, index) => (
                  <TouchableOpacity
                    onPress={e => onPressBranch(index)}
                    key={index}>
                    <View
                      style={{
                        ...styles.itemViewTwo,
                        borderColor: data.select ? '#4562F1' : '#EBEBEB',
                      }}>
                      <Text
                        style={{
                          ...styles.itemText,
                          color: data.select ? '#4562F1' : '#828282',
                        }}>
                        {data.category}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              : null}
          </View>
        </View>
        <View style={styles.viveView}>
          <Text style={{...styles.categoryText, marginRight: 17}}>분위기</Text>
          <View>
            <View style={{flexDirection: 'row', marginBottom: 7}}>
              {vive.length
                ? vive.map((data, index) => {
                    if (index > 4) {
                      return null;
                    } else {
                      return (
                        <TouchableOpacity
                          onPress={e => onPressVive(index)}
                          key={index}>
                          <View
                            style={{
                              ...styles.itemViewTwo,
                              borderColor: data.select ? '#4562F1' : '#EBEBEB',
                            }}>
                            <Text
                              style={{
                                ...styles.itemText,
                                color: data.select ? '#4562F1' : '#828282',
                              }}>
                              {data.category}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })
                : null}
            </View>
            <View style={{flexDirection: 'row'}}>
              {vive.length
                ? vive.map((data, index) => {
                    if (index < 5) {
                      return null;
                    } else {
                      return (
                        <TouchableOpacity
                          onPress={e => onPressVive(index)}
                          key={index}>
                          <View
                            style={{
                              ...styles.itemViewTwo,
                              borderColor: data.select ? '#4562F1' : '#EBEBEB',
                            }}>
                            <Text
                              style={{
                                ...styles.itemText,
                                color: data.select ? '#4562F1' : '#828282',
                              }}>
                              {data.category}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })
                : null}
            </View>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
          <TouchableOpacity style={{marginRight: 6}} onPress={onPressAll}>
            <Image
              style={{width: 52, height: 52}}
              source={RefreshAllRecommend}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={submit}>
            <View
              style={{
                width: 292,
                height: 52,
                borderRadius: 26,
                backgroundColor: '#4562F1',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'NotoSansKR-Medium',
                  fontSize: 16,
                  color: '#FFF',
                }}>
                적용
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomView: {
    flex: 1,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(55, 55, 55, 0.3)',
  },
  modalView: {
    width: '100%',
    height: 271,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: 20,
  },
  modalText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    marginLeft: 20,
  },
  branchView: {
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    paddingVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  viveView: {
    paddingVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
    marginRight: 32,
  },
  itemText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
  },
  itemViewTwo: {
    width: 52,
    height: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 26,
    marginRight: 7,
  },
});

export default ReaderRecommendModal;
