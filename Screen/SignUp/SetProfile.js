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
import BackMail2 from '../../assets/images/BackMail2.png';
import SignUpStep2 from '../../assets/images/SignUpStep2.png';
import {useNavigation} from '@react-navigation/native';
const SetProfile = () => {
  const navigation = useNavigation();
  const [name, onChangeName] = useState('');
  const [phone, onChangePhone] = useState();
  const [number, onChangeNumber] = useState();
  const [authRequest, setAuthRequest] = useState(false);
  const [confirmRequest, setConfirmRequest] = useState(false);
  const [realNumber, setrealNumber] = useState(1234);
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [checkbox, setcheckbox] = useState(false);
  const onPressBack = () => {
    navigation.goBack();
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
      {/* Body: Profile */}
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
