import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import SettingProfile from '../../../assets/images/SettingProfile.png';
import AccordionProfile from '../../../assets/images/AccordionProfile.png';
import AccordionProfile2 from '../../../assets/images/AccordionProfile2.png';
import SearchProfile from '../../../assets/images/SearchProfile.png';
import AuthorProfileImage from '../../../assets/images/AuthorProfileImage.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import ImageEditProfile from '../../../assets/images/ImageEditProfile.png';
import AllReaderProfile from '../../../assets/images/AllReaderProfile.png';
import {SignUpAPI} from '../../../API/SignUpAPI';

import ReaderProfileModal from './ReaderProfileModal';

const ReaderProfile = () => {
  const navigation = useNavigation();
  const [branch, setBranch] = useState([
    {category: '시', select: true},
    {category: '소설', select: true},
    {category: '에세이', select: true},
  ]);
  const [vive, setVive] = useState([
    {category: '편안', select: true},
    {category: '맑은', select: true},
    {category: '서정', select: true},
    {category: '잔잔', select: true},
    {category: '명랑', select: true},
    {category: '유쾌', select: true},
    {category: '달달', select: true},
    {category: '키치', select: true},
  ]);
  const [author, setAuthor] = useState([
    {
      key: 0,
      name: '이작가',
      intro: '안녕하세요. 이작가입니다.',
      subscribe: true,
      repBranch: '시',
      repVive: '편안',
      order: 0,
      update: 4,
    },
    {
      key: 1,
      name: '김작가',
      intro: '안녕하세요. 김작가입니다.',
      subscribe: true,
      repBranch: '시',
      repVive: '서정',
      order: 1,
      update: 3,
    },
    {
      key: 2,
      name: '모모',
      intro: '안녕하세요. 모모입니다.',
      subscribe: true,
      repBranch: '시',
      repVive: '달달',
      order: 2,
      update: 2,
    },
    {
      key: 3,
      name: '덩이',
      intro: '안녕하세요. 덩이입니다.',
      subscribe: true,
      repBranch: '시',
      repVive: '잔잔',
      order: 3,
      update: 1,
    },
    {
      key: 4,
      name: '훈',
      intro: '안녕하세요. 훈입니다.',
      subscribe: true,
      repBranch: '에세이',
      repVive: '맑은',
      order: 4,
      update: 0,
    },
  ]);
  const [category, setCategory] = useState(false);
  const [recentSelect, setRecentSelect] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('독자비비');
  const [editName, setEditName] = useState('독자비비');
  const [imageUri, setImageUri] = useState('');
  const [filterAuthor, setFilterAuthor] = useState([]);

  const onPressAll = () => {
    setBranch([
      {category: '시', select: true},
      {category: '소설', select: true},
      {category: '에세이', select: true},
    ]);
    setVive([
      {category: '편안', select: true},
      {category: '맑은', select: true},
      {category: '서정', select: true},
      {category: '잔잔', select: true},
      {category: '명랑', select: true},
      {category: '유쾌', select: true},
      {category: '달달', select: true},
      {category: '키치', select: true},
    ]);
  };
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
  const onPressModalConfirm = () => {
    setName(editName);
    setModalVisible(!modalVisible);
  };
  const [filePath, setFilePath] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileUri, setFileUri] = useState(null);

  const onPressEditImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      imageUpload(image.path);
    });
  };

  //프로필 이미지 등록
  const imageUpload = async imagePath => {
    const imageData = new FormData();
    imageData.append('image', {
      uri: imagePath,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });

    const result = await SignUpAPI.profileEditing({image: imageData});
    console.log(result);
    if (result) {
      setImageUri(result);
    } else {
      console.log('프로필 등록 실패');
    }
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

  useEffect(() => {
    var temp = author.filter(data => {
      for (var i = 0; i < 3; i++) {
        if (branch[i].select)
          if (data.repBranch === branch[i].category) return true;
      }
      return false;
    });
    temp = temp.filter(data => {
      for (var i = 0; i < 8; i++) {
        if (vive[i].select) if (data.repVive === vive[i].category) return true;
      }
      return false;
    });
    setFilterAuthor([...temp]);
  }, [branch, vive, author]);

  const setSubscribe = index => {
    var temp = author;
    temp[index].subscribe = true;
    setAuthor([...temp]);
  };
  const cancelSubscribe = index => {
    var temp = author;
    temp[index].subscribe = false;
    setAuthor([...temp]);
  };

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
        <ReaderProfileModal
          editName={editName}
          setEditName={setEditName}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onPressModalConfirm={onPressModalConfirm}
        />
      </Modal>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>프로필</Text>
      </View>
      <ScrollView stickyHeaderIndices={[2]} bounces={false}>
        <View style={{height: 43, backgroundColor: '#4562F1'}}>
          <TouchableOpacity
            style={{position: 'absolute', right: 20, bottom: 18}}
            onPress={() => {
              navigation.navigate('ReaderStacks', {
                screen: 'Setting',
              });
            }}>
            <Image
              style={{
                width: 18.68,
                height: 19.2,
              }}
              source={SettingProfile}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileView}>
          <View
            style={{
              alignItems: 'center',
              top: -39,
              width: 160,
            }}>
            <TouchableWithoutFeedback onPress={onPressEditImage}>
              <Image
                style={{width: 78, height: 78, borderRadius: 90}}
                source={imageUri === '' ? DefaultProfile : {uri: imageUri}}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPressEditImage}>
              <Image
                style={{width: 27.76, height: 27.76, top: -31, left: 25}}
                source={ImageEditProfile}
              />
            </TouchableWithoutFeedback>
            <View style={{alignItems: 'center', top: -21}}>
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
        <>
          <View style={styles.profileAccordion}>
            {category ? (
              <TouchableWithoutFeedback onPress={() => setCategory(!category)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.accordionText}>구독작가</Text>
                  <Image
                    style={{width: 10, height: 5}}
                    source={AccordionProfile}
                  />
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => setCategory(!category)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.accordionText}>구독작가</Text>
                  <Image
                    style={{width: 10, height: 5}}
                    source={AccordionProfile2}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
            <TouchableOpacity
              style={{position: 'absolute', right: 20}}
              onPress={() =>
                navigation.navigate('ReaderStacks', {
                  screen: 'ReaderProfileSearch',
                })
              }>
              <Image style={{width: 16, height: 16}} source={SearchProfile} />
            </TouchableOpacity>
          </View>
          {category ? (
            <View style={styles.categoryView}>
              <View style={styles.branchView}>
                <Text style={styles.categoryText}>갈래</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    left: 58,
                  }}>
                  {branch.length
                    ? branch.map((data, index) => (
                        <TouchableOpacity
                          onPress={e => onPressBranch(index)}
                          key={index}>
                          <View
                            style={{
                              ...styles.itemViewTwo,
                              borderColor: data.select ? '#4562F1' : '#EBEBEB',
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
                <Text style={styles.categoryText}>분위기</Text>
                <View
                  style={{
                    height: 72,
                    justifyContent: 'space-evenly',
                    position: 'absolute',
                    left: 58,
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
                                    borderColor: data.select
                                      ? '#4562F1'
                                      : '#EBEBEB',
                                  }}>
                                  <Text
                                    style={{
                                      ...styles.itemText,
                                      color: data.select
                                        ? '#4562F1'
                                        : '#828282',
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
                                    borderColor: data.select
                                      ? '#4562F1'
                                      : '#EBEBEB',
                                  }}>
                                  <Text
                                    style={{
                                      ...styles.itemText,
                                      color: data.select
                                        ? '#4562F1'
                                        : '#828282',
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
              <TouchableOpacity onPress={onPressAll}>
                <View style={styles.allView}>
                  <Image
                    style={{width: 14, height: 10, marginRight: 4}}
                    source={AllReaderProfile}></Image>
                  <Text style={styles.allText}>전체선택</Text>
                </View>
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => setRecentSelect(true)}
                activeOpacity={1}>
                <Text
                  style={{
                    ...styles.bodyHeaderTextOrder,
                    color: recentSelect ? '#3C3C3C' : '#BEBEBE',
                  }}>
                  최신구독순
                </Text>
              </TouchableOpacity>
              <Text style={{...styles.bodyHeaderTextOrder, color: '#BEBEBE'}}>
                ・
              </Text>
              <TouchableOpacity
                onPress={() => setRecentSelect(false)}
                activeOpacity={1}>
                <Text
                  style={{
                    ...styles.bodyHeaderTextOrder,
                    color: recentSelect ? '#BEBEBE' : '#3C3C3C',
                  }}>
                  업데이트순
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
        <View style={{paddingBottom: 150}}>
          {filterAuthor.map((data, index) => (
            <View key={index} style={styles.bodyItem}>
              <Image
                style={{width: 42, height: 42, marginRight: 10}}
                source={AuthorProfileImage}
              />
              <View>
                <Text style={styles.bodyItemName}>{data.name}</Text>
                <Text style={styles.bodyItemIntro}>{data.intro}</Text>
              </View>
              {data.subscribe ? (
                <TouchableOpacity
                  style={{position: 'absolute', right: 20}}
                  onPress={() => cancelSubscribe(index)}>
                  <View style={styles.subscribeView}>
                    <Text style={styles.subscribeText}>구독중</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{position: 'absolute', right: 20}}
                  onPress={() => setSubscribe(index)}>
                  <View style={styles.notSubscribeView}>
                    <Text style={styles.notSubscribeText}>구독하기</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 78 - 48,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#fff',
    includeFontPadding: false,
  },
  profileView: {
    height: 150,
    backgroundColor: '#fff',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 3,
    alignItems: 'center',
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
    height: 144,
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
    backgroundColor: '#fff',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  accordionText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    width: 60,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  categoryText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
    includeFontPadding: false,
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
    color: '#3C3C3C',
    includeFontPadding: false,
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
    includeFontPadding: false,
  },
  bodyItemIntro: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
    includeFontPadding: false,
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    paddingHorizontal: 3,
    includeFontPadding: false,
  },
  subscribeView: {
    width: 75,
    height: 30,
    borderRadius: 15,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notSubscribeView: {
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
    includeFontPadding: false,
  },
  notSubscribeText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#FFF',
    includeFontPadding: false,
  },
  profileName: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  profileCategory: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    includeFontPadding: false,
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
    includeFontPadding: false,
  },
  allView: {
    height: 32,
    backgroundColor: '#F8F8F8',
    justifyContent: 'flex-end',
    paddingHorizontal: 23,
    alignItems: 'center',
    borderTopColor: '#EBEBEB',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  allText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 13,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
});

export default ReaderProfile;
