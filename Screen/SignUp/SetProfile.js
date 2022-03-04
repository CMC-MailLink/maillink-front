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
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BackMail2 from '../../assets/images/BackMail2.png';
import SignUpStep2 from '../../assets/images/SignUpStep2.png';
import DefaultProfile from '../../assets/images/DefaultProfile.png';
import ImageEditProfile from '../../assets/images/ImageEditProfile.png';
import EraseNickname from '../../assets/images/EraseNickname.png';
import {useNavigation} from '@react-navigation/native';
import SuccessModal from './SuccessModal';

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
    if (!name) {
      Alert.alert('닉네임을 입력하세요.', {
        text: '확인',
        style: 'cancel',
      });
    }
    if (name.length > 6) {
      Alert.alert('사용할 수 없는 이름입니다.', {
        text: '확인',
        style: 'cancel',
      });
    }
    if (name === nameData) {
      Alert.alert('중복되는 이름입니다.', {
        text: '확인',
        style: 'cancel',
      });
      onChangeCheckMessage('이미 존재하는 닉네임입니다.');
      setConfirmSuccess(false);
      setConfirmOverlap(true);
    }
    if (name.length <= 6 && name !== nameData && name) {
      Alert.alert('사용할 수 있는 이름입니다.', {
        text: '확인',
        style: 'cancel',
      });
      onChangeCheckMessage('사용할 수 있는 이름이에요.');
      setConfirmSuccess(true);
    }
  };
  const goAlertName = () => {
    Alert.alert('닉네임을 입력하세요.', {
      text: '확인',
      style: 'cancel',
    });
  };
  const goNextScreen = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'SuccessModal',
    });
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

  useEffect(() => {
    setConfirmOverlap(false);
    if (name.length > 6) {
      onChangeCheckMessage('사용할 수 없는 이름입니다. (한글 6자 제한)');
      setConfirmSuccess(false);
    }
    if (name === '') {
      onChangeCheckMessage('한글 6자까지 설정 가능합니다.');
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
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* mainHeader */}
      <Image
        style={{width: 39.05, height: 30.44, top: 25, left: 25}}
        source={SignUpStep2}
      />
      <View style={{top: 20 + 15.22, left: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.NameTitle}>프로필</Text>
          <Text style={styles.IntroTitle}>을</Text>
        </View>
        <Text style={styles.IntroTitle}>설정해주세요.</Text>
        <Text style={styles.IntroSub}>추후에 변경 가능합니다.</Text>
      </View>

      {/* Body: ProfileImage */}
      <View style={{top: 32.76 + 75.76, left: 137.27}}>
        <TouchableWithoutFeedback onPress={onPressEditImage}>
          <Image
            style={{width: 115.47, height: 112.24, borderRadius: 90}}
            source={imageUri == '' ? DefaultProfile : imageUri}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressEditImage}>
          <Image
            style={{width: 61.07, height: 61.07, top: -45, left: 69}}
            source={ImageEditProfile}
          />
        </TouchableWithoutFeedback>
      </View>

      {/* Body: ProfileName */}
      <View style={{top: 38 + 59, left: 137.27}}>
        <TextInput
          style={!name ? styles.NameSetPlaceHolder : styles.NameSet}
          onChangeText={onChangeName}
          value={name}
          placeholder="닉네임을 입력해주세요."
        />
        <TouchableWithoutFeedback onPress={onPressErase}>
          <Image style={styles.eraseButton} source={EraseNickname} />
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={onCheckName}
          style={!name ? styles.confirmBasic : styles.confirmChange}>
          <Text
            style={!name ? styles.confirmBasicText : styles.confirmChangeText}>
            중복 확인
          </Text>
        </TouchableOpacity>

        {/* Body: NameBorder */}
        <View
          style={
            (name.length > 6 || confirmOverlap) && name !== ''
              ? styles.bodyNameBorderChange
              : styles.bodyNameBorder
          }
        />
      </View>

      {/* Body: NameCheck */}
      <View style={{left: 45, top: 107}}>
        <Text style={styles.checkMessage}>{checkMessage}</Text>
      </View>

      {/* footer: Button */}
      <View style={{left: 22, bottom: -245 + 99}}>
        <TouchableOpacity
          onPress={
            confirmSuccess
              ? () => setModalVisible(true)
              : !name
              ? goAlertName
              : null
          }
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
  },
  IntroTitle: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 27,
    color: '#3C3C3C',
  },
  IntroSub: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    marginTop: 6,
  },
  NameSet: {
    top: 59,
    left: -135 + 44,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    color: '#3C3C3C',
  },
  NameSetPlaceHolder: {
    top: 59,
    left: -135 + 44,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 20,
    color: '#BEBEBE',
  },
  bodyNameBorder: {
    width: 301,
    left: -135 + 44,
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBE',
    paddingTop: 15,
  },
  bodyNameBorderChange: {
    width: 301,
    left: -135 + 44,
    borderBottomWidth: 1,
    borderBottomColor: '#FF9B9B',
    paddingTop: 15,
  },
  confirmBasic: {
    position: 'absolute',
    bottom: 10,
    left: 183 - 49,
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
  },
  confirmChange: {
    position: 'absolute',
    bottom: 10,
    left: 183 - 49,
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
  },
  buttonDisable: {
    position: 'absolute',
    top: 90,
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

  buttonAble: {
    position: 'absolute',
    top: 90,
    right: 21 + 20,
    width: 350,
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
  },
  eraseButton: {
    width: 12,
    height: 12,
    marginTop: 41,
    left: 240 - 129,
  },
  checkMessage: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#BEBEBE',
  },
});

export default SetProfile;
