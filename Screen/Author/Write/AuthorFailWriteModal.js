import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

import FailWriting from '../../../assets/images/FailWriting.png';

const AuthorFailWriteModal = ({setModalFailVisible}) => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image
          style={{
            width: 206,
            height: 199,
          }}
          source={FailWriting}
        />
        <View style={styles.modalView2}>
          <Text style={styles.modalText}>발행에 실패하였습니다.</Text>
          <Text style={styles.modalText3}>이모티콘 사용은 불가합니다.</Text>
        </View>
        <Text style={styles.modalText4}>
          오류를 신고하시겠습니까?{'\n'}maillink.youngdung@gmail.com
        </Text>
        <View style={styles.modalButtonView}>
          <TouchableOpacity
            onPress={async () => {
              setModalFailVisible(false);
              await Linking.openURL('mailto:maillink.youngdung@gmail.com');
            }}>
            <View style={{marginRight: 26}}>
              <Text style={styles.modalConfirm}>신고</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalFailVisible(false);
            }}>
            <View>
              <Text style={styles.modalConfirm2}>닫기</Text>
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
    height: 426,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView2: {
    width: 257,
    paddingVertical: 15,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  modalText: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    color: '#3C3C3C',
    textAlign: 'center',
  },
  modalText3: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 15,
    color: '#828282',
    textAlign: 'center',
  },
  modalText4: {
    marginTop: 15,
    marginBottom: 35,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 12,
    color: '#BEBEBE',
    textAlign: 'center',
    includeFontPadding: false,
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
export default AuthorFailWriteModal;
