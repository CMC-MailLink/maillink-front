import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import {AuthorAPI} from '../../../API/AuthorAPI';

import BackMail3 from '../../../assets/images/BackMail3.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import ImageEditProfile from '../../../assets/images/ImageEditProfile.png';
import InfoAuthorProfile from '../../../assets/images/InfoAuthorProfile.png';
import FacebookNone from '../../../assets/images/FacebookNone.png';
import TwitterNone from '../../../assets/images/TwitterNone.png';
import InstagramNone from '../../../assets/images/InstagramNone.png';
import URLNone from '../../../assets/images/URLNone.png';
import EraseNickname from '../../../assets/images/EraseNickname.png';

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

const AuthorProfileEdit = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [imageUri, setImageUri] = useState('');
  const [originName, setOriginName] = useState('');
  const [editName, setEditName] = useState('');
  const [nameValid, setNameValid] = useState(true); //닉네임 유효성 검증 유무
  const [editFacebook, setEditFacebook] = useState('');
  const [editTwitter, setEditTwitter] = useState('');
  const [editInstagram, setEditInstagram] = useState('');
  const [editURL, setEditURL] = useState('');
  const [editIntro, setEditIntro] = useState('');
  const [checkMessage, onChangeCheckMessage] = useState(''); //textinput아래 안내 메세지
  const [messageVisible, setMessageVisible] = useState(false); //안내메세지 보이기
  const [confirmSuccess, setConfirmSuccess] = useState(false); //닉네임 확인 성공 유무
  const [branchRank, setBranchRank] = useState(0);
  const [viveRank, setViveRank] = useState(0);
  const facebookRef = useRef();
  const twitterRef = useRef();
  const instagramRef = useRef();
  const urlRef = useRef();

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

  useEffect(() => {
    setEditName(params.writerInfo.nickName);
    setOriginName(params.writerInfo.nickName);
    if (params.writerInfo.introduction) {
      setEditIntro(params.writerInfo.introduction);
    }
    setImageUri(params.writerInfo.imgUrl);
    setEditFacebook(params.writerInfo.facebook);
    setEditTwitter(params.writerInfo.twitter);
    setEditInstagram(params.writerInfo.instagram);
    setEditURL(params.writerInfo.etc);
    editBranch();
    editVive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const editBranch = () => {
    var tempBranch = branch;
    var count = 0;
    tempBranch.map(data => {
      if (colorCategory[data.name].name === params.writerInfo.genre1) {
        data.rank = 1;
        count++;
      } else if (colorCategory[data.name].name === params.writerInfo.genre2) {
        data.rank = 2;
        count++;
      } else if (colorCategory[data.name].name === params.writerInfo.genre3) {
        data.rank = 3;
        count++;
      }
    });
    setBranch([...tempBranch]);
    setBranchRank(count);
  };

  const editVive = () => {
    var tempVive = vive;
    var count = 0;
    tempVive.map(data => {
      if (colorCategory[data.name].name === params.writerInfo.mood1) {
        data.rank = 1;
        count++;
      } else if (colorCategory[data.name].name === params.writerInfo.mood2) {
        data.rank = 2;
        count++;
      } else if (colorCategory[data.name].name === params.writerInfo.mood3) {
        data.rank = 3;
        count++;
      }
    });
    setVive([...tempVive]);
    setViveRank(count);
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  //프로필 이미지 수정 버튼
  const onPressEditImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImageUri(image.path);
    });
  };

  const onPressBranch = (item, index) => {
    var temp = branch;
    if (temp[index].rank === 0) {
      temp[index].rank = branchRank + 1;
      setBranchRank(branchRank + 1);
    } else if (temp[index].rank === 1) {
      temp[index].rank = 0;
      temp.map(data => {
        if (data.rank === 2 || data.rank === 3) {
          data.rank--;
        }
      });
      setBranchRank(branchRank - 1);
    } else if (temp[index].rank === 2) {
      temp[index].rank = 0;
      temp.map(data => {
        if (data.rank === 3) {
          data.rank--;
        }
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
      if (viveRank === 3) {
        return;
      }
      temp[index].rank = viveRank + 1;
      setViveRank(viveRank + 1);
    } else if (temp[index].rank === 1) {
      temp[index].rank = 0;
      temp.map(data => {
        if (data.rank === 2 || data.rank === 3) {
          data.rank--;
        }
      });
      setViveRank(viveRank - 1);
    } else if (temp[index].rank === 2) {
      temp[index].rank = 0;
      temp.map(data => {
        if (data.rank === 3) {
          data.rank--;
        }
      });
      setViveRank(viveRank - 1);
    } else if (temp[index].rank === 3) {
      temp[index].rank = 0;
      setViveRank(viveRank - 1);
    }
    setVive([...temp]);
  };

  //확인 버튼 클릭
  const onCheckName = async () => {
    if (editName === originName) {
      onChangeCheckMessage('사용할 수 있는 이름이에요.');
      setNameValid(true);
      setMessageVisible(true);
      setConfirmSuccess(true);
      return;
    }
    var result = await AuthorAPI.checkNickName({nickName: editName});
    if (!result) {
      onChangeCheckMessage('이미 존재하는 닉네임입니다.');
      setMessageVisible(true);
      setNameValid(false);
      setConfirmSuccess(false);
    } else if (!editName || editName.length > 6) {
      onChangeCheckMessage('사용할 수 없는 이름이에요. (최대 6자 제한)');
      setMessageVisible(true);
      setNameValid(false);
      setConfirmSuccess(false);
    } else if (result && editName) {
      onChangeCheckMessage('사용할 수 있는 이름이에요.');
      setNameValid(true);
      setMessageVisible(true);
      setConfirmSuccess(true);
    }
  };

  //닉네임 전체 지우기 버튼
  const onPressErase = () => {
    setEditName('');
  };

  const onPressSave = async () => {
    var genre1 = null;
    var genre2 = null;
    var genre3 = null;
    var mood1 = null;
    var mood2 = null;
    var mood3 = null;
    branch.map(data => {
      if (data.rank === 1) {
        genre1 = colorCategory[data.name].name;
      } else if (data.rank === 2) {
        genre2 = colorCategory[data.name].name;
      } else if (data.rank === 3) {
        genre3 = colorCategory[data.name].name;
      }
    });
    vive.map(data => {
      if (data.rank === 1) {
        mood1 = colorCategory[data.name].name;
      } else if (data.rank === 2) {
        mood2 = colorCategory[data.name].name;
      } else if (data.rank === 3) {
        mood3 = colorCategory[data.name].name;
      }
    });

    if (editName === params.writerInfo.nickName) {
      var result1 = true;
    } else {
      var result1 = await AuthorAPI.changeNickName({nickName: editName});
    }
    if (imageUri) {
      const imageData = new FormData();
      imageData.append('image', {
        uri: imageUri,
        name: 'image.png',
        fileName: 'image',
        type: 'image/png',
      });
      var result2 = await AuthorAPI.changeProfileImage({image: imageData});
    } else {
      var result2 = true;
    }
    var result3 = await AuthorAPI.infoEditing({
      introduction: editIntro,
      genre1: genre1,
      genre2: genre2,
      genre3: genre3,
      mood1: mood1,
      mood2: mood2,
      mood3: mood3,
      facebook: editFacebook,
      twitter: editTwitter,
      instagram: editInstagram,
      etc: editURL,
    });
    if (result1 && result2 && result3) {
      await queryClient.refetchQueries(['AuthorProfile']);
      await queryClient.refetchQueries(['AuthorInfo']);
      onPressBack();
    }
  };

  const RenderInfoItem = ({item}) => {
    return (
      <Menu style={styles.menuView}>
        <MenuTrigger style={styles.menuTriggerView}>
          <FastImage
            style={{width: 16, height: 16}}
            source={InfoAuthorProfile}
          />
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

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24}}>
            <FastImage style={{width: 9.5, height: 19}} source={BackMail3} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>프로필 수정</Text>
      </View>

      <KeyboardAwareScrollView>
        <View style={{alignItems: 'center', height: 60}}>
          <TouchableWithoutFeedback onPress={onPressEditImage}>
            <FastImage
              style={{width: 58.17, height: 58.17, borderRadius: 90}}
              defaultSource={DefaultProfile}
              source={imageUri ? {uri: imageUri} : DefaultProfile}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPressEditImage}>
            <FastImage
              style={{width: 20.82, height: 20.82, top: -20.5, left: 20.18}}
              source={ImageEditProfile}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>작가명</Text>
          <View
            style={{
              marginTop: 9,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: editName.length
                ? nameValid
                  ? '#4562F1'
                  : '#FF9B9B'
                : '#BEBEBE',
              paddingBottom: 10,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                ...Platform.select({
                  android: {height: 30},
                }),
              }}>
              <TextInput
                style={
                  !editName.length ? styles.NameSetPlaceHolder : styles.NameSet
                }
                onChangeText={value => {
                  setEditName(value);
                  setMessageVisible(false);
                  setConfirmSuccess(false);
                  setNameValid(true);
                }}
                value={editName}
                placeholder="닉네임 입력 (한글, 영문 6자)"
                autoCorrect={false}
              />
              <TouchableWithoutFeedback onPress={onPressErase}>
                <FastImage style={styles.eraseButton} source={EraseNickname} />
              </TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={onCheckName}
                style={!editName ? styles.confirmBasic : styles.confirmChange}>
                <Text
                  style={
                    !editName
                      ? styles.confirmBasicText
                      : styles.confirmChangeText
                  }>
                  확인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {messageVisible ? (
            <View style={{marginTop: 9}}>
              <Text style={styles.checkMessage}>{checkMessage}</Text>
            </View>
          ) : null}
          <Text style={styles.inputBottomText} />
          <Text style={styles.titleText}>소개</Text>
          <View style={styles.introView}>
            <TextInput
              style={styles.introText}
              multiline={true}
              maxLength={160}
              value={editIntro}
              onChangeText={setEditIntro}
            />
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
              <RenderInfoItem />
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
          <Text style={styles.titleText}>분위기</Text>
          <View style={{flexDirection: 'row', marginTop: 12, marginBottom: 10}}>
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
        <View
          style={{
            ...styles.titleView,
            borderBottomWidth: 0,
            paddingBottom: 150,
          }}>
          <Text style={{...styles.titleText, marginBottom: 4}}>웹사이트</Text>
          <View>
            <View style={styles.websiteView}>
              <FastImage
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={FacebookNone}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => facebookRef.current.focus()}>
                <Text style={styles.websiteText}>facebook.com/</Text>
              </TouchableOpacity>
              <TextInput
                ref={facebookRef}
                style={styles.websiteTextInput}
                value={editFacebook}
                onChangeText={setEditFacebook}
              />
            </View>
            <View style={styles.websiteView}>
              <FastImage
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={TwitterNone}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => twitterRef.current.focus()}>
                <Text style={styles.websiteText}>twitter.com/</Text>
              </TouchableOpacity>
              <TextInput
                ref={twitterRef}
                style={styles.websiteTextInput}
                value={editTwitter}
                onChangeText={setEditTwitter}
              />
            </View>
            <View style={styles.websiteView}>
              <FastImage
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={InstagramNone}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => instagramRef.current.focus()}>
                <Text style={styles.websiteText}>instagram.com/</Text>
              </TouchableOpacity>
              <TextInput
                ref={instagramRef}
                style={styles.websiteTextInput}
                value={editInstagram}
                onChangeText={setEditInstagram}
              />
            </View>
            <View style={styles.websiteView}>
              <FastImage
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={URLNone}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => urlRef.current.focus()}>
                <Text style={styles.websiteText}>https://</Text>
              </TouchableOpacity>
              <TextInput
                ref={urlRef}
                style={styles.websiteTextInput}
                value={editURL}
                onChangeText={setEditURL}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={onPressSave}
          disabled={viveRank === 0 || branchRank === 0 || !confirmSuccess}>
          <View
            style={{
              ...styles.buttonView,
              backgroundColor:
                viveRank === 0 || branchRank === 0 || !confirmSuccess
                  ? '#BEBEBE'
                  : '#4562F1',
            }}>
            <Text style={styles.buttonText}>저장</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
    ...Platform.select({
      android: {padding: 0},
    }),
  },
  introView: {
    paddingVertical: 9,
    width: '100%',
    borderBottomColor: '#BEBEBE',
    borderBottomWidth: 1,
    ...Platform.select({
      android: {height: 44},
    }),
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
    ...Platform.select({
      android: {},
    }),
  },
  websiteTextInput: {
    padding: 0,
    width: '100%',
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
    ...Platform.select({
      android: {height: 20},
    }),
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
  NameSet: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    color: '#3C3C3C',
    includeFontPadding: false,
    width: '70%',
    ...Platform.select({
      android: {padding: 0},
    }),
  },
  NameSetPlaceHolder: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 18,
    color: '#BEBEBE',
    includeFontPadding: false,
    width: '70%',
    ...Platform.select({
      android: {padding: 0},
    }),
  },
  confirmBasic: {
    position: 'absolute',
    right: 0,
    width: 69,
    height: 28,
    borderRadius: 15,
    borderColor: '#BEBEBE',
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBasicText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  confirmChange: {
    position: 'absolute',
    right: 0,
    width: 69,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmChangeText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  eraseButton: {
    width: 12,
    height: 12,
    position: 'absolute',
    right: 80,
  },
  checkMessage: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#BEBEBE',
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
