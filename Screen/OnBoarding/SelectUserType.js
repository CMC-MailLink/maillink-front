import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {signUpAPI} from '../../API/signUpAPI';
import AppContext from '../../AppContext';

import AuthorHover from '../../assets/images/AuthorHover.png';
import AuthorHoverSelected from '../../assets/images/AuthorHoverSelected.png';
import ReaderHover from '../../assets/images/ReaderHover.png';
import ReaderHoverSelected from '../../assets/images/ReaderHoverSelected.png';

const SelectUserType = props => {
  const myContext = useContext(AppContext);
  const navigation = useNavigation();
  const [authorSelect, setAuthorSelect] = useState(false);
  const [readerSelect, setReaderSelect] = useState(false);
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
  const goAuthorProfile = async () => {
    const result = await signUpAPI.memberType({userType: 'WRITER'});
    console.log(result);
    myContext.setIsReader('WRITER');
    navigation.navigate('SignUpStacks', {screen: 'Profile'});
  };
  const goTasteAnalysisProfile = async () => {
    const result = await signUpAPI.memberType({userType: 'READER'});
    myContext.setIsReader('READER');
    navigation.navigate('ReaderStacks', {screen: 'ReaderAnalyze'});
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0}} />

      {/* Header: main */}
      <Text style={styles.IntroSub}>메일링크에 오신걸 환영합니다!</Text>
      <View style={{top: 20 + 15.22, left: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.NameTitle}>메일링크</Text>
          <Text style={styles.IntroTitle}>에서</Text>
        </View>
        <Text style={styles.IntroTitle}>저는</Text>
      </View>

      {/* Body: ProfileName */}
      <View style={{top: 150, left: 20, flexDirection: 'row'}}>
        <TouchableWithoutFeedback
          onPress={onPressReaderSelect}
          style={readerSelect ? styles.select : null}>
          <Image
            style={{width: 175, height: 253}}
            source={readerSelect ? ReaderHoverSelected : ReaderHover}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={onPressAuthorSelect}
          style={authorSelect ? styles.select : null}>
          <Image
            style={{width: 175, height: 253}}
            source={authorSelect ? AuthorHoverSelected : AuthorHover}
          />
        </TouchableWithoutFeedback>
      </View>

      {/* Footer: Button */}
      <View style={{left: 22, bottom: -293 + 111}}>
        <TouchableOpacity
          onPress={
            readerSelect || authorSelect
              ? readerSelect
                ? goTasteAnalysisProfile
                : goAuthorProfile
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
              다음
            </Text>
          </View>
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
    shadowOpacity: 0.23,
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
});

export default SelectUserType;
