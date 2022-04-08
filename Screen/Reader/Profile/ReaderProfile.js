import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ReaderAPI} from '../../../API/ReaderAPI';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import ReaderProfileModal from './ReaderProfileModal';
import FastImage from 'react-native-fast-image';

import SettingProfile from '../../../assets/images/SettingProfile.png';
import AccordionProfile from '../../../assets/images/AccordionProfile.png';
import AccordionProfile2 from '../../../assets/images/AccordionProfile2.png';
import SearchProfile from '../../../assets/images/SearchProfile.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import ImageEditProfile from '../../../assets/images/ImageEditProfile.png';
import AllReaderProfile from '../../../assets/images/AllReaderProfile.png';

const refreshingHeight = 100;

const ReaderProfile = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [offsetY, setOffsetY] = useState(0);
  const [branch, setBranch] = useState([
    {name: 'Poetry', category: '시', select: true},
    {name: 'Novels', category: '소설', select: true},
    {name: 'Essays', category: '에세이', select: true},
  ]);
  const [vive, setVive] = useState([
    {name: 'Comfortable', category: '편안', select: true},
    {name: 'Clear', category: '맑은', select: true},
    {name: 'Lyrical', category: '서정', select: true},
    {name: 'Calm', category: '잔잔', select: true},
    {name: 'Light', category: '명랑', select: true},
    {name: 'Cheerful', category: '유쾌', select: true},
    {name: 'Sweet', category: '달달', select: true},
    {name: 'Kitsch', category: '키치', select: true},
  ]);
  //const [author, setAuthor] = useState([]);
  const [category, setCategory] = useState(false);
  const [recentSelect, setRecentSelect] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState();
  const [editName, setEditName] = useState();
  const [imageUri, setImageUri] = useState('');
  const [filterAuthor, setFilterAuthor] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {isLoading: subscribeAuthorListLoading, data: subscribeAuthorListData} =
    useQuery(['SubscribeAuthorList'], ReaderAPI.getSubscribeWriters);
  const {isLoading: readerInfoLoading, data: readerInfoData} = useQuery(
    ['ReaderInfo'],
    ReaderAPI.memberInfo,
  );

  useEffect(() => {
    if (readerInfoData) {
      setName(readerInfoData.nickName);
      setEditName(readerInfoData.nickName);
      setImageUri(readerInfoData.imgUrl);
    }
  }, [readerInfoData]);

  useEffect(() => {
    if (recentSelect) {
      setFilterAuthor(data =>
        data.slice().sort(function (a, b) {
          if (a.order >= b.order) {
            return 1;
          } else if (a.order < b.order) {
            return -1;
          }
        }),
      );
    } else {
      setFilterAuthor(data =>
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
    if (subscribeAuthorListData) {
      var temp = subscribeAuthorListData.filter(data => {
        if (data.writerInfo.nickName === '탈퇴한 회원 입니다.') {
          return false;
        }
        for (var i = 0; i < 3; i++) {
          if (branch[i].select) {
            if (data.writerInfo.primaryGenre === branch[i].name) {
              return true;
            }
          }
        }
        return false;
      });
      temp = temp.filter(data => {
        for (var i = 0; i < 8; i++) {
          if (vive[i].select) {
            if (data.writerInfo.primaryMood === vive[i].name) {
              return true;
            }
          }
        }
        return false;
      });
      setFilterAuthor([...temp]);
    }
  }, [branch, vive, subscribeAuthorListData]);

  const onPressAll = () => {
    setBranch([
      {name: 'Poetry', category: '시', select: true},
      {name: 'Novels', category: '소설', select: true},
      {name: 'Essays', category: '에세이', select: true},
    ]);
    setVive([
      {name: 'Comfortable', category: '편안', select: true},
      {name: 'Clear', category: '맑은', select: true},
      {name: 'Lyrical', category: '서정', select: true},
      {name: 'Calm', category: '잔잔', select: true},
      {name: 'Light', category: '명랑', select: true},
      {name: 'Cheerful', category: '유쾌', select: true},
      {name: 'Sweet', category: '달달', select: true},
      {name: 'Kitsch', category: '키치', select: true},
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

  const onPressEditImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
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

    const result = await ReaderAPI.changeProfileImage({image: imageData});
    if (result) {
      await queryClient.refetchQueries(['ReaderInfo']);
    } else {
      console.log('프로필 등록 실패');
    }
  };

  const setSubscribe = async (writerId, index) => {
    var result = await ReaderAPI.subscribing({writerId: writerId});
    var temp = filterAuthor;
    temp[index].subscribeCheck = true;
    setFilterAuthor([...temp]);
  };
  const cancelSubscribe = async (writerId, index) => {
    var result = await ReaderAPI.cancelSubscribing({writerId: writerId});
    var temp = filterAuthor;
    temp[index].subscribeCheck = false;
    setFilterAuthor([...temp]);
  };

  function onScroll(event) {
    const {nativeEvent} = event;
    const {contentOffset} = nativeEvent;
    const {y} = contentOffset;
    setOffsetY(y);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['SubscribeAuthorList']);
    await queryClient.refetchQueries(['AuthorList']);
    setRefreshing(false);
  };

  const onPressAuthorItem = data => {
    navigation.navigate('ReaderStacks', {
      screen: 'ReaderAuthorProfile',
      params: {id: data.writerInfo.id},
    });
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <StatusBar barStyle="light-content" />
      <View
        style={{
          ...styles.refreshView,
          height: refreshingHeight - offsetY + 40,
        }}
      />
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
      <ScrollView
        stickyHeaderIndices={[2]}
        onScroll={onScroll}
        scrollEventThrottle={0}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }>
        <View style={{height: 43, backgroundColor: '#4562F1'}}>
          <TouchableOpacity
            style={{position: 'absolute', right: 20, bottom: 18}}
            onPress={() => {
              navigation.navigate('ReaderStacks', {
                screen: 'Setting',
              });
            }}>
            <FastImage
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
              <FastImage
                style={{width: 78, height: 78, borderRadius: 90}}
                source={imageUri === '' ? DefaultProfile : {uri: imageUri}}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPressEditImage}>
              <FastImage
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
                  <FastImage
                    style={{width: 10, height: 5}}
                    source={AccordionProfile}
                  />
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => setCategory(!category)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.accordionText}>구독작가</Text>
                  <FastImage
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
                  params: {subscribeAuthorListData: subscribeAuthorListData},
                })
              }>
              <FastImage
                style={{width: 16, height: 16}}
                source={SearchProfile}
              />
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
                              ...styles.itemView,
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
                                    ...styles.itemView,
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
                                    ...styles.itemView,
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
                  <FastImage
                    style={{width: 14, height: 10, marginRight: 4}}
                    source={AllReaderProfile}
                  />
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
              {filterAuthor.length}
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
              {/* <TouchableOpacity
                onPress={() => setRecentSelect(true)}
                activeOpacity={1}>
                <Text
                  style={{
                    ...styles.bodyHeaderTextOrder,
                    color: recentSelect ? '#3C3C3C' : '#BEBEBE',
                  }}>
                  최신구독순
                </Text>
              </TouchableOpacity> */}
              {/* <Text style={{...styles.bodyHeaderTextOrder, color: '#BEBEBE'}}>
                ・
              </Text> */}
              {/* <TouchableOpacity
                onPress={() => setRecentSelect(false)}
                activeOpacity={1}>
                <Text
                  style={{
                    ...styles.bodyHeaderTextOrder,
                    color: recentSelect ? '#BEBEBE' : '#3C3C3C',
                  }}>
                  업데이트순
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </>
        <View style={{paddingBottom: 150}}>
          {filterAuthor.map((data, index) => (
            <TouchableOpacity
              onPress={e => onPressAuthorItem(data)}
              key={index}>
              <View style={styles.bodyItem}>
                <FastImage
                  style={{
                    width: 42,
                    height: 42,
                    marginRight: 10,
                    borderRadius: 90,
                  }}
                  source={
                    data.writerInfo.imgUrl === '' || !data.writerInfo.imgUrl
                      ? DefaultProfile
                      : {uri: data.writerInfo.imgUrl}
                  }
                />
                <View>
                  <Text style={styles.bodyItemName}>
                    {data.writerInfo.nickName}
                  </Text>
                  <Text style={styles.bodyItemIntro} numberOfLines={2}>
                    {data.writerInfo.introduction
                      ? data.writerInfo.introduction
                      : ''}
                  </Text>
                </View>
                {data.subscribeCheck ? (
                  <TouchableOpacity
                    style={{position: 'absolute', right: 20}}
                    onPress={() => cancelSubscribe(data.writerInfo.id, index)}>
                    <View style={styles.subscribeView}>
                      <Text style={styles.subscribeText}>구독중</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{position: 'absolute', right: 20}}
                    onPress={() => setSubscribe(data.writerInfo.id, index)}>
                    <View style={styles.notSubscribeView}>
                      <Text style={styles.notSubscribeText}>구독하기</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
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
  itemView: {
    paddingHorizontal: 12,
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
  bodyItem: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  bodyItemName: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  bodyItemIntro: {
    width: Dimensions.get('window').width - 40 - 42 - 15 - 75 - 10,
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
  refreshView: {
    backgroundColor: '#4562F1',
    position: 'absolute',
    left: 0,
    right: 0,
    top: -5,
    alignItems: 'center',
  },
});

export default ReaderProfile;
