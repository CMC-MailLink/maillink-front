import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import ModalCheck from '../../assets/images/ModalCheck.png';
const SuccessModal = ({ onPressModalConfirm }) => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image
          style={{ width: 70, height: 70, top: -78 + 53 }}
          source={ModalCheck}
        />
        <Text style={styles.modalText}>프로필 설정</Text>
        <Text style={styles.modalText2}>이</Text>
        <Text style={{}}>완료되었습니다.</Text>
        <View style={styles.modalButtonView}>
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
  modalText: {
    top: -33 + 17,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 24,
    color: '#3C3C3C',
  },
  modalText2: {
    top: -10 + 1,
    right: 87,
    position: 'absolute',
    fontFamily: 'NotoSansKR-Light',
    fontSize: 24,
    color: '#3C3C3C',
  },
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
  modalButtonView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 27,
    right: 27,
  },
});
export default SuccessModal;
