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
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import SuccessModal from './SuccessModal';

import BackMail2 from '../../assets/images/BackMail2.png';
import SignUpStep2 from '../../assets/images/SignUpStep2.png';
import DefaultProfile from '../../assets/images/DefaultProfile.png';
import ImageEditProfile from '../../assets/images/ImageEditProfile.png';
import EraseNickname from '../../assets/images/EraseNickname.png';

const SetProfile = () => {
  const navigation = useNavigation();
  const [name, onChangeName] = useState('');
  const [checkMessage, onChangeCheckMessage] = useState('');
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [confirmOverlap, setConfirmOverlap] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [nameData, onChangeNameData] = useState('영이당당당당');

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressErase = () => {
    onChangeName('');
  };
  const onCheckName = () => {
    if (name === nameData) {
      onChangeCheckMessage('이미 존재하는 닉네임입니다.');
      setConfirmSuccess(false);
      setConfirmOverlap(true);
    }
    if (name.length <= 6 && name !== nameData && name) {
      onChangeCheckMessage('사용할 수 있는 이름이에요.');
      setConfirmSuccess(true);
    }
  };
  const onPressModalConfirm = () => {
    setModalVisible(!modalVisible);
  };

  const onPressEditImage = async () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
        maxWidth: 115.47,
        maxHeight: 112.24,
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };
        setImageUri(source);
      }
    });
  };
  const _scrollToInput = reactNode => {
    this.scroll.props.scrollToFocusedInput(reactNode);
  };

  useEffect(() => {
    setConfirmOverlap(false);
    if (name.length > 6) {
      onChangeCheckMessage('사용할 수 없는 이름입니다. (한글 6자 제한)');
      setConfirmSuccess(false);
    }
    if (name === '') {
      setConfirmSuccess(false);
    }
  }, [name]);

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
        <SuccessModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onPressModalConfirm={onPressModalConfirm}
        />
      </Modal>
      {/* upperHeader */}
      <KeyboardAwareScrollView bounces={false} keyboardOpeningTime={0}>
        <View style={styles.headerView}>
          <TouchableWithoutFeedback onPress={onPressBack}>
            <View style={{left: 24}}>
              <Image style={{width: 9.5, height: 19}} source={BackMail2} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* mainHeader */}
        <Image
          style={{width: 48.18, height: 32.4, marginTop: 24, marginLeft: 25}}
          source={SignUpStep2}
        />
        <View style={{marginTop: 10, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.NameTitle}>프로필</Text>
            <Text style={styles.IntroTitle}>을</Text>
          </View>
          <Text style={styles.IntroTitle}>설정해주세요.</Text>
          <Text style={styles.IntroSub}>추후에 변경 가능합니다.</Text>
        </View>

        {/* Body: ProfileImage */}
        <View
          style={{
            marginTop: 66,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'center', width: 115.47}}></View>
          <TouchableWithoutFeedback onPress={onPressEditImage}>
            <Image
              style={{width: 115.47, height: 112.24, borderRadius: 90}}
              source={imageUri == '' ? DefaultProfile : imageUri}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPressEditImage}>
            <Image
              style={{
                width: 40.07,
                height: 40.07,
                top: -40,
                left: 37,
              }}
              source={ImageEditProfile}
              resizeMode="stretch"
            />
          </TouchableWithoutFeedback>
        </View>

        {/* Body: ProfileName */}
        <View
          style={{
            marginTop: 54,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#BEBEBE',
            marginHorizontal: 43,
            paddingBottom: 10,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={!name.length ? styles.NameSetPlaceHolder : styles.NameSet}
              onChangeText={onChangeName}
              value={name}
              placeholder="닉네임 입력 (한글 6자)"
              autoCorrect={false}
            />
            <TouchableWithoutFeedback onPress={onPressErase}>
              <Image style={styles.eraseButton} source={EraseNickname} />
            </TouchableWithoutFeedback>
            <TouchableOpacity
              onPress={onCheckName}
              style={!name ? styles.confirmBasic : styles.confirmChange}>
              <Text
                style={
                  !name ? styles.confirmBasicText : styles.confirmChangeText
                }>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Body: NameCheck */}
        <View style={{marginTop: 9, marginLeft: 42}}>
          <Text style={styles.checkMessage}>{checkMessage}</Text>
        </View>
      </KeyboardAwareScrollView>
      {/* Footer: Button */}
      <View
        style={{
          position: 'static',
          width: '100%',
          paddingHorizontal: 20,
          paddingTop: 5,
          marginBottom: 40,
        }}>
        <TouchableOpacity
          disabled={confirmSuccess ? false : true}
          onPress={confirmSuccess ? () => setModalVisible(true) : !name}
          style={
            confirmSuccess && name ? styles.buttonAble : styles.buttonDisable
          }>
          <View>
            <Text
              style={
                confirmSuccess && name
                  ? styles.buttonAbleText
                  : styles.buttonDisableText
              }>
              완료
            </Text>
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
  NameTitle: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 27,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  IntroTitle: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 27,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  IntroSub: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    marginTop: 6,
    includeFontPadding: false,
  },
  NameSet: {
    width: 190,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  NameSetPlaceHolder: {
    width: 190,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 18,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  bodyNameBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBE',
    paddingTop: 15,
  },
  bodyNameBorderChange: {
    borderBottomWidth: 1,
    borderBottomColor: '#FF9B9B',
    paddingTop: 15,
  },
  confirmBasic: {
    position: 'absolute',
    right: 0,
    width: 69,
    height: 28,
    borderRadius: 15,
    borderColor: '#BEBEBE',
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBasicText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  confirmChange: {
    position: 'absolute',
    right: 0,
    width: 69,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmChangeText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  buttonDisable: {
    width: '100%',
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
    includeFontPadding: false,
  },
  buttonAble: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAbleText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  eraseButton: {
    width: 12,
    height: 12,
    position: 'absolute',
    right: 80,
  },
  checkMessage: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
});

export default SetProfile;
