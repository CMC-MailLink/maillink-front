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
  Alert,
  Modal,
  Keyboard,
} from 'react-native';
import SignUpStep1 from '../../assets/images/SignUpStep1.png';
import BackMail2 from '../../assets/images/BackMail2.png';
import {useNavigation} from '@react-navigation/native';
import AuthorSuccessModal from './AuthorSuccessModal';
import AppContext from '../../AppContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ProfileIntro = () => {
  const myContext = useContext(AppContext);
  const navigation = useNavigation();
  const [introText, onChangeIntroText] = useState('');
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [textCount, setTextCount] = useState(0);
  const [enterCount, setenterCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const onPressModalConfirm = () => {
    setModalVisible(!modalVisible);
  };
  const onPressBack = () => {
    navigation.goBack();
  };

  const goNextScreen = () => {
    navigation.navigate('OnBoardingStacks', {
      screen: 'ProfileInterest',
      params: {
        introduction: introText,
      },
    });
  };

  useEffect(() => {
    if (introText !== '') {
      setConfirmSuccess(true);
    } else {
      setConfirmSuccess(false);
    }
    setTextCount(introText.length);
    if (this.keyCode === 13) {
      setenterCount(enterCount + 1);
    }
  }, [introText, confirmSuccess, enterCount]);

  const onPressSkip = () => {
    myContext.setIsReader('WRITER');
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
          style={{width: 48, height: 32.28, marginTop: 25, marginLeft: 25}}
          source={SignUpStep1}
        />
        <View style={{marginTop: 10, marginLeft: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.nameTitle}>자신</Text>
            <Text style={styles.introTitle}>을</Text>
          </View>
          <Text style={styles.introTitle}>소개해주세요.</Text>
          <Text style={styles.introSub}>작가인 나는 어떤 사람인가요?</Text>
        </View>

        {/* Body: Input */}
        <View
          style={{
            marginTop: 34,
            marginLeft: 20,
            marginRight: 20,
          }}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeIntroText}
            value={introText}
            placeholder="소개를 입력해주세요."
            maxLength={160}
            //MaxHeight(엔터의 개수를 줄인다.)엔터 한번당 20
            maxHeight={200}
            multiline={introText > 160 && enterCount > 5 ? false : true}
            autoCorrect={false}
            autoCapitalize={false}
          />
          <Text style={styles.textCount}> {textCount}/ 160자</Text>
        </View>
      </KeyboardAwareScrollView>
      {/* footer: Button pass */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={goNextScreen} style={styles.buttonAble}>
          <View>
            <Text style={styles.buttonAbleText}>다음</Text>
          </View>
        </TouchableOpacity>

        {/* footer: Pass*/}
        <TouchableWithoutFeedback onPress={onPressSkip}>
          <View>
            <Text style={styles.footerPassText}>다음에 할게요</Text>
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
  nameTitle: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 27,
    color: '#3C3C3C',
  },
  textCount: {
    marginTop: 4,
    position: 'absolute',
    right: 0,
    bottom: -30,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
  },
  introTitle: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 27,
    color: '#3C3C3C',
  },
  introSub: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    marginTop: 6,
  },
  input: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#3C3C3C',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBE',
  },
  footer: {
    position: 'static',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
    paddingTop: 5,
    alignItems: 'center',
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
  },
  footerPassText: {
    marginTop: 15,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    textDecorationLine: 'underline',
  },
});

export default ProfileIntro;
