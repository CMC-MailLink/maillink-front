import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InfoWeb from '../../../assets/images/InfoWeb.png';
import Clipboard from '@react-native-clipboard/clipboard';
import AppContext from '../../../AppContext';
import SendWriting from '../../../assets/images/PaperAirplane.png';
const WriteConfirmModal = ({
  setModalVisible,
  setModalConfirm,
  onPressSend2,
  onPressConfirm,
}) => {
  const onPressConfirm2 = async () => {
    onPressSend2();
    onPressConfirm();
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image
          style={{
            width: 259,
            height: 254,
            top: -45 + 24,
          }}
          source={SendWriting}
        />
        <View style={styles.modalView2}>
          <Text style={styles.modalText}>글을 발행하겠습니다?</Text>
          <Text style={styles.modalText}>
            <Text style={styles.modalText3}>
              발행한 글은 수정이 불가합니다.
            </Text>
          </Text>
        </View>
        <View style={styles.modalButtonView}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <View style={{marginRight: 26}}>
              <Text style={styles.modalConfirm}>취소</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPressConfirm2();
            }}>
            <View>
              <Text style={styles.modalConfirm2}>발행</Text>
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
    height: 395,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView2: {
    top: 43,
  },
  modalText: {
    includeFontPadding: false,
    top: -70,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
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
    fontSize: 15,
    color: '#828282',
  },
  modalText4: {
    top: -80 + 19,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 16,
    color: '#AFAFAF',
  },
  modalConfirm: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#696969',
  },
  modalConfirm2: {
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
export default WriteConfirmModal;
