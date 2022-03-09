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
} from 'react-native';
import CheckBox from 'react-native-check-box';
import BackMail2 from '../../assets/images/BackMail2.png';
import SignUpStep1 from '../../assets/images/SignUpStep1.png';
import Checked from '../../assets/images/Checked.png';
import {useNavigation} from '@react-navigation/native';
const SelfAuth = () => {
  const navigation = useNavigation();
  const [name, onChangeName] = useState('');
  const [phone, onChangePhone] = useState();
  const [number, onChangeNumber] = useState();
  const [authRequest, setAuthRequest] = useState(false);
  const [confirmRequest, setConfirmRequest] = useState(false);
  const [realNumber, setrealNumber] = useState(1234);
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [checkbox, setcheckbox] = useState(false);

  const onPressRequest = () => {
    setAuthRequest(true);
    Alert.alert('인증 번호가 전송되었습니다.', {
      text: '확인',
      style: 'cancel',
    });
  };
  const onPressConfirm = () => {
    setConfirmRequest(true);
    if (parseInt(number) === realNumber) {
      Alert.alert('인증 되었습니다.', {
        text: '확인',
        style: 'cancel',
      });
      setConfirmSuccess(true);
    } else {
      Alert.alert('잘못된 인증 번호 입니다.', {
        text: '확인',
        style: 'cancel',
      });
    }
  };
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressCheckBox = () => {
    setcheckbox(!checkbox);
  };
  const goAlertName = () => {
    Alert.alert('이름을 입력하세요.', {
      text: '확인',
      style: 'cancel',
    });
  };
  const goAlertPhone = () => {
    if (!authRequest) {
      Alert.alert('인증 요청을 하세요.', {
        text: '확인',
        style: 'cancel',
      });
      return 0;
    }
    Alert.alert('휴대전화 번호를 입력하세요.', {
      text: '확인',
      style: 'cancel',
    });
  };
  const goAlertPhoneAdd = () => {
    Alert.alert('재발송 되었습니다.', {
      text: '확인',
      style: 'cancel',
    });
  };
  const goAlertConfirm = () => {
    Alert.alert('인증 번호를 입력하세요.', {
      text: '확인',
      style: 'cancel',
    });
  };
  const goNextScreen = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'SetProfile',
    });
  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0}} />
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
          <Text style={styles.NameTitle}>본인인증</Text>
          <Text style={styles.IntroTitle}>을</Text>
        </View>
        <Text style={styles.IntroTitle}>진행해주세요.</Text>
      </View>
      {/* Body: Name */}
      <View style={{top: 25 + 58, left: 21.11}}>
        <Text style={styles.BodyTitle}>이름</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="이름을 입력해주세요."
        />
        <View style={styles.bodyNameBorder} />
      </View>
      {/* Body: Phone */}
      <View style={{top: 10 + 148, left: 21.11}}>
        <Text style={styles.BodyTitle}>휴대전화 인증</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePhone}
          value={phone}
          placeholder="휴대전화 번호 입력"
        />
        {/* Body: AuthRequest */}
        {authRequest ? (
          <TouchableOpacity
            onPress={goAlertPhoneAdd}
            style={styles.authRequest}>
            <View>
              <Text style={styles.authRequestText}>재발송</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={!phone ? goAlertPhone : onPressRequest}
            style={!phone ? styles.basicAuthRequest : styles.changeAuthRequest}>
            <View>
              <Text
                style={
                  !phone
                    ? styles.basicAuthRequestText
                    : styles.changeAuthRequestText
                }>
                인증요청
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.bodyNameBorder} />
      </View>
      {/* Body: number */}
      <View style={{top: 15 + 148, left: 21.11}}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="인증 번호 입력"
        />
        {/* Body: confirmRequest */}
        {confirmRequest && authRequest ? (
          <TouchableOpacity
            onPress={!confirmSuccess ? onPressConfirm : null}
            style={styles.confirmCheck}>
            <View>
              <Text style={styles.authRequestText}>확인</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={
              !number
                ? goAlertConfirm
                : !authRequest
                ? goAlertPhone
                : onPressConfirm
            }
            style={
              !number ? styles.basicAuthRequest : styles.changeAuthRequest
            }>
            <View>
              <Text
                style={
                  !number
                    ? styles.basicAuthRequestText
                    : styles.changeAuthRequestText
                }>
                확인
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.bodyNameBorder} />
      </View>
      {/* Body: number */}
      <View style={{left: 22, top: 160 + 25}}>
        <CheckBox
          disabled={false}
          onClick={onPressCheckBox}
          style={styles.checkbox}
          isChecked={checkbox}
          checkedCheckBoxColor="#4562F1"
          uncheckedCheckBoxColor="#EBEBEB"
          checkBoxColor="#EBEBEB"
        />
        <Text style={styles.rulesText}>
          메일링크 가입 약관에 모두 동의합니다
        </Text>
        <Text style={styles.example}>보기</Text>
      </View>

      {/* footer: Button */}
      <View style={{left: 22, bottom: -284 + 99}}>
        <TouchableOpacity
          onPress={
            !name ? goAlertName : !confirmSuccess ? goAlertPhone : goNextScreen
          }
          style={
            confirmSuccess && checkbox && name
              ? styles.buttonAble
              : styles.buttonDisable
          }>
          <View>
            <Text
              style={
                confirmSuccess && checkbox && name
                  ? styles.buttonAbleText
                  : styles.buttonDisableText
              }>
              다음
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
  BodyTitle: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
  },
  input: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#3C3C3C',
    paddingTop: 14,
  },
  bodyNameBorder: {
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBE',
    paddingTop: 14,
  },
  bodyRequestBoarder: {
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBE',
    bottom: 16 - 10,
    paddingTop: -23,
  },
  timer: {
    left: 239,
    bottom: 17,
  },
  basicAuthRequest: {
    position: 'absolute',
    bottom: 10,
    right: 21 + 20,
    width: 69,
    height: 24,
    borderRadius: 15,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  basicAuthRequestText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#BEBEBE',
  },
  changeAuthRequest: {
    position: 'absolute',
    bottom: 10,
    right: 21 + 20,
    width: 69,
    height: 24,
    borderRadius: 15,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeAuthRequestText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  confirmCheck: {
    position: 'absolute',
    top: 19,
    right: 21 + 20,
    width: 69,
    height: 24,
    borderRadius: 15,
    borderColor: '#BEBEBE',
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authRequest: {
    position: 'absolute',
    bottom: 10,
    right: 21 + 20,
    width: 69,
    height: 24,
    borderRadius: 15,
    borderColor: '#BEBEBE',
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authRequestText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#3C3C3C',
  },
  rulesText: {
    position: 'absolute',
    left: 37,
    bottom: 1,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
  },
  example: {
    position: 'absolute',
    left: 296 + 23,
    bottom: 0,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
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
});

export default SelfAuth;
