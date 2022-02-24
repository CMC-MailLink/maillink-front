import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BackMail2 from '../../assets/images/BackMail2.png';
import SignUpStep1 from '../../assets/images/SignUpStep1.png';
import {useNavigation} from '@react-navigation/native';
const SelfAuth = () => {
  const navigation = useNavigation();
  const [name, onChangeName] = useState('');
  const [phone, onChangePhone] = useState('');
  const [authRequest, setAuthRequest] = useState(false);
  const onPressRequest = () => {
    authRequest(!setAuthRequest);
  };
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
        source={SignUpStep1}
      />
      <View style={{top: 20 + 15.22, left: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.NameTitle}>본인인증</Text>
          <Text style={styles.IntroTitle}>을</Text>
        </View>
        <Text style={styles.IntroTitle}>진행해주세요.</Text>
      </View>
      {/* Body: Name */}
      <View style={{top: 25 + 58, left: 21.11}}>
        <Text style={styles.BodyTitle}>이름</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="이름을 입력해주세요."
        />
        <View style={styles.bodyNameBorder} />
      </View>
      {/* Body: Phone */}
      <View style={{top: 10 + 148, left: 21.11}}>
        <Text style={styles.BodyTitle}>휴대전화 인증</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePhone}
          value={phone}
          placeholder="휴대전화 번호 입력"
        />
        <TouchableOpacity
          onPress={onPressRequest}
          style={authRequest ? styles.authRequest : styles.authNotRequest}>
          <View>
            <Text
              style={authRequest ? styles.authRequest : styles.authNotRequest}>
              인증요청
            </Text>
          </View>
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
  BodyTitle: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
  },
  input: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#3C3C3C',
    paddingTop: 14,
  },
  bodyNameBorder: {
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBE',
    paddingTop: 14,
  },
  authRequest: {
    position: 'absolute',
    right: 20,
    width: 69,
    height: 24,
    borderRadius: 15,
    borderColor: '#BEBEBE',
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    fontColor: '#BEBEBE',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authNotRequest: {
    position: 'absolute',
    right: 20,
    width: 69,
    height: 24,
    borderRadius: 15,
    borderColor: 'red',
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelfAuth;
