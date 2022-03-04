import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import SignUpAuthorProfile from '../../../assets/images/SignUpAuthorProfile.png';
const AuthorProfile = () => {
  const navigation = useNavigation();
  const [name, onChangeName] = useState('');
  const [selected, setSelected] = useState(false);
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [authorSelect, setAuthorSelect] = useState(false);
  const [readerSelect, setReaderSelect] = useState(false);
  const onCheckSelect = () => {};
  const onPressAuthorSelect = () => {
    if (!readerSelect) {
      setAuthorSelect(!authorSelect);
    }
    if (readerSelect && !authorSelect) {
      setReaderSelect(!readerSelect);
      setAuthorSelect(!authorSelect);
    }
  };
  const onPressReaderSelect = () => {
    if (!authorSelect) {
      setReaderSelect(!readerSelect);
    }
    if (authorSelect && !readerSelect) {
      setReaderSelect(!readerSelect);
      setAuthorSelect(!authorSelect);
    }
  };
  const goAlertSelect = () => {
    Alert.alert('한가지 타입을 선택하세요.', {
      text: '확인',
      style: 'cancel',
    });
  };
  const goOnBoarding = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'OnBoarding',
    });
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0}} />

      {/* mainHeader */}
      <Text style={styles.IntroSub}>
        독자들과 연결되도록 나를 소개해보세요.
      </Text>
      <View style={{top: 20 + 15.22, left: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.NameTitle}>작가 프로필</Text>
          <Text style={styles.IntroTitle}>을</Text>
        </View>
        <Text style={styles.IntroTitle}>생성해보세요!</Text>
      </View>

      {/* Body: ProfileName */}
      <View style={{top: 100}}>
        <Image style={{width: 392, height: 369}} source={SignUpAuthorProfile} />
      </View>
      {/* footer: Button */}
      <View style={{left: 22, bottom: -293 + 226}}>
        <TouchableOpacity
          onPress={
            readerSelect || authorSelect
              ? readerSelect
                ? goOnBoarding
                : null
              : goAlertSelect
          }
          style={
            readerSelect || authorSelect
              ? styles.buttonAble
              : styles.buttonDisable
          }>
          <View>
            <Text
              style={
                readerSelect || authorSelect
                  ? styles.buttonAbleText
                  : styles.buttonDisableText
              }>
              시작
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={
              readerSelect || authorSelect
                ? styles.buttonAbleText
                : styles.buttonDisableText
            }>
            시작
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    shadowColor: '#ACBAFF',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.73,
    shadowRadius: 29,
  },
  NameTitle: {
    includeFontPadding: false,
    top: 47,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 27,
    color: '#3C3C3C',
  },
  IntroTitle: {
    includeFontPadding: false,
    top: 47,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 27,
    color: '#3C3C3C',
  },
  IntroSub: {
    left: 20,
    top: 76,
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
  bodyNameBorder: {
    width: 301,
    left: -135 + 44,
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBE',
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
    includeFontPadding: false,
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
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  checkMessage: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#BEBEBE',
  },
});

export default AuthorProfile;
