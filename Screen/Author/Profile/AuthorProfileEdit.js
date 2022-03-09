import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import BackMail3 from '../../../assets/images/BackMail3.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import ImageEditProfile from '../../../assets/images/ImageEditProfile.png';
import ClearTextInput from '../../../assets/images/ClearTextInput.png';
import InfoAuthorProfile from '../../../assets/images/InfoAuthorProfile.png';
import FacebookNone from '../../../assets/images/FacebookNone.png';
import TwitterNone from '../../../assets/images/TwitterNone.png';
import InstagramNone from '../../../assets/images/InstagramNone.png';
import URLNone from '../../../assets/images/URLNone.png';

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

const AuthorProfileEdit = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState('');
  const [editName, setEditName] = useState('영이');
  const [editFacebook, setEditFacebook] = useState('');
  const [editTwitter, setEditTwitter] = useState('');
  const [editInstagram, setEditInstagram] = useState('');
  const [editURL, setEditURL] = useState('');
  const [onFocus, setOnFocus] = useState(0);
  const [confirm, setConfirm] = useState(0);
  const [editIntro, setEditIntro] = useState('');
  const nameList = ['영이1', '영이2'];
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

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressEditImage = async () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
        maxWidth: 78,
        maxHeight: 78,
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };
        setImageUri(source);
      }
    });
  };

  const confirmName = () => {
    if (editName === '') {
      setConfirm(2);
      setOnFocus(2);
      return;
    }
    var temp = nameList.filter(item => {
      if (item === editName) {
        return true;
      }
    });
    if (temp.length) {
      setConfirm(2);
      setOnFocus(2);
    } else {
      setConfirm(1);
      setOnFocus(0);
    }
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
          if (data.rep) data.rep = false;
        });
        temp[index].rep = true;
      }
    } else {
      temp[index].select = true;
    }
    setVive([...temp]);
  };

  const RenderInfoItem = ({item}) => {
    return (
      <Menu style={styles.menuView}>
        <MenuTrigger style={styles.menuTriggerView}>
          <Image
            style={{width: 16, height: 16}}
            source={InfoAuthorProfile}></Image>
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

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail3} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>프로필 수정</Text>
      </View>
      <ScrollView>
        <View style={{alignItems: 'center', height: 60}}>
          <TouchableWithoutFeedback onPress={onPressEditImage}>
            <Image
              style={{width: 58.17, height: 58.17, borderRadius: 90}}
              source={imageUri == '' ? DefaultProfile : imageUri}></Image>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPressEditImage}>
            <Image
              style={{width: 20.82, height: 20.82, top: -20.5, left: 20.18}}
              source={ImageEditProfile}></Image>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>작가명</Text>
          <View
            style={{
              ...styles.inputView,
              borderBottomColor:
                onFocus === 0
                  ? '#BEBEBE'
                  : onFocus === 1
                  ? '#4562F1'
                  : '#FF9B9B',
            }}>
            <TextInput
              style={styles.inputText}
              placeholder="닉네임을 입력해주세요."
              placeholderTextColor="#BEBEBE"
              maxLength={6}
              value={editName}
              onChangeText={setEditName}
              onFocus={() => {
                setOnFocus(1);
                setConfirm(0);
              }}
              onBlur={() => setOnFocus(0)}
              blurOnSubmit={true}></TextInput>
            <TouchableOpacity>
              <Image
                style={{width: 12, height: 12}}
                source={ClearTextInput}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmName}>
              <View style={styles.confirmView}>
                <Text style={styles.confirmText}>확인</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.inputBottomText}>
            {confirm === 0
              ? '한글 6자까지 설정 가능합니다. '
              : confirm === 1
              ? '사용할 수 있는 이름이에요.'
              : '사용할 수 없는 이름이에요. (한글 6자 제한)'}
          </Text>
          <Text style={styles.titleText}>소개</Text>
          <View style={styles.introView}>
            <TextInput
              style={styles.introText}
              multiline={true}
              maxLength={160}
              value={editIntro}
              onChangeText={setEditIntro}></TextInput>
          </View>
          <Text style={styles.introCountText}>
            <Text style={{color: '#4562F1'}}>{editIntro.length}</Text> / 160자
          </Text>
        </View>
        <View style={styles.titleView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.titleText}>갈래</Text>
            <TouchableOpacity>
              <RenderInfoItem></RenderInfoItem>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: 12, marginBottom: 32}}>
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
          <Text style={styles.titleText}>분위기</Text>
          <View style={{flexDirection: 'row', marginTop: 12, marginBottom: 10}}>
            {vive.map((item, index) => {
              if (index < 4)
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
            })}
          </View>
          <View style={{flexDirection: 'row'}}>
            {vive.map((item, index) => {
              if (index >= 4)
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
            })}
          </View>
        </View>
        <View
          style={{
            ...styles.titleView,
            borderBottomWidth: 0,
            paddingBottom: 150,
          }}>
          <Text style={{...styles.titleText, marginBottom: 4}}>웹사이트</Text>
          <View>
            <View style={styles.websiteView}>
              <Image
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={FacebookNone}></Image>
              <Text style={styles.websiteText}>facebook.com/</Text>
              <TextInput
                style={styles.websiteTextInput}
                value={editFacebook}
                onChangeText={setEditFacebook}></TextInput>
            </View>
            <View style={styles.websiteView}>
              <Image
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={TwitterNone}></Image>
              <Text style={styles.websiteText}>twitter.com/</Text>
              <TextInput
                style={styles.websiteTextInput}
                value={editTwitter}
                onChangeText={setEditTwitter}></TextInput>
            </View>
            <View style={styles.websiteView}>
              <Image
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={InstagramNone}></Image>
              <Text style={styles.websiteText}>instagram.com/</Text>
              <TextInput
                style={styles.websiteTextInput}
                value={editInstagram}
                onChangeText={setEditInstagram}></TextInput>
            </View>
            <View style={styles.websiteView}>
              <Image
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={URLNone}></Image>
              <TextInput
                style={styles.websiteTextInput}
                value={editURL}
                onChangeText={setEditURL}></TextInput>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity>
        <View style={styles.buttonView}>
          <Text style={styles.buttonText}>확인</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 40,
    marginBottom: 18,
  },
  headerText: {
    width: '100%',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    textAlign: 'center',
    includeFontPadding: false,
  },
  titleView: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 21,
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 1,
  },
  titleText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    color: '#828282',
    includeFontPadding: false,
  },
  inputView: {
    paddingVertical: Platform.OS === 'ios' ? 9 : 9,
    width: '100%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    width: 250,
    padding: 0,
    height: 30,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  inputBottomText: {
    marginTop: 7,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 13,
    color: '#BEBEBE',
    marginBottom: 30,
    includeFontPadding: false,
  },
  confirmView: {
    width: 65.63,
    height: 24.54,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  confirmText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#FFF',
    includeFontPadding: false,
  },
  introText: {
    padding: 0,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  introView: {
    paddingVertical: 9,
    width: '100%',
    borderBottomColor: '#BEBEBE',
    borderBottomWidth: 1,
  },
  introCountText: {
    marginTop: 6,
    paddingRight: 2,
    textAlign: 'right',
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
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
  websiteView: {
    flexDirection: 'row',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 0.5,
    paddingVertical: 14,
    alignItems: 'center',
  },
  websiteText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  websiteTextInput: {
    padding: 0,
    width: '100%',
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  menuText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 11,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  buttonView: {
    bottom: 30,
    marginHorizontal: 20,
    height: 52,
    backgroundColor: '#4562F1',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFF',
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

export default AuthorProfileEdit;
