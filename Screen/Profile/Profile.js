import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import SettingProfile from '../../assets/images/SettingProfile.png';
import AccordionProfile from '../../assets/images/AccordionProfile.png';
import AccordionProfile2 from '../../assets/images/AccordionProfile2.png';
import SearchProfile from '../../assets/images/SearchProfile.png';
import AuthorMail from '../../assets/images/AuthorMail.png';
import DefaultProfile from '../../assets/images/DefaultProfile.png';
import ImageEditProfile from '../../assets/images/ImageEditProfile.png';

const Profile = () => {
  const navigation = useNavigation();
  const onPressSearchPage = () => {
    navigation.navigate('Stacks', {
      screen: 'ProfileSearch',
    });
  };
  const onPressSetting = () => {
    navigation.navigate('Stacks', {
      screen: 'Setting',
    });
  };
  const onPressAccordion = () => {
    setCategory(!category);
  };
  const [branchSelect, setBranchSelect] = useState([true, true, true]);
  const [viveSelect, setViveSelect] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [category, setCategory] = useState(false);
  const [recentSelect, setRecentSelect] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const onPressBranch = index => {
    var temp = branchSelect;
    temp[index] = !temp[index];
    setBranchSelect({...temp});
  };
  const onPressVive = index => {
    var temp = viveSelect;
    temp[index] = !temp[index];
    setViveSelect({...temp});
  };
  const [author, setAuthor] = useState([
    {name: '이작가', intro: '안녕하세요. 이작가입니다.', order: 1, update: 3},
    {name: '김작가', intro: '안녕하세요. 김작가입니다.', order: 2, update: 2},
    {name: '덩이', intro: '안녕하세요. 덩이입니다.', order: 3, update: 1},
  ]);
  const onPressRecent = () => {
    setRecentSelect(true);
  };
  const onPressOld = () => {
    setRecentSelect(false);
  };
  const [subscribe, setSubscribe] = useState(false);
  const onPressSubscribe = () => {
    setSubscribe(!subscribe);
  };
  const [name, setName] = useState('영이');
  const [editName, setEditName] = useState('영이');
  const onPressModalConfirm = () => {
    setName(editName);
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    if (recentSelect) {
      setAuthor(data =>
        data.slice().sort(function (a, b) {
          if (a.order >= b.order) {
            return 1;
          } else if (a.order < b.order) {
            return -1;
          }
        }),
      );
    } else {
      setAuthor(data =>
        data.slice().sort(function (a, b) {
          if (a.update >= b.update) {
            return 1;
          } else if (a.update < b.update) {
            return -1;
          }
        }),
      );
    }
  }, [recentSelect]);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <StatusBar barStyle="light-content" />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>이름 수정</Text>
            <TextInput
              style={{
                width: 208,
                color: '#3C3C3C',
                textAlign: 'center',
                fontFamily: 'NotoSansKR-Bold',
                fontSize: 24,
                paddingBottom: 10,
                borderBottomColor: '#4562F1',
                borderBottomWidth: 1,
              }}
              value={editName}
              onChangeText={setEditName}></TextInput>
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'NotoSansKR-Light',
                fontSize: 14,
                color: '#BEBEBE',
              }}>
              사용할 수 있는 이름이에요.
            </Text>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Light',
                fontSize: 14,
                color: '#BEBEBE',
              }}>
              (최대 한글 6자)
            </Text>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 27,
                right: 27,
              }}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <View style={{marginRight: 27}}>
                  <Text style={styles.modalCancel}>취소</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressModalConfirm}>
                <View>
                  <Text style={styles.modalConfirm}>확인</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>프로필</Text>
        <TouchableOpacity
          style={{position: 'absolute', right: 20, bottom: 18}}
          onPress={onPressSetting}>
          <Image
            style={{
              width: 18.68,
              height: 19.2,
            }}
            source={SettingProfile}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.profileView}>
        <View style={{alignItems: 'center', top: -39}}>
          <Image
            style={{width: 78, height: 78}}
            source={DefaultProfile}></Image>
          <Image
            style={{width: 42, height: 42, top: -31, left: 25}}
            source={ImageEditProfile}></Image>
          <View style={{alignItems: 'center', top: -37}}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileCategory}>독자님</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.nameEditView}>
                <Text style={styles.nameEditText}>이름 수정</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.profileAccordion}>
        {category ? (
          <TouchableWithoutFeedback onPress={onPressAccordion}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.accordionText}>구독작가</Text>
              <Image
                style={{width: 10, height: 5}}
                source={AccordionProfile}></Image>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={onPressAccordion}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.accordionText}>구독작가</Text>
              <Image
                style={{width: 10, height: 5}}
                source={AccordionProfile2}></Image>
            </View>
          </TouchableWithoutFeedback>
        )}
        <TouchableOpacity
          style={{position: 'absolute', right: 20}}
          onPress={onPressSearchPage}>
          <Image style={{width: 16, height: 16}} source={SearchProfile}></Image>
        </TouchableOpacity>
      </View>
      {category ? (
        <View style={styles.categoryView}>
          <View style={styles.branchView}>
            <Text style={styles.categoryText}>갈래</Text>
            <TouchableOpacity onPress={e => onPressBranch(0)}>
              <View
                style={{
                  ...styles.itemViewOne,
                  borderColor: branchSelect[0] ? '#4562F1' : '#EBEBEB',
                }}>
                <Text
                  style={{
                    ...styles.itemText,
                    color: branchSelect[0] ? '#4562F1' : '#828282',
                  }}>
                  시
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={e => onPressBranch(1)}>
              <View
                style={{
                  ...styles.itemViewTwo,
                  borderColor: branchSelect[1] ? '#4562F1' : '#EBEBEB',
                }}>
                <Text
                  style={{
                    ...styles.itemText,
                    color: branchSelect[0] ? '#4562F1' : '#828282',
                  }}>
                  소설
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={e => onPressBranch(2)}>
              <View
                style={{
                  ...styles.itemViewThree,
                  borderColor: branchSelect[2] ? '#4562F1' : '#EBEBEB',
                }}>
                <Text
                  style={{
                    ...styles.itemText,
                    color: branchSelect[0] ? '#4562F1' : '#828282',
                  }}>
                  에세이
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.viveView}>
            <Text style={styles.categoryText}>분위기</Text>
            <View>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <TouchableOpacity onPress={e => onPressVive(0)}>
                  <View
                    style={{
                      ...styles.itemViewTwo,
                      borderColor: viveSelect[0] ? '#4562F1' : '#EBEBEB',
                    }}>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: viveSelect[0] ? '#4562F1' : '#828282',
                      }}>
                      편안
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={e => onPressVive(1)}>
                  <View
                    style={{
                      ...styles.itemViewTwo,
                      borderColor: viveSelect[1] ? '#4562F1' : '#EBEBEB',
                    }}>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: viveSelect[1] ? '#4562F1' : '#828282',
                      }}>
                      맑은
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={e => onPressVive(2)}>
                  <View
                    style={{
                      ...styles.itemViewTwo,
                      borderColor: viveSelect[2] ? '#4562F1' : '#EBEBEB',
                    }}>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: viveSelect[2] ? '#4562F1' : '#828282',
                      }}>
                      서정
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={e => onPressVive(3)}>
                  <View
                    style={{
                      ...styles.itemViewTwo,
                      borderColor: viveSelect[3] ? '#4562F1' : '#EBEBEB',
                    }}>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: viveSelect[3] ? '#4562F1' : '#828282',
                      }}>
                      잔잔
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={e => onPressVive(4)}>
                  <View
                    style={{
                      ...styles.itemViewTwo,
                      borderColor: viveSelect[4] ? '#4562F1' : '#EBEBEB',
                    }}>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: viveSelect[4] ? '#4562F1' : '#828282',
                      }}>
                      명랑
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={e => onPressVive(5)}>
                  <View
                    style={{
                      ...styles.itemViewTwo,
                      borderColor: viveSelect[5] ? '#4562F1' : '#EBEBEB',
                    }}>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: viveSelect[5] ? '#4562F1' : '#828282',
                      }}>
                      유쾌
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={e => onPressVive(6)}>
                  <View
                    style={{
                      ...styles.itemViewTwo,
                      borderColor: viveSelect[6] ? '#4562F1' : '#EBEBEB',
                    }}>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: viveSelect[6] ? '#4562F1' : '#828282',
                      }}>
                      달달
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={e => onPressVive(7)}>
                  <View
                    style={{
                      ...styles.itemViewTwo,
                      borderColor: viveSelect[7] ? '#4562F1' : '#EBEBEB',
                    }}>
                    <Text
                      style={{
                        ...styles.itemText,
                        color: viveSelect[7] ? '#4562F1' : '#828282',
                      }}>
                      키치
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : null}
      <View style={styles.bodyHeader}>
        <Text style={{...styles.bodyHeaderText, color: '#828282'}}>
          총&nbsp;
        </Text>
        <Text style={{...styles.bodyHeaderText, color: '#3C3C3C'}}>
          {author.length}
        </Text>
        <Text style={{...styles.bodyHeaderText, color: '#828282'}}>
          &nbsp;명
        </Text>
        <View
          style={{
            position: 'absolute',
            width: 92,
            flexDirection: 'row',
            justifyContent: 'space-between',
            right: 57,
          }}>
          <TouchableOpacity onPress={onPressRecent} activeOpacity={1}>
            <Text
              style={{
                ...styles.bodyHeaderTextOrder,
                color: recentSelect ? '#000000' : '#BEBEBE',
              }}>
              최신구독순
            </Text>
          </TouchableOpacity>
          <Text style={{...styles.bodyHeaderTextOrder, color: '#BEBEBE'}}>
            •
          </Text>
          <TouchableOpacity onPress={onPressOld} activeOpacity={1}>
            <Text
              style={{
                ...styles.bodyHeaderTextOrder,
                color: recentSelect ? '#BEBEBE' : '#000000',
              }}>
              업데이트순
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {author.map((data, index) => (
        <View key={index} style={styles.bodyItem}>
          <Image
            style={{width: 42, height: 42, marginRight: 10}}
            source={AuthorMail}></Image>
          <View>
            <Text style={styles.bodyItemName}>{data.name}</Text>
            <Text style={styles.bodyItemIntro}>{data.intro}</Text>
          </View>
          <TouchableOpacity
            onPress={onPressSubscribe}
            style={subscribe ? styles.subscribeView : styles.subscribeNotView}>
            <View>
              <Text
                style={
                  subscribe ? styles.subscribeText : styles.subscribeNotText
                }>
                {subscribe ? '구독중' : '구독하기'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 121 - 48,
    backgroundColor: '#4562F1',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#fff',
  },
  profileView: {
    height: 150,
    backgroundColor: '#fff',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 3,
  },
  profileAccordion: {
    height: 42,
    backgroundColor: '#fff',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  categoryView: {
    paddingLeft: 20,
    height: 112,
    backgroundColor: '#F8F8F8',
  },
  branchView: {
    height: 40,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viveView: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyHeader: {
    height: 40,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
  },
  accordionText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    width: 60,
    color: '#3C3C3C',
  },
  categoryText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
    marginRight: 30,
  },
  itemViewOne: {
    width: 42,
    height: 24,
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
  itemViewTwo: {
    width: 52,
    height: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 26,
    marginRight: 7,
  },
  itemViewThree: {
    width: 64,
    height: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 26,
    marginRight: 7,
  },
  bodyItem: {
    height: 68,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  bodyItemName: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
  },
  bodyItemIntro: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    paddingHorizontal: 3,
  },
  subscribeView: {
    position: 'absolute',
    right: 20,
    width: 75,
    height: 30,
    borderRadius: 15,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeNotView: {
    position: 'absolute',
    right: 20,
    width: 75,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#828282',
  },
  subscribeNotText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#FFF',
  },
  profileName: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    color: '#3C3C3C',
  },
  profileCategory: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
  },
  nameEditView: {
    width: 75,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    marginTop: 7,
  },
  nameEditText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#3C3C3C',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
  },
  modalView: {
    width: 330,
    height: 296,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    position: 'absolute',
    top: 20,
  },
  modalCancel: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#BEBEBE',
  },
  modalConfirm: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#4562F1',
  },
});

export default Profile;
