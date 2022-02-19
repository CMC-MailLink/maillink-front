import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import SettingProfile from '../../assets/images/SettingProfile.png';
import AccordionProfile from '../../assets/images/AccordionProfile.png';
import AccordionProfile2 from '../../assets/images/AccordionProfile2.png';
import SearchProfile from '../../assets/images/SearchProfile.png';

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

  return (
    <View style={{flex: 1}}>
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
      <View style={styles.profileView}></View>
      <View style={styles.profileAccordion}>
        <Text style={styles.accordionText}>구독작가</Text>
        {category ? (
          <TouchableOpacity onPress={onPressAccordion}>
            <Image
              style={{width: 10, height: 5}}
              source={AccordionProfile}></Image>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressAccordion}>
            <Image
              style={{width: 10, height: 5}}
              source={AccordionProfile2}></Image>
          </TouchableOpacity>
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
      <View style={styles.bodyHeader}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 150 - 48,
    backgroundColor: '#4562F1',
    alignItems: 'center',
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
});

export default Profile;
