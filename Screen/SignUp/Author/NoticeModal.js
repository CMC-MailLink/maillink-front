import React from 'react';
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
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Clipboard from '@react-native-clipboard/clipboard';
import {TouchableWithoutFeedback} from '@gorhom/bottom-sheet';

const NoticeModal = ({
  onPressModalConfirm2,
  modalVisible2,
  setModalVisible2,
}) => {
  const navigation = useNavigation();
  const onPressCopy = () => {
    Clipboard.setString('www.maillink.com');
    Alert.alert('링크가 복사 되었습니다.', {
      text: '확인',
      style: 'cancel',
    });
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image
          style={{width: 270, height: 266, top: -78 + 25}}
          source={InfoWeb}
        />
        <Text style={styles.modalText}>
          웹사이트<Text styles={styles.modalText2}>에서도 편하게</Text>
        </Text>
        <Text style={styles.modalText}>
          <Text style={styles.modalText3}>글을 작성하고 발행해보세요! </Text>
        </Text>
        <Text style={styles.modalText4}>www.malink.com </Text>
        <View style={styles.modalButtonView}>
          <TouchableOpacity
            onPress={() => Clipboard.setString('www.maillink.com')}>
            <View style={{marginRight: 26}}>
              <Text style={styles.modalConfirm}>링크복사</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressModalConfirm2}>
            <View>
              <Text style={styles.modalConfirm2}>확인</Text>
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
    height: 402,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 20,
    color: '#3C3C3C',
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
export default NoticeModal;
