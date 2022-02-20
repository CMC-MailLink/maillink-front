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
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import SettingProfile from '../../assets/images/SettingProfile.png';
import AccordionProfile from '../../assets/images/AccordionProfile.png';
import AccordionProfile2 from '../../assets/images/AccordionProfile2.png';
import SearchProfile from '../../assets/images/SearchProfile.png';
import AuthorMail from '../../assets/images/AuthorMail.png';
import DefaultProfile from '../../assets/images/DefaultProfile.png';
import ImageEditProfile from '../../assets/images/ImageEditProfile.png';
import ProfileModal from './ProfileModal';

const Profile = () => {
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
    {name: '이작가', intro: '안녕하세요. 이작가입니다.', order: 1, update: 3},
    {name: '김작가', intro: '안녕하세요. 김작가입니다.', order: 2, update: 2},
    {name: '덩이', intro: '안녕하세요. 덩이입니다.', order: 3, update: 1},
  ]);
  const [category, setCategory] = useState(false);
  const [recentSelect, setRecentSelect] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [name, setName] = useState('영이');
  const [editName, setEditName] = useState('영이');

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
        <ProfileModal
          editName={editName}
          setEditName={setEditName}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onPressModalConfirm={onPressModalConfirm}></ProfileModal>
      </Modal>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>프로필</Text>
        <TouchableOpacity
          style={{position: 'absolute', right: 20, bottom: 18}}
          onPress={() => {
            navigation.navigate('Stacks', {
              screen: 'Setting',
            });
          }}>
          <Image
            style={{
              width: 18.68,
              height: 19.2,
            }}
            source={SettingProfile}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.profileView}>
        <View
          style={{
            alignItems: 'center',
            top: -39,
            width: 80,
          }}>
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
          <TouchableWithoutFeedback onPress={() => setCategory(!category)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.accordionText}>구독작가</Text>
              <Image
                style={{width: 10, height: 5}}
                source={AccordionProfile}></Image>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={() => setCategory(!category)}>
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
          onPress={() =>
            navigation.navigate('Stacks', {
              screen: 'ProfileSearch',
            })
          }>
          <Image style={{width: 16, height: 16}} source={SearchProfile}></Image>
        </TouchableOpacity>
      </View>
      {category ? (
        <View style={styles.categoryView}>
          <View style={styles.branchView}>
            <Text style={styles.categoryText}>갈래</Text>
            <View
              style={{flexDirection: 'row', position: 'absolute', left: 58}}>
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
                      if (index > 4) return null;
                      else
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
                                  color: data.select ? '#4562F1' : '#828282',
                                }}>
                                {data.category}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                    })
                  : null}
              </View>
              <View style={{flexDirection: 'row'}}>
                {vive.length
                  ? vive.map((data, index) => {
                      if (index < 5) return null;
                      else
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
                                  color: data.select ? '#4562F1' : '#828282',
                                }}>
                                {data.category}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                    })
                  : null}
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
          <TouchableOpacity
            onPress={() => setRecentSelect(true)}
            activeOpacity={1}>
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
          <TouchableOpacity
            onPress={() => setRecentSelect(false)}
            activeOpacity={1}>
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
            onPress={() => setSubscribe(!subscribe)}
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
});

export default Profile;
