import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const AuthorProfileModal = ({
  editName,
  setEditName,
  modalVisible,
  setModalVisible,
  onPressModalConfirm,
}) => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalHeader}>이름 수정</Text>
        <TextInput
          style={styles.editNameText}
          value={editName}
          onChangeText={setEditName}></TextInput>
        <Text
          style={{
            marginTop: 10,
            ...styles.modalText,
          }}>
          사용할 수 있는 이름이에요.
        </Text>
        <Text style={styles.modalText}>(최대 한글 6자)</Text>
        <View style={styles.modalButtonView}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <View style={{marginRight: 27}}>
              <Text style={styles.modalCancel}>취소</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressModalConfirm}>
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
  },
  modalCancel: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#BEBEBE',
  },
  modalConfirm: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#4562F1',
  },
  editNameText: {
    width: 208,
    color: '#3C3C3C',
    textAlign: 'center',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 24,
    paddingBottom: 10,
    borderBottomColor: '#4562F1',
    borderBottomWidth: 1,
  },
  modalText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#BEBEBE',
  },
  modalButtonView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 27,
    right: 27,
  },
});
export default AuthorProfileModal;
