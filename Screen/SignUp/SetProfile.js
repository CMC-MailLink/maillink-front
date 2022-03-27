import React, {useState, useEffect, useContext} from 'react';
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
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  useNavigation,
  CommonActions,
  useLinkProps,
} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import SuccessModal from './SuccessModal';
import {SignUpAPI} from '../../API/SignUpAPI';
import AppContext from '../../AppContext';

import BackMail2 from '../../assets/images/BackMail2.png';
import SignUpStep2 from '../../assets/images/SignUpStep2.png';
import DefaultProfile from '../../assets/images/DefaultProfile.png';
import ImageEditProfile from '../../assets/images/ImageEditProfile.png';
import EraseNickname from '../../assets/images/EraseNickname.png';
import axios from 'axios';

const SetProfile = ({navigation: {setOptions}, route: {params}}) => {
  const myContext = useContext(AppContext);
  const navigation = useNavigation();
  const [name, onChangeName] = useState(''); //이름
  const [checkMessage, onChangeCheckMessage] = useState(''); //textinput아래 안내 메세지
  const [messageVisible, setMessageVisible] = useState(false); //안내메세지 보이기
  const [confirmSuccess, setConfirmSuccess] = useState(false); //닉네임 확인 성공 유무
  const [nameValid, setNameValid] = useState(false); //닉네임 유효성 검증 유무
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [modalConfirm, setModalConfirm] = useState(false);
  const [nameData, onChangeNameData] = useState('영이당당당당');

  useEffect(() => {
    if (modalConfirm) {
      setModalVisible(!modalVisible);
      // navigation.navigate('OnBoardingStacks', {
      //   screen: 'OnBoarding',
      // });
      myContext.setIsLogged(true);
      myContext.setIsReader('Not Decided');
    }
  }, [modalConfirm, modalVisible, myContext]);

  //뒤로가기
  const onPressBack = () => {
    navigation.goBack();
  };

  //닉네임 전체 지우기 버튼
  const onPressErase = () => {
    onChangeName('');
  };

  //확인 버튼 클릭
  const onCheckName = async () => {
    var result = await SignUpAPI.checkNickName({nickName: name});
    console.log(result);
    if (!result) {
      onChangeCheckMessage('이미 존재하는 닉네임입니다.');
      setMessageVisible(true);
      setNameValid(false);
      console.log('이ㅇㅇ름은: ' + result);
    } else if (name.length > 6) {
      console.log('이ㅇ름은: ' + result);
      onChangeCheckMessage('사용할 수 없는 이름이에요. (한글 6자 제한)');
      setMessageVisible(true);
      setNameValid(false);
    } else if (result) {
      onChangeCheckMessage('사용할 수 있는 이름이에요.');
      setNameValid(true);
      setMessageVisible(true);
      setConfirmSuccess(true);
    }
  };

  //프로필 이미지 수정 버튼
  const onPressEditImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      imageUpload(image.path);
    });
  };

  //프로필 이미지 등록
  const imageUpload = async imagePath => {
    const imageData = new FormData();
    imageData.append('image', {
      uri: imagePath,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });

    const result = await SignUpAPI.profileEditing({image: imageData});
    if (result) {
      setImageUri(result);
    } else {
      console.log('프로필 등록 실패');
    }
  };

  const onPressConfirm = async () => {
    const result = await SignUpAPI.authSignUp({
      socialType: params.socialType,
      socialId: params.socialId,
      nickName: name,
      imgUrl: imageUri,
      phoneNumber: params.phoneNumber,
    });
    if (result) {
      setModalVisible(true);
    } else {
      Alert.alert('회원가입 실패', {
        text: '확인',
        style: 'cancel',
      });
    }
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
        <SuccessModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setModalConfirm={setModalConfirm}
          params={{...params, nickName: name, imgUrl: imageUri}}
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
          <View style={{alignItems: 'center', width: 115.47}} />
          <TouchableWithoutFeedback onPress={onPressEditImage}>
            <Image
              style={{width: 115.47, height: 112.24, borderRadius: 90}}
              defaultSource={DefaultProfile}
              source={imageUri === '' ? DefaultProfile : {uri: imageUri}}
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
            borderBottomColor: name.length
              ? nameValid
                ? '#4562F1'
                : '#FF9B9B'
              : '#BEBEBE',
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
              onChangeText={value => {
                onChangeName(value);
                setMessageVisible(false);
                setConfirmSuccess(false);
                setNameValid(true);
              }}
              value={name}
              placeholder="닉네임 입력 (한글 6자)"
              autoCorrect={false}
              autoCapitalize={false}
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
        {messageVisible ? (
          <View style={{marginTop: 9, marginLeft: 42}}>
            <Text style={styles.checkMessage}>{checkMessage}</Text>
          </View>
        ) : null}
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
          onPress={onPressConfirm}
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
