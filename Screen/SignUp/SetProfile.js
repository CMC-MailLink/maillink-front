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
import BackMail2 from '../../assets/images/BackMail2.png';
import SignUpStep2 from '../../assets/images/SignUpStep2.png';
import ProfileBasicImage from '../../assets/images/ProfileBasicImage.png';
import {useNavigation} from '@react-navigation/native';
const SetProfile = () => {
  const navigation = useNavigation();
  const [name, onChangeName] = useState('');

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressNameConfirm = () => {
    onChangeName();
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
      <View style={{top: 111.76, left: 137.27}}>
        <TextInput
          style={styles.NameSet}
          onChangeText={onChangeName}
          value={name}
          placeholder="닉네임을 입력해주세요."
        />
        <TouchableOpacity
          onPress={onPressNameConfirm}
          style={styles.confirmBasic}>
          <Text style={styles.confirmBasicText}>확인</Text>
        </TouchableOpacity>
        <View style={styles.bodyNameBorder} />
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
  NameSet: {
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
    paddingTop: 35 + 17,
  },
  confirmBasic: {
    position: 'absolute',
    bottom: 34,
    right: 21 + 20,
    width: 69,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBasicText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
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

export default SetProfile;
