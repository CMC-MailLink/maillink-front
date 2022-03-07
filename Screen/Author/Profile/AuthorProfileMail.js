import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useNavigation} from '@react-navigation/native';

import MenuProfile from '../../../assets/images/MenuProfile.png';
import MenuItemProfile1 from '../../../assets/images/MenuItemProfile1.png';
import MenuItemProfile2 from '../../../assets/images/MenuItemProfile2.png';
import MenuItemProfile3 from '../../../assets/images/MenuItemProfile3.png';
import SearchAuthorProfile from '../../../assets/images/SearchAuthorProfile.png';

const AuthorProfileMail = () => {
  const navigation = useNavigation();
  const [recentSelect, setRecentSelect] = useState(true);
  const onPressRecent = () => {
    setRecentSelect(true);
  };
  const onPressOld = () => {
    setRecentSelect(false);
  };
  const [repMailKey, setRepMailKey] = useState(null);
  const [repMail, setRepMail] = useState(null);
  const [mail, setMail] = useState([
    {
      key: '0',
      author: '이작가',
      title: '청춘예찬2',
      body: '피가 광야에서 이는 위하여 없으면, 풍부하게 심장의 영락과 곳으로 것이다. 끝까지 목숨을 청춘 거선의',
      date: '21. 02. 13',
      show: true,
      rep: true,
    },
    {
      key: '1',
      author: '김작가',
      title: '청춘예찬1',
      body: '그것은 장식하는 발휘하기 싶이 그들의 때까지 피어나는 원질이 쓸쓸하랴? 일월과 따뜻한 꾸며 열락의',
      date: '21. 02. 12',
      show: true,
      rep: false,
    },
    {
      key: '2',
      author: '이작가',
      title: '청춘예찬0',
      body: '그들은 광야에서 얼마나 무엇을 때문이다. 인생을 것은 같으며, 것이다. 발휘하기 굳세게 인생의 설산에',
      date: '21. 02. 11',
      show: true,
      rep: false,
    },
    {
      key: '3',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
      show: true,
      rep: false,
    },
    {
      key: '4',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
      show: true,
      rep: false,
    },
    {
      key: '5',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
      show: true,
      rep: false,
    },
    {
      key: '6',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
      show: true,
      rep: false,
    },
  ]);
  useEffect(() => {
    setMail(data =>
      data.slice().sort(function (a, b) {
        if (a.date >= b.date) {
          return recentSelect ? -1 : 1;
        } else if (a.date < b.date) {
          return recentSelect ? 1 : -1;
        }
      }),
    );
  }, [recentSelect]);

  const cancelRep = key => {
    if (key === repMailKey) {
      var temp = mail;
      temp.map(item => {
        if (item.key === key) {
          item.rep = false;
          setRepMail(null);
          setRepMailKey(null);
        }
      });
      setMail([...temp]);
    }
  };

  const setRep = key => {
    if (repMailKey === null) {
      var temp = mail;
      temp.map(item => {
        if (item.key === key) {
          item.rep = true;
          setRepMail(item);
          setRepMailKey(item.key);
        }
      });
      setMail([...temp]);
    }
  };
  const cancelShow = key => {
    var temp = mail;
    temp.map(item => {
      if (item.key === key) item.show = false;
    });
    setMail([...temp]);
  };
  const setShow = key => {
    var temp = mail;
    temp.map(item => {
      if (item.key === key) item.show = true;
    });
    setMail([...temp]);
  };
  const onPressSearch = () => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorProfileSearch',
    });
  };

  const RenderMenuItem = ({item}) => {
    return (
      <Menu style={styles.menuView}>
        <MenuTrigger style={styles.menuTriggerView}>
          <Image style={{width: 13, height: 2.29}} source={MenuProfile}></Image>
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption onSelect={() => cancelRep(item.key)}>
            <Text>대표글 취소하기</Text>
            <Image style={styles.menuImage} source={MenuItemProfile1}></Image>
          </MenuOption>
          <MenuOption onSelect={() => setRep(item.key)}>
            <Text>대표글로 설정하기</Text>
            <Image style={styles.menuImage} source={MenuItemProfile1}></Image>
          </MenuOption>
          {item.show ? (
            <MenuOption
              style={{borderBottomWidth: 0}}
              onSelect={() => cancelShow(item.key)}>
              <Text>비공개글로 전환하기</Text>
              <Image
                style={styles.menuImage2}
                source={MenuItemProfile3}></Image>
            </MenuOption>
          ) : (
            <MenuOption onSelect={() => setShow(item.key)}>
              <Text>공개글로 전환하기</Text>
              <Image
                style={styles.menuImage2}
                source={MenuItemProfile2}></Image>
            </MenuOption>
          )}
        </MenuOptions>
      </Menu>
    );
  };

  const RenderItem = ({data}) => {
    return (
      <View
        style={{
          ...styles.mailItemView,
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: 1,
          paddingHorizontal: 20,
          paddingVertical: 13,
          marginTop: 0,
        }}>
        <Text style={styles.mailItemTitle}>{data.title}</Text>
        <Text style={styles.mailItemBody}>{data.body}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.mailItemDate}>{data.date}</Text>
          {data.show ? (
            <Text style={styles.mailItemOpen}>공개</Text>
          ) : (
            <Text style={styles.mailItemClose}>비공개</Text>
          )}
          <RenderMenuItem item={data}></RenderMenuItem>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 150}}>
      <View style={styles.refView}>
        <Text style={styles.refText}>대표글</Text>
        {repMail !== null ? (
          <View style={styles.mailItemView}>
            <Text style={styles.mailItemTitle}>{repMail.title}</Text>
            <Text style={styles.mailItemBody}>{repMail.body}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.mailItemDate}>{repMail.date}</Text>
              {repMail.show ? (
                <Text style={styles.mailItemOpen}>공개</Text>
              ) : (
                <Text style={styles.mailItemClose}>비공개</Text>
              )}
              <RenderMenuItem item={repMail}></RenderMenuItem>
            </View>
          </View>
        ) : (
          <View>
            <Text>설정한 대표글이 없습니다.</Text>
          </View>
        )}
      </View>
      <View style={styles.publishView}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.refText}>발행글</Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 0}}
            onPress={onPressSearch}>
            <Image
              style={{width: 16, height: 16}}
              source={SearchAuthorProfile}></Image>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.publishText}>
            총&nbsp;<Text style={{color: '#3C3C3C'}}>{mail.length}</Text>편
          </Text>
          <View
            style={{
              width: 92,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
              position: 'absolute',
              right: 0,
            }}>
            <TouchableOpacity onPress={onPressRecent} activeOpacity={1}>
              <Text
                style={{
                  ...styles.bodyHeaderTextOrder,
                  color: recentSelect ? '#3C3C3C' : '#BEBEBE',
                }}>
                최신순
              </Text>
            </TouchableOpacity>
            <Text style={{...styles.bodyHeaderTextOrder, color: '#BEBEBE'}}>
              ・
            </Text>
            <TouchableOpacity onPress={onPressOld} activeOpacity={1}>
              <Text
                style={{
                  ...styles.bodyHeaderTextOrder,
                  color: recentSelect ? '#BEBEBE' : '#3C3C3C',
                }}>
                오래된순
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {mail.map((data, index) => {
        return <RenderItem data={data} key={data.key}></RenderItem>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  refView: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#F8F8F8',
  },
  refText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  mailItemView: {marginTop: 15},
  mailItemTitle: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
    marginBottom: 7,
    includeFontPadding: false,
  },
  mailItemBody: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#828282',
    paddingRight: 36,
    marginBottom: 7,
    includeFontPadding: false,
  },
  mailItemDate: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  mailItemOpen: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#4562F1',
    position: 'absolute',
    right: 36,
    includeFontPadding: false,
  },
  mailItemClose: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#BEBEBE',
    position: 'absolute',
    right: 36,
    includeFontPadding: false,
  },
  publishView: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  publishText: {
    marginTop: 12,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#828282',
    includeFontPadding: false,
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    includeFontPadding: false,
  },
  menuItemText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 15,
    color: '#5F5F5F',
    includeFontPadding: false,
  },
  menuView: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  menuTriggerView: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuImage: {
    width: 11,
    height: 17,
    position: 'absolute',
    right: 22.5,
  },
  menuImage2: {
    width: 16,
    height: 21,
    position: 'absolute',
    right: 22.5,
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.082,
    shadowRadius: 29,
  },
  optionWrapper: {
    paddingHorizontal: 22.5,
    paddingVertical: 17.5,
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default AuthorProfileMail;
