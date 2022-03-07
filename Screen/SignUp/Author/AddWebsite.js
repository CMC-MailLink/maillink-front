import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  SuccessModal,
} from 'react-native';
import SignUpStep1 from '../../../assets/images/SignUpStep1.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
import InstaLogo from '../../../assets/images/InstaLogo.png';
import FacebookLogo from '../../../assets/images/FacebookLogo.png';
import URLLogo from '../../../assets/images/URLLogo.png';
import TwitterLogo from '../../../assets/images/TwitterLogo.png';
import {useNavigation} from '@react-navigation/native';
import AuthorSuccessModal from './AuthorSuccessModal';

const AddWebsite = () => {
  const navigation = useNavigation();
  const [twitterText, onChangeTwitterText] = useState('');
  const [instaText, onChangeInstaText] = useState('');
  const [urlText, onChangeUrlText] = useState('');
  const [facebookText, onChangeFacebookText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmSuccess, setConfirmSuccess] = useState(true);

  const onPressBack = () => {
    navigation.goBack();
  };

  const goNextScreen = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'AuthorSuccessModal',
    });
  };
  const onPressModalConfirm = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0}} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <AuthorSuccessModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onPressModalConfirm={onPressModalConfirm}
        />
      </Modal>

      {/* upperHeader */}
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* mainHeader */}
      <Image
        style={{width: 48, height: 32.28, top: 25, left: 25}}
        source={SignUpStep1}
      />
      <View style={{top: 20 + 15.22, left: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.nameTitle}>웹사이트</Text>
          <Text style={styles.introTitle}>를</Text>
        </View>
        <Text style={styles.introTitle}>추가해주세요.</Text>
        <Text style={styles.introSub}>
          자유롭게 추가해주세요. 독자와 연결됩니다.
        </Text>
      </View>

      {/* Body: Input */}
      <View style={{...styles.inputView, top: 85 + 19}}>
        <Image style={{width: 22, height: 22, top: 7}} source={FacebookLogo} />
        <TextInput
          style={styles.input}
          onChangeText={onChangeFacebookText}
          value={facebookText}
          placeholder="facebook.com/"
        />
        <View style={styles.bodyinputBorder} />
      </View>

      <View style={{...styles.inputView, top: 85 + 19}}>
        <Image style={{width: 22, height: 22, top: 7}} source={TwitterLogo} />
        <TextInput
          style={styles.input}
          onChangeText={onChangeTwitterText}
          value={twitterText}
          placeholder="twitter.com/"
        />
        <View style={styles.bodyinputBorder} />
      </View>

      <View style={{...styles.inputView, top: 85 + 19}}>
        <Image style={{width: 22, height: 22, top: 7}} source={InstaLogo} />
        <TextInput
          style={styles.input}
          onChangeText={onChangeInstaText}
          value={instaText}
          placeholder="instagram.com/"
        />
        <View style={styles.bodyinputBorder} />
      </View>

      <View style={{...styles.inputView, top: 85 + 19}}>
        <Image style={{width: 22, height: 22, top: 7}} source={URLLogo} />
        <TextInput
          style={styles.input}
          onChangeText={onChangeUrlText}
          value={urlText}
          placeholder=""
        />
        <View style={styles.bodyinputBorder} />
      </View>

      {/* Footer: Button pass */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={onPressModalConfirm}
          style={styles.buttonAble}>
          <View>
            <Text style={styles.buttonAbleText}>완료</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 22,
  },
  nameTitle: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 27,
    color: '#3C3C3C',
  },
  introTitle: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 27,
    color: '#3C3C3C',
  },
  introSub: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    marginTop: 6,
  },
  inputView: {
    top: 10 + 93,
    left: 21.11,
  },
  input: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#3C3C3C',
    top: -103 + 82,
    left: 37,
    paddingRight: 40,
  },
  bodyinputBorder: {
    bottom: 22 - 11,
    width: 336,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  footer: {
    position: 'absolute',
    top: 247,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAble: {
    top: 410,
    left: 20,
    right: 21 + 20,
    width: 350,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAbleText: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonDisable: {
    top: 410,
    left: 20,
    width: 350,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#BEBEBE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisableText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  footerPassText: {
    position: 'absolute',
    marginTop: 65 + 340 + 21,
    left: -25,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    textDecorationLine: 'underline',
  },
});

export default AddWebsite;
