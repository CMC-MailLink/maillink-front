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
  Dimensions,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import SignUpAuthorProfile from '../../assets/images/SignUpAuthorProfile.png';
import AuthorSuccessModal from './AuthorSuccessModal';
import AppContext from '../../AppContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

const Profile = () => {
  const myContext = useContext(AppContext);
  const insets = useSafeAreaInsets();
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

      {/* mainHeader */}
      <View
        style={{
          marginTop: 80,
          marginLeft: 20,
          ...Platform.select({
            android: {marginBottom: -10},
          }),
        }}>
        <Text style={styles.IntroSub}>
          독자들과 연결되도록 나를 소개해보세요.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            ...Platform.select({
              android: {marginTop: -2},
            }),
          }}>
          <Text style={styles.NameTitle}>작가 프로필</Text>
          <Text style={styles.IntroTitle}>을</Text>
        </View>
        <Text style={styles.IntroTitle}>생성해보세요!</Text>
      </View>

      {/* Body: ProfileName */}
      <View
        style={{
          marginTop: 30,
          alignItems: 'center',
          ...Platform.select({
            android: {marginTop: 40},
          }),
        }}>
        <FastImage
          style={{
            width: ((Dimensions.get('window').height / 2) * 369) / 392,
            height: Dimensions.get('window').height / 2,
          }}
          source={SignUpAuthorProfile}
        />
      </View>

      {/* footer: Button, Pass*/}
      <View style={{...styles.bottomView, bottom: insets.bottom + 15}}>
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
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 27,
    color: '#3C3C3C',
  },
  IntroTitle: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 27,
    color: '#3C3C3C',
    ...Platform.select({
      android: {marginTop: 0},
    }),
  },
  IntroSub: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    marginTop: 6,
  },
  buttonAble: {
    marginHorizontal: 20,
    backgroundColor: '#4562F1',
    borderRadius: 26,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonAbleText: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  bottomView: {
    width: '100%',
    position: 'absolute',
  },
  footerPassText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    textAlign: 'center',
    textDecorationLine: 'underline',
    includeFontPadding: false,
  },
});

export default Profile;
