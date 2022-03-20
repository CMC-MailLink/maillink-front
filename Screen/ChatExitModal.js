import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ChatExitModalExclamMark from '../assets/images/ChatExitModalExclamMark.png';

const ChatExitModal = ({
  onPressModalConfirm,
  modalVisible,
  setModalVisible,
}) => {
  const navigation = useNavigation();
  const goNextScreen = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'OnBoarding',
    });
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image
          style={{width: 60, height: 60, top: -78 + 53}}
          source={ChatExitModalExclamMark}
        />
        <Text style={styles.modalText}>채팅방을 나가시겠습니까?</Text>
        <Text style={styles.modalText2}>
          한 번 나간 채팅은 복구되지 않습니다.
        </Text>
        <View style={styles.modalButtonView}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{right: 15}}>
            <View>
              <Text style={styles.modalExit}>취소</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={goNextScreen}>
            <View>
              <Text style={styles.modalConfirm}>나가기</Text>
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
    height: 240,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    includeFontPadding: false,
    top: -33 + 18,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    color: '#3C3C3C',
    marginTop: 10,
  },
  modalText2: {
    includeFontPadding: false,
    top: -33 + 25,
    fontFamily: 'NotoSansKR-DemiLight',
    fontSize: 15,
    color: '#828282',
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
    color: '#FF5A5A',
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
    bottom: 23,
    right: 27,
  },
  modalExit: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#828282',
  },
});
export default ChatExitModal;
