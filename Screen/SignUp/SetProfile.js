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
} from 'react-native';
import BackMail2 from '../../assets/images/BackMail2.png';
import SignUpStep2 from '../../assets/images/SignUpStep2.png';
import ProfileBasicImage from '../../assets/images/ProfileBasicImage.png';
import EraseNickname from '../../assets/images/EraseNickname.png';
import {useNavigation} from '@react-navigation/native';

const SetProfile = () => {
  const navigation = useNavigation();
  const [name, onChangeName] = useState('');
  const [checkMessage, onChangeCheckMessage] =
    useState('한글 6자까지 설정 가능합니다.');
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [nameData, onChangeNameData] = useState('영이입니당당당');

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressNameConfirm = () => {
    onChangeName(name);
  };
  const onPressErase = () => {
    onChangeName('');
  };
  const onCheckName = () => {
    onChangeName(name);
  };
  const goAlertName = () => {
    Alert.alert('이름을 입력하세요.', {
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
    if (name.length > 6) {
      onChangeCheckMessage('사용할 수 없는 이름이에요. (한글 6자 제한)');
      setConfirmSuccess(false);
    }
    if (name === nameData) {
      onChangeCheckMessage('이미 존재하는 닉네임입니다.');
      setConfirmSuccess(false);
    }
    if (name.length <= 6 && name !== nameData) {
      onChangeCheckMessage('사용할 수 있는 이름이에요');
      setConfirmSuccess(true);
    }
  }, [name, nameData]);

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
      <ScrollView>
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
        <View style={{top: 111.76, left: 137.27}}>
          <Image
            style={{width: 115.47, height: 112.24}}
            source={ProfileBasicImage}
          />
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
            onPress={onPressNameConfirm}
            style={!name ? styles.confirmBasic : styles.confirmChange}>
            <Text
              style={
                !name ? styles.confirmBasicText : styles.confirmChangeText
              }>
              확인
            </Text>
          </TouchableOpacity>
          <View
            style={
              name.length > 6
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
        <View style={{left: 22, top: 160 + 25}}>
          <TouchableOpacity
            //onPress={}
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
                다음
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
