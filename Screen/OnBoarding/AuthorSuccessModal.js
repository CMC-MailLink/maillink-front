import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NewCheckModal from '../../assets/images/NewCheckModal.png';
import NoticeModal from './NoticeModal';

const AuthorSuccessModal = ({
  setModalConfirm,
  setModalConfirm2,
  modalVisible,
  setModalVisible,
}) => {
  const onPressModalConfirm2 = () => {
    setModalVisible(!modalVisible);
    setModalVisible2(!modalVisible2);
  };
  const [modalVisible2, setModalVisible2] = useState(false);
  // useEffect(() => {
  //   if (modalConfirm2) {
  //     setModalVisible2(!modalVisible2);
  //     setModalVisible(!modalVisible);
  //     myContext.setIsReader('WRITER');
  //   }
  // }, [setModalVisible, modalVisible2, modalVisible, modalConfirm2, myContext]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible(!modalVisible2);
        }}>
        <NoticeModal
          modalVisible={modalVisible2}
          setModalVisible={setModalVisible2}
          setModalConfirm={setModalConfirm2}
        />
      </Modal>
      <View style={styles.modalView}>
        <Image
          style={{width: 70, height: 70, top: -78 + 53}}
          source={NewCheckModal}
        />
        <Text style={styles.modalText}>
          프로필 설정<Text styles={styles.modalText2}>이</Text>
        </Text>
        <Text style={styles.modalText}>
          <Text style={styles.modalText3}>완료되었습니다.</Text>
        </Text>
        <View style={styles.modalButtonView}>
          <TouchableOpacity onPress={onPressModalConfirm2}>
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
  modalText: {
    includeFontPadding: false,
    top: -33 + 17,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 24,
    color: '#3C3C3C',
  },
  modalText2: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 24,
    color: '#3C3C3C',
  },
  modalText3: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 24,
    color: '#3C3C3C',
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
export default AuthorSuccessModal;
