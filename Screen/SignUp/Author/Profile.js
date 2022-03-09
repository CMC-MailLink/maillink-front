import React, {useState, useEffect} from 'react';
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
import SignUpAuthorProfile from '../../../assets/images/SignUpAuthorProfile.png';
import AuthorSuccessModal from './AuthorSuccessModal';
const Profile = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const onPressModalConfirm = () => {
    setModalVisible(!modalVisible);
  };
  const goNextScreen = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'ProfileIntro',
    });
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

      {/* footer: Button, Pass*/}
      <View style={styles.footer}>
        {/* footer: Button*/}
        <TouchableOpacity onPress={goNextScreen} style={styles.buttonAble}>
          <View>
            <Text style={styles.buttonAbleText}>시작</Text>
          </View>
        </TouchableOpacity>
        {/* footer: Pass*/}
        <TouchableWithoutFeedback onPress={onPressModalConfirm}>
          <View>
            <Text style={styles.footerPassText}>다음에 할께요</Text>
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
    position: 'absolute',
    top: 90,
    width: 350,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#BEBEBE',
    justifyContent: 'center',
    alignItems: 'center',
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
  footer: {
    marginTop: 44,
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
  },
  footerPassText: {
    top: 137 + 21,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    textDecorationLine: 'underline',
    left: -20,
  },
});

export default Profile;
