import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FloatingAction} from 'react-native-floating-action';
import Clipboard from '@react-native-clipboard/clipboard';

import PenceilWriting from '../../../assets/images/PenceilWriting.png';
import LinkAuthorWrite from '../../../assets/images/LinkAuthorWrite.png';

const AuthorWrite = () => {
  const navigation = useNavigation();
  const [recentSelect, setRecentSelect] = useState(true);
  const [storage, setStorage] = useState([
    {
      id: '0',
      title: '청춘예찬2',
      body: '피가 광야에서 이는 위하여 없으면, 풍부하게 심장의 영락과 곳으로 것이다. 끝까지 목숨을 청춘 거선의',
      date: '21. 02. 12',
    },
    {
      id: '1',
      title: '청춘예찬1',
      body: '그것은 장식하는 발휘하기 싶이 그들의 때까지 피어나는 원질이 쓸쓸하랴? 일월과 따뜻한 꾸며 열락의',
      date: '21. 02. 11',
    },
    {
      id: '2',
      title: '청춘예찬0',
      body: '그들은 광야에서 얼마나 무엇을 때문이다. 인생을 것은 같으며, 것이다. 발휘하기 굳세게 인생의 설산에',
      date: '21. 02. 10',
    },
    {
      id: '3',
      title: '청춘예찬',
      body: '두손을 석가는 미인을 풀이 생명을 구하지 스며들어 인간의 위하여 운다. 청춘에서만 인생을 힘차게 내',
      date: '21. 02. 09',
    },
  ]);

  useEffect(() => {
    setStorage(data =>
      data.slice().sort(function (a, b) {
        if (a.date >= b.date) {
          return recentSelect ? -1 : 1;
        } else if (a.date < b.date) {
          return recentSelect ? 1 : -1;
        }
      }),
    );
  }, [recentSelect]);

  const onPressRecent = () => {
    setRecentSelect(true);
  };

  const onPressOld = () => {
    setRecentSelect(false);
  };

  const onPressWritingPage = () => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorEditor',
    });
  };

  const onPressStorageItem = () => {
    //pressStorage
  };

  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={e => onPressStorageItem(item)}>
        <View style={styles.itemView}>
          <Text style={styles.itemDateText}>{item.date}</Text>
          <Text style={styles.itemTitleText}>{item.title}</Text>
          <Text style={styles.itemBodyText}>{item.body}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>메일쓰기</Text>
      </View>
      <View style={styles.bodyHeader}>
        <Text
          style={{
            fontFamily: 'NotoSansKR-Medium',
            fontSize: 14,
            color: '#3C3C3C',
          }}>
          임시저장함
        </Text>
        <View
          style={{
            width: 92,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
      <View style={styles.bodyContainer}>
        <FlatList
          data={storage}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <TouchableOpacity
              onPress={() => Clipboard.setString('maillink address')}>
              <View style={styles.LinkView}>
                <View>
                  <View style={{marginBottom: 5}}>
                    <Text style={styles.LinkText}>
                      <Text style={{fontFamily: 'NotoSansKR-Bold'}}>
                        웹사이트
                      </Text>
                      에서도 편하게
                    </Text>
                    <Text style={styles.LinkText}>
                      글을 작성하고 발행해보세요!
                    </Text>
                  </View>
                  <Text style={styles.LinkCopyText}>클릭하여 링크복사하기</Text>
                </View>
                <Image
                  style={{width: 134, height: 92}}
                  source={LinkAuthorWrite}></Image>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
      <FloatingAction
        actions={[
          {
            icon: (
              <Image
                style={{
                  width: 22,
                  height: 22,
                }}
                source={PenceilWriting}
              />
            ),
            name: 'bt_search',
            position: 1,
            buttonSize: 50,
          },
        ]}
        color="#FFF"
        distanceToEdge={{vertical: 110, horizontal: 17}}
        buttonSize={50}
        shadow={{
          shadowOpacity: 0.12,
          shadowColor: '#000000',
          shadowRadius: 23,
        }}
        overrideWithAction={true}
        animated={false}
        onPressItem={name => {
          onPressWritingPage();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 94 - 48,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  bodyHeader: {
    width: '100%',
    height: 32.6,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    // paddingBottom: 103 - 23.78,
    paddingBottom: 84.5,
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    includeFontPadding: false,
  },
  LinkView: {
    backgroundColor: '#F4F6FF',
    height: 92,
    paddingHorizontal: 35,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  LinkText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  LinkCopyText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 11,
    color: '#4562F1',
    textDecorationLine: 'underline',
    includeFontPadding: false,
  },
  itemView: {
    height: 100,
    backgroundColor: '#FFF',
    paddingTop: 12,
    paddingBottom: 17,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  itemDateText: {
    position: 'absolute',
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Thin',
    fontSize: 12,
    right: 20,
    top: 12,
    includeFontPadding: false,
  },
  itemTitleText: {
    color: '#3C3C3C',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    marginBottom: 8,
    includeFontPadding: false,
  },
  itemBodyText: {
    color: '#828282',
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    width: 301,
    includeFontPadding: false,
  },
});
export default AuthorWrite;
