/* eslint-disable react-native/no-inline-styles */
// eslint-disable react-native/no-inline-styles
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SignUpAPI} from '../../API/SignUpAPI';
import FastImage from 'react-native-fast-image';

import BackMail2 from '../../assets/images/BackMail2.png';
import SignUpStep1 from '../../assets/images/SignUpStep1.png';
import CheckDisabledSelfAuth from '../../assets/images/CheckDisabledSelfAuth.png';
import CheckSelfAuth from '../../assets/images/CheckSelfAuth.png';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const SelfAuth = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const [name, onChangeName] = useState(''); //이름
  const [phone, onChangePhone] = useState(''); //전화번호
  const [number, onChangeNumber] = useState(''); //인증번호
  const [authRequest, setAuthRequest] = useState(false); //인증요청버튼 클릭
  const [realNumber, setrealNumber] = useState(1234); //인증번호 키
  const [confirmSuccess, setConfirmSuccess] = useState(false); //인증 성공 유무
  const [checkbox, setcheckbox] = useState(false); //체크박스 유무
  const [second, setSecond] = useState(0); //타이머 시간
  const [delay, setDelay] = useState(1000);
  const [timerRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      setSecond(second - 1);
    },
    second >= 1 ? delay : null,
  );

  //인증요청 버튼 클릭
  const onPressRequest = async () => {
    setSecond(180);
    const result = await SignUpAPI.codeSending({target: phone});
    if (result) {
      Platform.OS === 'ios'
        ? Alert.alert('인증 번호가 전송되었습니다.', {
            text: '확인',
            style: 'cancel',
          })
        : Alert.alert('인증 번호가 전송되었습니다.', null, [
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]);
      setAuthRequest(true);
    } else {
      Platform.OS === 'ios'
        ? Alert.alert('인증 번호 전송에 실패했습니다.', {
            text: '확인',
            style: 'cancel',
          })
        : Alert.alert('인증 번호 전송에 실패했습니다.', null, [
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]);
    }
  };

  //확인 버튼 클릭
  const onPressConfirm = async () => {
    const result = await SignUpAPI.codeChecking({
      target: phone,
      code: number,
    });
    if (result) {
      // Alert.alert('인증 되었습니다.', {
      //   text: '확인',
      //   style: 'cancel',
      // });
      setConfirmSuccess(true);
    } else {
      // Alert.alert('잘못된 인증 번호 입니다.', {
      //   text: '확인',
      //   style: 'cancel',
      // });
    }
  };

  //뒤로가기
  const onPressBack = () => {
    navigation.goBack();
  };

  //재발송 버튼 클릭
  const goAlertPhoneAdd = async () => {
    setSecond(180);
    const result = await SignUpAPI.codeSending({target: phone});
    if (result) {
      Platform.OS === 'ios'
        ? Alert.alert('재발송 되었습니다.', {
            text: '확인',
            style: 'cancel',
          })
        : Alert.alert('재발송 되었습니다', null, [
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]);
      setAuthRequest(true);
    } else {
    }
  };

  //다음 버튼 클릭
  const goNextScreen = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'SetProfile',
      params: {...params, phoneNumber: phone},
    });
  };

  return (
    <View
      style={{
        ...Platform.select({
          ios: {flex: 1},
          android: {flex: 0},
        }),
      }}>
      <SafeAreaView style={{flex: 0}} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}
        keyboardOpeningTime={0}
        enableAutomaticScroll={true}
        scrollEnabled={true}
        resetScrollToCoords={{x: 0, y: 0}}>
        {/* upperHeader */}
        <View style={styles.headerView}>
          <TouchableWithoutFeedback onPress={onPressBack}>
            <View style={{left: 24}}>
              <FastImage style={{width: 9.5, height: 19}} source={BackMail2} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* mainHeader */}
        <FastImage
          style={{width: 48, height: 32.28, marginTop: 24, marginLeft: 25}}
          source={SignUpStep1}
        />
        <View style={{marginTop: 10, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.NameTitle}>본인인증</Text>
            <Text style={styles.IntroTitle}>을</Text>
          </View>
          <Text style={styles.IntroTitle}>진행해주세요.</Text>
        </View>

        {/* Body: Name */}
        <View
          style={{
            marginTop: 39,
            marginHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#BEBEBE',
            ...Platform.select({
              ios: {paddingBottom: 10},
              android: {
                paddingTop: 0,
              },
            }),
            height: 67,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.BodyTitle}>이름</Text>
          <TextInput
            editable={!confirmSuccess ? true : false}
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="이름을 입력해주세요."
          />
        </View>

        {/* Body: Phone */}
        <View
          style={{
            marginTop: 81,
            paddingHorizontal: 20,
            height: 113,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.BodyTitle}>휴대전화 인증</Text>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#BEBEBE',
              borderColor: '#BEBEBE',
              // paddingBottom: 10,
              ...Platform.select({
                ios: {paddingBottom: 10},
                android: {
                  paddingTop: 10,
                },
              }),
            }}>
            <TextInput
              editable={name.length && !confirmSuccess ? true : false}
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={onChangePhone}
              value={phone}
              placeholder="휴대전화 번호 입력"
            />

            {authRequest ? (
              <View
                style={{
                  ...Platform.select({
                    ios: {marginLeft: 150},
                    android: {
                      position: 'absolute',
                      right: 0,
                      marginTop: 7,
                    },
                  }),
                }}>
                {/* timer */}
                <View style={{position: 'absolute', right: 80}}>
                  {!confirmSuccess ? (
                    <Text style={styles.timerText}>
                      {Math.floor(second / 60)}:
                      {second % 60 < 10 ? '0' + (second % 60) : second % 60}
                    </Text>
                  ) : null}
                </View>
                {/* 버튼 */}
                <TouchableOpacity
                  disabled={confirmSuccess}
                  onPress={goAlertPhoneAdd}
                  style={
                    confirmSuccess
                      ? styles.basicAuthRequest
                      : styles.authRequest
                  }>
                  <View>
                    <Text
                      style={
                        confirmSuccess
                          ? styles.basicAuthRequestText
                          : styles.authRequestText
                      }>
                      재발송
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                disabled={phone.length ? false : true}
                onPress={onPressRequest}
                style={
                  phone.length
                    ? styles.changeAuthRequest
                    : styles.basicAuthRequest
                }>
                <View>
                  <Text
                    style={
                      phone.length
                        ? styles.changeAuthRequestText
                        : styles.basicAuthRequestText
                    }>
                    인증요청
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Body: AuthRequest */}
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#BEBEBE',
              paddingBottom: 10,
              ...Platform.select({
                ios: {},
                android: {marginBottom: -10},
              }),
            }}>
            <TextInput
              editable={authRequest && !confirmSuccess ? true : false}
              keyboardType="number-pad"
              style={{
                ...Platform.select({
                  ios: {...styles.input},
                  android: {...styles.input, marginBottom: -10},
                }),
              }}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="인증 번호 입력"
            />
            {/* {Platform.select({
              ios: (
                <TextInput
                  editable={authRequest && !confirmSuccess ? true : false}
                  keyboardType="number-pad"
                  style={styles.input}
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="인증 번호 입력"
                />
              ),
              android: (
                <TextInput
                  editable={authRequest && !confirmSuccess ? true : false}
                  keyboardType="number-pad"
                  style={phone ? styles.inputAndroid : styles.input}
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="인증 번호 입력"
                />
              ),
            })} */}
            {/* Body: confirmRequest */}
            <TouchableOpacity
              disabled={!number.length || confirmSuccess ? true : false}
              onPress={onPressConfirm}
              style={
                !number.length || confirmSuccess
                  ? styles.basicAuthRequest2
                  : styles.changeAuthRequest2
              }>
              <View>
                <Text
                  style={
                    !number.length || confirmSuccess
                      ? styles.basicAuthRequestText
                      : styles.changeAuthRequestText
                  }>
                  확인
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Body: number */}
        <View
          style={{
            marginTop: 25,
            paddingHorizontal: 22,
            flexDirection: 'row',
          }}>
          {/* <CheckBox
            disabled={false}
            onClick={onPressCheckBox}
            style={styles.checkbox}
            isChecked={checkbox}
            checkedCheckBoxColor="#4562F1"
            uncheckedCheckBoxColor="#EBEBEB"
            checkBoxColor="#EBEBEB"
          /> */}
          {checkbox ? (
            <TouchableWithoutFeedback onPress={() => setcheckbox(false)}>
              <FastImage
                style={{width: 23, height: 23}}
                source={CheckSelfAuth}
              />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => setcheckbox(true)}>
              <FastImage
                style={{width: 23, height: 23}}
                source={CheckDisabledSelfAuth}
              />
            </TouchableWithoutFeedback>
          )}

          <Text style={styles.rulesText}>
            메일링크 가입 약관에 모두 동의합니다
          </Text>
          <TouchableOpacity
            onPress={async () =>
              Linking.openURL(
                'https://amazing-coach-6d7.notion.site/22d825a0e7b74268841a8bda25fcc57e',
              )
            }
            style={{position: 'absolute', right: 22}}>
            <Text style={styles.example}>보기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {/* footer: Button */}
      <View
        style={{
          position: 'static',
          width: '100%',
          paddingHorizontal: 20,
          marginBottom: 40,
          paddingTop: 5,
          ...Platform.select({
            android: {
              paddingTop: 74 - 25,
            },
          }),
        }}>
        <TouchableOpacity
          // disabled={!confirmSuccess && !checkbox}
          onPress={goNextScreen}
          style={
            confirmSuccess && checkbox
              ? styles.buttonAble
              : styles.buttonDisable
          }>
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
  BodyTitle: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  input: {
    width: 200,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
    ...Platform.select({
      android: {padding: 0, paddingBottom: 8, height: 30},
    }),
  },
  timer: {
    left: 239,
    bottom: 17,
    includeFontPadding: false,
  },
  basicAuthRequest: {
    width: 69,
    height: 24,
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    backgroundColor: '#fff',
    borderColor: '#BEBEBE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {marginTop: 5},
    }),
  },
  basicAuthRequest2: {
    width: 69,
    height: 24,
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    backgroundColor: '#fff',
    borderColor: '#BEBEBE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {marginTop: -4},
    }),
  },
  basicAuthRequestText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  changeAuthRequest: {
    width: 69,
    height: 24,
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {marginTop: 5},
    }),
  },
  changeAuthRequest2: {
    width: 69,
    height: 24,
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {marginTop: -4},
    }),
  },
  changeAuthRequestText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  authRequest: {
    width: 69,
    height: 24,
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
    includeFontPadding: false,
  },
  authRequestText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  rulesText: {
    marginLeft: 14,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
    includeFontPadding: false,
  },
  example: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
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
  timerText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#4562F1',
    includeFontPadding: false,
  },
});

export default SelfAuth;
