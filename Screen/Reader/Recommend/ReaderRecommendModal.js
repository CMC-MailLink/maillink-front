import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import CloseRecommend from '../../../assets/images/CloseRecommend.png';
import RefreshAllRecommend from '../../../assets/images/RefreshAllRecommend.png';

const ReaderRecommendModal = ({
  setModalVisible,
  setBranch,
  setVive,
  branch,
  vive,
}) => {
  const [tempBranch, setTempBranch] = useState(branch); //적용 전 branch
  const [tempVive, setTempVive] = useState(vive); //적용 전 vive

  const onPressBranch = index => {
    var temp = tempBranch;
    temp[index].select = !temp[index].select;
    setTempBranch([...temp]);
  };

  const onPressVive = index => {
    var temp = tempVive;
    temp[index].select = !temp[index].select;
    setTempVive([...temp]);
  };

  const onPressAll = () => {
    setTempBranch([
      {name: 'Poetry', category: '시', select: true},
      {name: 'Novels', category: '소설', select: true},
      {name: 'Essays', category: '에세이', select: true},
    ]);
    setTempVive([
      {name: 'Comfortable', category: '편안', select: true},
      {name: 'Clear', category: '맑은', select: true},
      {name: 'Lyrical', category: '서정', select: true},
      {name: 'Calm', category: '잔잔', select: true},
      {name: 'Light', category: '명랑', select: true},
      {name: 'Cheerful', category: '유쾌', select: true},
      {name: 'Sweet', category: '달달', select: true},
      {name: 'Kitsch', category: '키치', select: true},
    ]);
  };

  const onPressSubmit = () => {
    setBranch([...tempBranch]);
    setVive([...tempVive]);
    setModalVisible(false);
  };

  return (
    <View style={styles.modalBack}>
      <View style={styles.modalView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.modalText}>필터</Text>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setModalVisible(false)}>
            <FastImage
              style={{width: 14, height: 14}}
              source={CloseRecommend}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.branchView}>
          <Text style={styles.categoryText}>갈래</Text>
          <View style={{flexDirection: 'row'}}>
            {tempBranch.length
              ? tempBranch.map((data, index) => (
                  <TouchableOpacity
                    onPress={e => onPressBranch(index)}
                    key={index}>
                    <View
                      style={{
                        ...styles.itemView,
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
          <Text style={styles.categoryText}>분위기</Text>
          <View
            style={{
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'row',
              backgroundColor: 'pink',
              height: 55,
            }}>
            {tempVive.length
              ? tempVive.map((data, index) => {
                  return (
                    <TouchableOpacity
                      onPress={e => onPressVive(index)}
                      key={index}>
                      <View
                        style={{
                          ...styles.itemView,
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
                })
              : null}
          </View>
        </View>
        <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
          <TouchableOpacity style={{marginRight: 6}} onPress={onPressAll}>
            <FastImage
              style={{width: 52, height: 52}}
              source={RefreshAllRecommend}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressSubmit}
            style={{width: Dimensions.get('window').width - 20 - 52 - 26}}>
            <View
              style={{
                width: '100%',
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
                  includeFontPadding: false,
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
  modalBack: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(55, 55, 55, 0.3)',
  },
  modalView: {
    width: '100%',
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
    includeFontPadding: false,
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
    width: 40,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
    marginRight: 17,
    includeFontPadding: false,
  },
  itemText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    includeFontPadding: false,
  },
  itemView: {
    paddingHorizontal: 12,
    height: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 26,
    marginRight: 7,
  },
  closeIcon: {
    position: 'absolute',
    right: 12,
    top: -6,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReaderRecommendModal;
