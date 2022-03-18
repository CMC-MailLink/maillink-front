import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import SignUpAuthorProfile from '../../assets/images/SignUpAuthorProfile.png';
import AuthorSuccessModal from './AuthorSuccessModal';
import AppContext from '../../AppContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Profile = () => {
  const myContext = useContext(AppContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const onPressModalConfirm = () => {
    setModalVisible(!modalVisible);
  };
  const goNextScreen = () => {
    navigation.navigate('OnBoardingStacks', {
      screen: 'ProfileIntro',
    });
  };

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

      <KeyboardAwareScrollView bounces={false} keyboardOpeningTime={0}>
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
          <Image
            style={{width: 392, height: 369}}
            source={SignUpAuthorProfile}
          />
        </View>
      </KeyboardAwareScrollView>
      {/* footer: Button, Pass*/}
      <View style={styles.footer}>
        {/* footer: Button*/}
        <TouchableOpacity onPress={goNextScreen} style={styles.buttonAble}>
          <View>
            <Text style={styles.buttonAbleText}>시작</Text>
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
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#BEBEBE',
    justifyContent: 'center',
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
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  footer: {
    position: 'static',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
    paddingTop: 5,
    alignItems: 'center',
  },
  footerPassText: {
    marginTop: 15,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    textDecorationLine: 'underline',
  },
});

export default Profile;
