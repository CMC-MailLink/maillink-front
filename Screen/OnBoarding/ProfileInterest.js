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
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import SignUpStep1 from '../../assets/images/SignUpStep1.png';
import BackMail2 from '../../assets/images/BackMail2.png';
import InfoAuthorProfile from '../../assets/images/InfoAuthorProfile.png';
import InterestModal from '../../assets/images/InterestModal.png';
import {useNavigation} from '@react-navigation/native';
import AuthorSuccessModal from './AuthorSuccessModal';
import AppContext from '../../AppContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ProfileInterest = () => {
  const myContext = useContext(AppContext);
  const navigation = useNavigation();
  const [introText, onChangeIntroText] = useState('');
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [textCount, setTextCount] = useState(0);
  const [enterCount, setenterCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const colorCategory = {
    편안: {back: '#E2FAE2', font: '#00402D', heart: '#7FCE7F'},
    맑은: {back: '#DDF9FF', font: '#002C36', heart: '#6BD0E6'},
    서정: {back: '#E6DDFF', font: '#1E0072', heart: '#AE92FF'},
    잔잔: {back: '#C5F0E3', font: '#00573D', heart: '#5ECEAC'},
    명랑: {back: '#FFF2AD', font: '#5D4300', heart: '#FFC839'},
    유쾌: {back: '#FFDDDD', font: '#370000', heart: '#FF8E8E'},
    달달: {back: '#FFE8FB', font: '#3E0035', heart: '#FFACDE'},
    키치: {back: '#FFE6B7', font: '#432C00', heart: '#FFAD62'},
  };
  const [branch, setBranch] = useState([
    {name: '시', select: false, rep: false},
    {name: '소설', select: false, rep: false},
    {name: '에세이', select: false, rep: false},
  ]);
  const [vive, setVive] = useState([
    {name: '편안', select: false, rep: false},
    {name: '맑은', select: false, rep: false},
    {name: '서정', select: false, rep: false},
    {name: '잔잔', select: false, rep: false},
    {name: '명랑', select: false, rep: false},
    {name: '유쾌', select: false, rep: false},
    {name: '달달', select: false, rep: false},
    {name: '키치', select: false, rep: false},
  ]);

  const onPressModalConfirm = () => {
    setModalVisible(!modalVisible);
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const goNextScreen = () => {
    navigation.navigate('OnBoardingStacks', {
      screen: 'AddWebsite',
    });
  };

  const RenderInfoItem = ({item}) => {
    return (
      <Menu style={{...styles.menuView, marginTop: -100}}>
        <MenuTrigger style={{...styles.menuTriggerView}}>
          <Image style={{width: 30, height: 30}} source={InfoAuthorProfile} />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption>
            <Text style={styles.menuText}>
              <Text style={{color: '#C4C4C4'}}>・</Text>
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>한 번</Text>을
              누르면&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>관심사</Text>
              로,
            </Text>
            <Text style={{...styles.menuText, marginBottom: 7}}>
              <Text style={{color: '#FFF'}}>・</Text>
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>두 번</Text>을
              누르면&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>대표 관심사</Text>로
              표시됩니다.
            </Text>
            <Text style={styles.menuText}>
              <Text style={{color: '#C4C4C4'}}>・</Text>
              대표 관심사는 각&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>
                선택지 주제 당 하나
              </Text>
              만
            </Text>
            <Text style={{...styles.menuText, marginBottom: 7}}>
              <Text style={{color: '#FFF'}}>・</Text>
              선택이 가능합니다.
            </Text>
            <Text style={styles.menuText}>
              <Text style={{color: '#C4C4C4'}}>・</Text>
              대표 관심사는 독자가 작가를 검색할 때
            </Text>
            <Text style={styles.menuText}>
              <Text style={{color: '#FFF'}}>・</Text>
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>필터의 기준</Text>이
              되어줍니다.
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

  const onPressBranch = (item, index) => {
    var temp = branch;
    if (temp[index].select) {
      if (temp[index].rep) {
        temp[index].select = false;
        temp[index].rep = false;
      } else {
        temp[index].rep = true;
      }
    } else {
      temp[index].select = true;
    }
    setBranch([...temp]);
  };

  const onPressVive = (item, index) => {
    var temp = vive;
    if (temp[index].select) {
      if (temp[index].rep) {
        temp[index].select = false;
        temp[index].rep = false;
      } else {
        temp.map(data => {
          if (data.rep) {
            data.rep = false;
          }
        });
        temp[index].rep = true;
      }
    } else {
      temp[index].select = true;
    }
    setVive([...temp]);
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
          style={{width: 48, height: 32.28, marginTop: 25, marginLeft: 25}}
          source={SignUpStep1}
        />
        <View style={{marginTop: 10, marginLeft: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.nameTitle}>관심사</Text>
            <Text style={styles.introTitle}>를</Text>
          </View>
          <Text style={styles.introTitle}>설정해주세요.</Text>
          <Text style={styles.introSub}>주로 어떤 글을 쓰는 작가인가요?</Text>
        </View>
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

        {/* Body */}
        <View
          style={{
            ...styles.titleView,
            marginTop: 10 + 46,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.titleText}>갈래</Text>
            <TouchableWithoutFeedback>
              <RenderInfoItem />
            </TouchableWithoutFeedback>
          </View>
          <View style={{flexDirection: 'row', marginTop: 21, marginBottom: 32}}>
            {branch.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => onPressBranch(item, index)}
                  key={index}>
                  <View
                    style={{
                      ...styles.itemView,
                      backgroundColor: item.select ? '#E8EBFF' : '#FFF',
                      borderColor: item.select ? '#E8EBFF' : '#BEBEBE',
                      paddingHorizontal: item.rep ? 14.6 : 22,
                    }}>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: item.select ? '#0021C6' : '#828282',
                      }}>
                      {item.rep ? (
                        <Text
                          style={{
                            ...styles.itemText,
                            color: '#4562F1',
                          }}>
                          ♥&nbsp;
                        </Text>
                      ) : null}
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={{...styles.titleText, marginTop: -35 + 42}}>분위기</Text>
          <View style={{flexDirection: 'row', marginTop: 21, marginBottom: 10}}>
            {vive.map((item, index) => {
              if (index < 4) {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onPressVive(item, index)}>
                    <View
                      style={{
                        ...styles.itemView,
                        backgroundColor: item.select
                          ? colorCategory[item.name].back
                          : '#FFF',
                        borderColor: item.select
                          ? colorCategory[item.name].back
                          : '#BEBEBE',
                        paddingHorizontal: item.rep ? 14.6 : 22,
                      }}>
                      <Text
                        style={{
                          ...styles.itemText,
                          color: item.select
                            ? colorCategory[item.name].font
                            : '#828282',
                        }}>
                        {item.rep ? (
                          <Text
                            style={{
                              ...styles.itemText,
                              color: colorCategory[item.name].heart,
                            }}>
                            ♥&nbsp;
                          </Text>
                        ) : null}
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
          <View style={{flexDirection: 'row'}}>
            {vive.map((item, index) => {
              if (index >= 4) {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onPressVive(item, index)}>
                    <View
                      style={{
                        ...styles.itemView,
                        backgroundColor: item.select
                          ? colorCategory[item.name].back
                          : '#FFF',
                        borderColor: item.select
                          ? colorCategory[item.name].back
                          : '#BEBEBE',
                        paddingHorizontal: item.rep ? 14.6 : 22,
                      }}>
                      <Text
                        style={{
                          ...styles.itemText,
                          color: item.select
                            ? colorCategory[item.name].font
                            : '#828282',
                        }}>
                        {item.rep ? (
                          <Text
                            style={{
                              ...styles.itemText,
                              color: colorCategory[item.name].heart,
                            }}>
                            ♥&nbsp;
                          </Text>
                        ) : null}
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
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
  titleView: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 21,
  },
  titleText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  itemView: {
    height: 30,
    borderRadius: 26,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },
  itemText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#828282',
    includeFontPadding: false,
  },
  menuText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 11,
    color: '#3C3C3C',
    includeFontPadding: false,
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

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    width: 228,
  },
  optionWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 24,
    justifyContent: 'center',
  },
};

export default ProfileInterest;
