import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {ReaderAPI} from '../../../API/ReaderAPI';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import FastImage from 'react-native-fast-image';

import EraseNickname from '../../../assets/images/EraseNickname.png';

const ReaderProfileModal = ({
  editName,
  setEditName,
  modalVisible,
  setModalVisible,
  onPressModalConfirm,
}) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(0);
  const [originName, setOriginName] = useState('');

  useState(() => {
    setOriginName(editName);
  }, []);

  //닉네임 전체 지우기 버튼
  const onPressErase = () => {
    setEditName('');
  };

  //닉네임 확인 버튼
  const onPressEdit = async () => {
    if (editName === originName) {
      onPressModalConfirm();
      return;
    }
    var result = await ReaderAPI.checkNickName({nickName: editName});
    if (result) {
      var result2 = await ReaderAPI.changeNickName({nickName: editName});
      if (result2) {
        await queryClient.refetchQueries(['ReaderInfo']);
        onPressModalConfirm();
      }
    } else {
      setStatus(2);
    }
  };

  useEffect(() => {
    if (editName.length > 6) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  }, [editName]);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalHeader}>이름 수정</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 110,
          }}>
          <TextInput
            style={{
              ...styles.editNameText,
              borderBottomColor: status === 0 ? '#4562F1' : '#FF9B9B',
            }}
            value={editName}
            onChangeText={setEditName}
          />
          <TouchableWithoutFeedback onPress={onPressErase}>
            <FastImage style={styles.eraseButton} source={EraseNickname} />
          </TouchableWithoutFeedback>
        </View>
        {status === 0 ? null : (
          <Text style={styles.modalText}>
            {status == 1
              ? '사용할 수 없는 이름이에요.\n(최대 6자 제한)'
              : '이미 존재하는 닉네임입니다.'}
          </Text>
        )}
        <View style={styles.modalButtonView}>
          <TouchableOpacity
            onPress={() => {
              setEditName(originName);
              setModalVisible(!modalVisible);
            }}>
            <View style={{marginRight: 27}}>
              <Text style={styles.modalCancel}>취소</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressEdit}
            disabled={status === 0 ? false : true}>
            <View>
              <Text style={styles.modalConfirm}>확인</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
  },
  modalView: {
    width: 330,
    height: 296,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    position: 'absolute',
    top: 20,
    includeFontPadding: false,
  },
  modalCancel: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  modalConfirm: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#4562F1',
    includeFontPadding: false,
  },
  editNameText: {
    width: 208,
    color: '#3C3C3C',
    textAlign: 'center',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 24,
    paddingBottom: 10,
    borderBottomWidth: 1,
    includeFontPadding: false,
  },
  modalText: {
    position: 'absolute',
    top: 160,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#BEBEBE',
    textAlign: 'center',
    includeFontPadding: false,
  },
  modalButtonView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 27,
    right: 27,
  },
  eraseButton: {
    width: 12,
    height: 12,
    right: 12,
  },
});
export default ReaderProfileModal;
