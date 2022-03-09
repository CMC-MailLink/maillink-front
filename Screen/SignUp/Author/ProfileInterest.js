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
import SignUpStep1 from '../../../assets/images/SignUpStep1.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
import ExclamationMark from '../../../assets/images/ExclamationMark.png';
import InterestModal from '../../../assets/images/InterestModal.png';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-simple-modal';

const ProfileInterest = () => {
  const navigation = useNavigation();
  const [introText, onChangeIntroText] = useState('');
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [textCount, setTextCount] = useState(0);
  const [enterCount, setenterCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState(false);
  const [branch, setBranch] = useState([
    {category: '시', select: false},
    {category: '소설', select: false},
    {category: '에세이', select: false},
  ]);
  const [vive, setVive] = useState([
    {category: '편안', select: false},
    {category: '맑은', select: false},
    {category: '서정', select: false},
    {category: '잔잔', select: false},
    {category: '명랑', select: false},
    {category: '유쾌', select: false},
    {category: '달달', select: false},
    {category: '키치', select: false},
  ]);
  const onPressBranch = index => {
    var temp = branch;
    temp[index].select = !temp[index].select;
    setBranch([...temp]);
  };
  const onPressVive = index => {
    var temp = vive;
    temp[index].select = !temp[index].select;
    setVive([...temp]);
  };
  const onPressBack = () => {
    navigation.goBack();
  };

  const goAlertIntroText = () => {
    Alert.alert('소개를 입력하세요.', {
      text: '확인',
      style: 'cancel',
    });
  };

  const onPressExclamationMark = () => {
    setModalOpen(!modalOpen);
  };

  const goNextScreen = () => {
    navigation.navigate('SignUpStacks', {
      screen: 'AddWebsite',
    });
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
        style={{width: 48, height: 32.28, top: 25, left: 25}}
        source={SignUpStep1}
      />
      <View style={{top: 20 + 15.22, left: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.nameTitle}>관심사</Text>
          <Text style={styles.introTitle}>를</Text>
        </View>
        <Text style={styles.introTitle}>설정해주세요.</Text>
        <Text style={styles.introSub}>주로 어떤 글을 쓰는 작가인가요?</Text>
      </View>
      <TouchableWithoutFeedback onPress={onPressExclamationMark}>
        <Image
          style={{top: -24, left: -23 + 385 - 20, width: 30, height: 30}}
          source={ExclamationMark}
        />
      </TouchableWithoutFeedback>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalOpen}
        closeOnTouchOutside={true}>
        <Image
          style={{left: -23 + 340, width: 228, height: 187}}
          source={InterestModal}
        />
      </Modal>

      {/* Body: selectLetterType */}
      <View style={styles.categoryView}>
        <View style={styles.branchView}>
          <Text style={styles.categoryText1}>갈래</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              left: 1,
              top: -35 + 18,
            }}>
            {branch.length
              ? branch.map((data, index) => (
                  <TouchableOpacity
                    onPress={e => onPressBranch(index)}
                    key={index}>
                    <View
                      style={{
                        ...styles.itemViewTwo,
                        borderColor: data.select ? '#4562F1' : '#BEBEBE',
                      }}>
                      <Text
                        style={{
                          ...styles.itemText,
                          color: data.select ? '#4562F1' : '#828282',
                        }}>
                        {data.category}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              : null}
          </View>
        </View>
        <View style={styles.viveView}>
          <Text style={styles.categoryText2}>분위기</Text>
          <View
            style={{
              height: 72,
              justifyContent: 'space-evenly',
              position: 'absolute',
              left: 1,
              top: -27 + 74,
            }}>
            <View style={{flexDirection: 'row'}}>
              {vive.length
                ? vive.map((data, index) => {
                    if (index > 4) {
                      return null;
                    } else {
                      return (
                        <TouchableOpacity
                          onPress={e => onPressVive(index)}
                          key={index}>
                          <View
                            style={{
                              ...styles.itemViewTwo,
                              borderColor: data.select ? '#4562F1' : '#BEBEBE',
                            }}>
                            <Text
                              style={{
                                ...styles.itemText,
                                color: data.select ? '#4562F1' : '#828282',
                              }}>
                              {data.category}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })
                : null}
            </View>
            <View style={{flexDirection: 'row'}}>
              {vive.length
                ? vive.map((data, index) => {
                    if (index < 5) {
                      return null;
                    } else {
                      return (
                        <TouchableOpacity
                          onPress={e => onPressVive(index)}
                          key={index}>
                          <View
                            style={{
                              ...styles.itemViewTwo,
                              borderColor: data.select ? '#4562F1' : '#BEBEBE',
                            }}>
                            <Text
                              style={{
                                ...styles.itemText,
                                color: data.select ? '#4562F1' : '#828282',
                              }}>
                              {data.category}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })
                : null}
            </View>
          </View>
        </View>
      </View>

      {/* footer: Button pass */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={goNextScreen}
          style={confirmSuccess ? styles.buttonAble : styles.buttonDisable}>
          <View>
            <Text
              style={
                confirmSuccess
                  ? styles.buttonAbleText
                  : styles.buttonDisableText
              }>
              다음
            </Text>
          </View>
        </TouchableOpacity>

        {/* footer: Pass*/}
        <TouchableWithoutFeedback>
          <View>
            <Text style={styles.footerPassText}>다음에 할께요</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryView: {
    paddingTop: 100,
    paddingLeft: 20,
    height: 112,
  },
  branchView: {
    height: 40,
  },
  viveView: {
    height: 72,
    alignItems: 'center',
  },
  categoryText1: {
    top: -100 + 48,
    left: 0,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    color: '#3C3C3C',
  },
  categoryText2: {
    top: -142 + 158,
    left: -186 + 20,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    color: '#3C3C3C',
  },
  itemViewTwo: {
    width: 60,
    height: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 26,
    marginRight: 7,
  },
  itemText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
  },
  /////
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
    left: 291,
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
    paddingTop: 14,
    paddingRight: 40,
  },
  bodyNameBorder: {
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBE',
    paddingTop: 14,
  },
  footer: {
    position: 'absolute',
    top: 247,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAble: {
    top: 410,
    left: 20,
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
  buttonDisable: {
    top: 410,
    left: 20,
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
  footerPassText: {
    position: 'absolute',
    marginTop: 65 + 340 + 21,
    left: -25,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    textDecorationLine: 'underline',
  },
});

export default ProfileInterest;
