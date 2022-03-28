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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SignUpStep1 from '../../assets/images/SignUpStep1.png';
import BackMail2 from '../../assets/images/BackMail2.png';
import InfoAuthorProfile from '../../assets/images/InfoAuthorProfile.png';
import InterestModal from '../../assets/images/InterestModal.png';
import {useNavigation} from '@react-navigation/native';
import AuthorSuccessModal from './AuthorSuccessModal';
import AppContext from '../../AppContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const colorCategory = {
  편안: {
    name: 'Comfortable',
    back: '#E2FAE2',
    font: '#00402D',
    num: '#7FCE7F',
  },
  맑은: {name: 'Clear', back: '#DDF9FF', font: '#002C36', num: '#6BD0E6'},
  서정: {name: 'Lyrical', back: '#E6DDFF', font: '#1E0072', num: '#AE92FF'},
  잔잔: {name: 'Calm', back: '#C5F0E3', font: '#00573D', num: '#5ECEAC'},
  명랑: {name: 'Light', back: '#FFF2AD', font: '#5D4300', num: '#FFC839'},
  유쾌: {name: 'Cheerful', back: '#FFDDDD', font: '#370000', num: '#FF8E8E'},
  달달: {name: 'Sweet', back: '#FFE8FB', font: '#3E0035', num: '#FFACDE'},
  키치: {name: 'Kitsch', back: '#FFE6B7', font: '#432C00', num: '#FFAD62'},
  시: {name: 'Poetry', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
  소설: {name: 'Novels', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
  에세이: {name: 'Essays', back: '#E8EBFF', font: '#0021C6', num: '#4562F1'},
};

const ProfileInterest = ({navigation: {setOptions}, route: {params}}) => {
  const myContext = useContext(AppContext);
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [branchRank, setBranchRank] = useState(0);
  const [viveRank, setViveRank] = useState(0);
  const insets = useSafeAreaInsets();

  const [branch, setBranch] = useState([
    {name: '시', rank: 0},
    {name: '소설', rank: 0},
    {name: '에세이', rank: 0},
  ]);
  const [vive, setVive] = useState([
    {name: '편안', rank: 0},
    {name: '맑은', rank: 0},
    {name: '서정', rank: 0},
    {name: '잔잔', rank: 0},
    {name: '명랑', rank: 0},
    {name: '유쾌', rank: 0},
    {name: '달달', rank: 0},
    {name: '키치', rank: 0},
  ]);

  const onPressModalConfirm = () => {
    setModalVisible(!modalVisible);
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const goNextScreen = () => {
    var genre1 = null;
    var genre2 = null;
    var genre3 = null;
    var mood1 = null;
    var mood2 = null;
    var mood3 = null;
    branch.map(data => {
      if (data.rank === 1) genre1 = colorCategory[data.name].name;
      else if (data.rank === 2) genre2 = colorCategory[data.name].name;
      else if (data.rank === 3) genre3 = colorCategory[data.name].name;
    });
    vive.map(data => {
      if (data.rank === 1) mood1 = colorCategory[data.name].name;
      else if (data.rank === 2) mood2 = colorCategory[data.name].name;
      else if (data.rank === 3) mood3 = colorCategory[data.name].name;
    });
    navigation.navigate('OnBoardingStacks', {
      screen: 'AddWebsite',
      params: {
        ...params,
        genre1: genre1,
        genre2: genre2,
        genre3: genre3,
        mood1: mood1,
        mood2: mood2,
        mood3: mood3,
      },
    });
  };

  const RenderInfoItem = ({item}) => {
    return (
      <Menu style={styles.menuView}>
        <MenuTrigger style={styles.menuTriggerView}>
          <Image style={{width: 30, height: 30}} source={InfoAuthorProfile} />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption>
            <Text style={{...styles.menuText, marginBottom: 12}}>
              <Text style={{color: '#C4C4C4'}}>・</Text>
              선택한&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>순서</Text>
              대로&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>순위</Text>가
              설정됩니다.
            </Text>
            <Text style={styles.menuText}>
              <Text style={{color: '#C4C4C4'}}>・</Text>
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>갈래</Text>와&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>관심사</Text>
              &nbsp;각각&nbsp;
              <Text style={{fontFamily: 'NotoSansKR-Bold'}}>1-3순위</Text>
              &nbsp;선택이
            </Text>
            <Text style={{...styles.menuText, marginBottom: 12}}>
              <Text style={{color: '#FFF'}}>・</Text>
              가능합니다.
            </Text>
            <Text style={styles.menuText}>
              <Text style={{color: '#C4C4C4'}}>・</Text>
              선택한 관심사는 독자가 작가를 검색할 때
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
    if (temp[index].rank === 0) {
      temp[index].rank = branchRank + 1;
      setBranchRank(branchRank + 1);
    } else if (temp[index].rank === 1) {
      temp[index].rank = 0;
      temp.map(data => {
        if (data.rank === 2 || data.rank === 3) data.rank--;
      });
      setBranchRank(branchRank - 1);
    } else if (temp[index].rank === 2) {
      temp[index].rank = 0;
      temp.map(data => {
        if (data.rank === 3) data.rank--;
      });
      setBranchRank(branchRank - 1);
    } else if (temp[index].rank === 3) {
      temp[index].rank = 0;
      setBranchRank(branchRank - 1);
    }
    setBranch([...temp]);
  };

  const onPressVive = (item, index) => {
    var temp = vive;
    if (temp[index].rank === 0) {
      if (viveRank === 3) return;
      temp[index].rank = viveRank + 1;
      setViveRank(viveRank + 1);
    } else if (temp[index].rank === 1) {
      temp[index].rank = 0;
      temp.map(data => {
        if (data.rank === 2 || data.rank === 3) data.rank--;
      });
      setViveRank(viveRank - 1);
    } else if (temp[index].rank === 2) {
      temp[index].rank = 0;
      temp.map(data => {
        if (data.rank === 3) data.rank--;
      });
      setViveRank(viveRank - 1);
    } else if (temp[index].rank === 3) {
      temp[index].rank = 0;
      setViveRank(viveRank - 1);
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: 20,
            }}>
            <Text style={styles.introTitle}>설정해주세요.</Text>
            <TouchableWithoutFeedback>
              <RenderInfoItem />
            </TouchableWithoutFeedback>
          </View>
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
          </View>
          {/* 갈래 */}
          <View style={{flexDirection: 'row', marginTop: 21, marginBottom: 32}}>
            {branch.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => onPressBranch(item, index)}
                  key={index}>
                  <View
                    style={{
                      ...styles.itemView,
                      backgroundColor: item.rank ? '#E8EBFF' : '#FFF',
                      borderColor: item.rank
                        ? colorCategory[item.name].back
                        : '#BEBEBE',
                      paddingHorizontal: item.rank ? 14.6 : 22,
                    }}>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: item.rank ? '#0021C6' : '#828282',
                      }}>
                      {item.rank ? (
                        <Text
                          style={{
                            fontFamily: 'NotoSansKR-BLACK',
                            fontSize: 12,
                            color: '#4562F1',
                          }}>
                          {item.rank}&nbsp;&nbsp;&nbsp;
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
                        backgroundColor: item.rank
                          ? colorCategory[item.name].back
                          : '#FFF',
                        borderColor: item.rank
                          ? colorCategory[item.name].back
                          : '#BEBEBE',
                        paddingHorizontal: item.rank ? 14.6 : 22,
                      }}>
                      <Text
                        style={{
                          ...styles.itemText,
                          color: item.rank
                            ? colorCategory[item.name].font
                            : '#828282',
                        }}>
                        {item.rank ? (
                          <Text
                            style={{
                              fontFamily: 'NotoSansKR-BLACK',
                              fontSize: 12,
                              color: colorCategory[item.name].num,
                            }}>
                            {item.rank}&nbsp;&nbsp;&nbsp;
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
                        backgroundColor: item.rank
                          ? colorCategory[item.name].back
                          : '#FFF',
                        borderColor: item.rank
                          ? colorCategory[item.name].back
                          : '#BEBEBE',
                        paddingHorizontal: item.rank ? 14.6 : 22,
                      }}>
                      <Text
                        style={{
                          ...styles.itemText,
                          color: item.rank
                            ? colorCategory[item.name].font
                            : '#828282',
                        }}>
                        {item.rank ? (
                          <Text
                            style={{
                              fontFamily: 'NotoSansKR-BLACK',
                              fontSize: 12,
                              color: colorCategory[item.name].num,
                            }}>
                            {item.rank}&nbsp;&nbsp;&nbsp;
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
      <View style={{...styles.bottomView, bottom: insets.bottom + 15}}>
        <TouchableOpacity
          disabled={viveRank === 0 || branchRank === 0}
          onPress={goNextScreen}
          style={
            viveRank === 0 || branchRank === 0
              ? styles.buttonDisable
              : styles.buttonAble
          }>
          <View>
            <Text
              style={
                viveRank === 0 || branchRank === 0
                  ? styles.buttonDisableText
                  : styles.buttonAbleText
              }>
              다음
            </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
    borderWidth: 1,
  },
  itemText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#828282',
    includeFontPadding: false,
  },
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
    includeFontPadding: false,
  },
  introTitle: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 27,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  introSub: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    marginTop: 6,
    includeFontPadding: false,
  },
  input: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#3C3C3C',
    paddingTop: 14,
    paddingRight: 40,
    includeFontPadding: false,
  },
  bottomView: {
    width: '100%',
    position: 'absolute',
  },
  buttonDisable: {
    marginHorizontal: 20,
    backgroundColor: '#BEBEBE',
    borderRadius: 26,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
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
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  buttonDisableText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  footerPassText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    textAlign: 'center',
    textDecorationLine: 'underline',
    includeFontPadding: false,
  },
  menuText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 11,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: 228,
  },
  optionWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 24,
    justifyContent: 'center',
  },
};

export default ProfileInterest;
