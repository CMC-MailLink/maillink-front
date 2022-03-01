import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import MenuProfile from '../../../assets/images/MenuProfile.png';
import MenuItemProfile1 from '../../../assets/images/MenuItemProfile1.png';
import MenuItemProfile2 from '../../../assets/images/MenuItemProfile2.png';
import MenuItemProfile3 from '../../../assets/images/MenuItemProfile3.png';
import SearchAuthorProfile from '../../../assets/images/SearchAuthorProfile.png';

const AuthorProfileMail = () => {
  const [recentSelect, setRecentSelect] = useState(true);
  const onPressRecent = () => {
    setRecentSelect(true);
  };
  const onPressOld = () => {
    setRecentSelect(false);
  };
  const [mail, setMail] = useState([
    {
      key: '0',
      author: '이작가',
      title: '청춘예찬2',
      body: '피가 광야에서 이는 위하여 없으면, 풍부하게 심장의 영락과 곳으로 것이다. 끝까지 목숨을 청춘 거선의',
      date: '21. 02. 13',
      rep: true,
      show: true,
    },
    {
      key: '1',
      author: '김작가',
      title: '청춘예찬1',
      body: '그것은 장식하는 발휘하기 싶이 그들의 때까지 피어나는 원질이 쓸쓸하랴? 일월과 따뜻한 꾸며 열락의',
      date: '21. 02. 12',
      rep: false,
      show: true,
    },
    {
      key: '2',
      author: '이작가',
      title: '청춘예찬0',
      body: '그들은 광야에서 얼마나 무엇을 때문이다. 인생을 것은 같으며, 것이다. 발휘하기 굳세게 인생의 설산에',
      date: '21. 02. 11',
      rep: false,
      show: true,
    },
    {
      key: '3',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
      rep: false,
      show: true,
    },
    {
      key: '4',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
      rep: false,
      show: true,
    },
    {
      key: '5',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
      rep: false,
      show: true,
    },
    {
      key: '6',
      author: '최작가',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 10',
      rep: false,
      show: true,
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

  const cancelRep = index => {
    var temp = mail;
    temp[index].rep = false;
    setMail([...temp]);
  };
  const setRep = index => {
    var temp = mail;
    temp[index].rep = true;
    setMail([...temp]);
  };
  const cancelShow = index => {
    var temp = mail;
    temp[index].show = false;
    setMail([...temp]);
  };
  const setShow = index => {
    var temp = mail;
    temp[index].show = true;
    setMail([...temp]);
  };

  const RenderMenuItem = ({item, index}) => {
    return (
      <Menu
        style={{
          width: 20,
          height: 20,
          justifyContent: 'center',
          position: 'absolute',
          right: 0,
        }}>
        <MenuTrigger
          style={{
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={{width: 13, height: 2.29}} source={MenuProfile}></Image>
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          {item.rep === true ? (
            <MenuOption onSelect={() => cancelRep(index)}>
              <Text>대표글 취소하기</Text>
              <Image
                style={{
                  width: 11,
                  height: 17,
                  position: 'absolute',
                  right: 22.5,
                }}
                source={MenuItemProfile1}></Image>
            </MenuOption>
          ) : (
            <MenuOption onSelect={() => setRep(index)}>
              <Text>대표글로 설정하기</Text>
              <Image
                style={{
                  width: 11,
                  height: 17,
                  position: 'absolute',
                  right: 22.5,
                }}
                source={MenuItemProfile1}></Image>
            </MenuOption>
          )}
          {item.show ? (
            <MenuOption
              style={{borderBottomWidth: 0}}
              onSelect={() => cancelShow(index)}>
              <Text>비공개글로 전환하기</Text>
              <Image
                style={{
                  width: 16,
                  height: 21,
                  position: 'absolute',
                  right: 22.5,
                }}
                source={MenuItemProfile3}></Image>
            </MenuOption>
          ) : (
            <MenuOption onSelect={() => setShow(index)}>
              <Text>공개글로 전환하기</Text>
              <Image
                style={{
                  width: 16,
                  height: 21,
                  position: 'absolute',
                  right: 22.5,
                }}
                source={MenuItemProfile2}></Image>
            </MenuOption>
          )}
        </MenuOptions>
      </Menu>
    );
  };

  const renderItem = ({item, index}) => {
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
        <Text style={styles.mailItemTitle}>{item.title}</Text>
        <Text style={styles.mailItemBody}>{item.body}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.mailItemDate}>{item.date}</Text>
          {item.show ? (
            <Text style={styles.mailItemOpen}>공개</Text>
          ) : (
            <Text style={styles.mailItemClose}>비공개</Text>
          )}
          <RenderMenuItem item={item} index={index}></RenderMenuItem>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 150}}>
      <View style={styles.refView}>
        <Text style={styles.refText}>대표글</Text>
        {mail.map((data, index) => {
          if (data.rep === true)
            return (
              <View style={styles.mailItemView} key={index}>
                <Text style={styles.mailItemTitle}>{data.title}</Text>
                <Text style={styles.mailItemBody}>{data.body}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.mailItemDate}>{data.date}</Text>
                  {data.show ? (
                    <Text style={styles.mailItemOpen}>공개</Text>
                  ) : (
                    <Text style={styles.mailItemClose}>비공개</Text>
                  )}
                  <RenderMenuItem item={data} index={index}></RenderMenuItem>
                </View>
              </View>
            );
          else return;
        })}
      </View>
      <View style={styles.publishView}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.refText}>발행글</Text>
          <TouchableOpacity style={{position: 'absolute', right: 0}}>
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
                  color: recentSelect ? '#000000' : '#BEBEBE',
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
                  color: recentSelect ? '#BEBEBE' : '#000000',
                }}>
                오래된순
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={mail}
        renderItem={renderItem}
        keyExtractor={item => item.key}></FlatList>
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
  },
  mailItemView: {marginTop: 15},
  mailItemTitle: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#3C3C3C',
    marginBottom: 7,
  },
  mailItemBody: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#828282',
    paddingRight: 36,
    marginBottom: 7,
  },
  mailItemDate: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#BEBEBE',
  },
  mailItemOpen: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#4562F1',
    position: 'absolute',
    right: 36,
  },
  mailItemClose: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#BEBEBE',
    position: 'absolute',
    right: 36,
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
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
  },
  menuItemText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 15,
    color: '#5F5F5F',
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
