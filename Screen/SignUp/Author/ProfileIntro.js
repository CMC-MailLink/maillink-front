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
import SignUpStep1 from '../../../assets/images/SignUpStep1.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
import {useNavigation} from '@react-navigation/native';

const ProfileIntro = () => {
  const navigation = useNavigation();
  const [introText, onChangeIntroText] = useState('');
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [authRequest, setAuthRequest] = useState(false);
  const [confirmRequest, setConfirmRequest] = useState(false);
  const [textCount, setTextCount] = useState(0);

  const onPressBack = () => {
    navigation.goBack();
  };

  const goAlertIntroText = () => {
    Alert.alert('소개를 입력하세요.', {
      text: '확인',
      style: 'cancel',
    });
  };

  const goNextScreen = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'SetProfile',
    });
  };

  useEffect(() => {
    if (introText !== '') {
      setConfirmSuccess(true);
    } else {
      setConfirmSuccess(false);
    }
    setTextCount(introText.length);
  }, [introText, confirmSuccess]);

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
          <Text style={styles.NameTitle}>자신</Text>
          <Text style={styles.IntroTitle}>을</Text>
        </View>
        <Text style={styles.IntroTitle}>소개해주세요.</Text>
        <Text style={styles.IntroSub}>작가인 나는 어떤 사람인가요?</Text>
      </View>

      {/* Body: Input */}
      <View style={{top: 10 + 93, left: 21.11}}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeIntroText}
          value={introText}
          placeholder="소개를 입력해주세요."
        />
        <View style={styles.bodyNameBorder} />
        <Text style={styles.IntroTitle}> {}/ 160자</Text>
      </View>

      {/* footer: Button pass */}
      <View style={{left: 22, bottom: -284 + 99}}>
        <TouchableOpacity
          onPress={!introText ? goAlertIntroText : goNextScreen}
          style={confirmSuccess ? styles.buttonAble : styles.buttonDisable}>
          <View>
            <Text
              style={
                confirmSuccess
                  ? styles.buttonAbleText
                  : styles.buttonDisableText
              }>
              다음
            </Text>
          </View>
        </TouchableOpacity>
        {/* footer: Pass*/}
        <TouchableWithoutFeedback>
          <View>
            <Text style={styles.footerPassText}>다음에 할께요</Text>
          </View>
        </TouchableWithoutFeedback>
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
  BodyTitle: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
  },
  input: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 16,
    color: '#BEBEBE',
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
  footerPassText: {
    top: 100 + 44,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    textDecorationLine: 'underline',
    left: -20,
  },
});

export default ProfileIntro;
