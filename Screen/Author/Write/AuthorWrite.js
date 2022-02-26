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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FloatingAction} from 'react-native-floating-action';

import PenceilWriting from '../../../assets/images/PenceilWriting.png';

const AuthorWrite = () => {
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

  const onPressRecent = () => {
    setRecentSelect(true);
  };
  const onPressOld = () => {
    setRecentSelect(false);
  };
  const navigation = useNavigation();
  const onPressWritingPage = () => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorEditor',
    });
  };

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
  const onPressStorageItem = () => {
    //pressStorage
  };

  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={e => onPressStorageItem(item)}>
        <View
          style={{
            height: 100,
            backgroundColor: '#FFF',
            paddingTop: 12,
            borderBottomColor: '#EBEBEB',
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              position: 'absolute',
              color: '#BEBEBE',
              fontFamily: 'NotoSansKR-Thin',
              fontSize: 12,
              right: 20,
              top: 16,
            }}>
            {item.date}
          </Text>
          <Text
            style={{
              color: '#3C3C3C',
              fontFamily: 'NotoSansKR-Bold',
              fontSize: 16,
              left: 20,
              marginBottom: 8,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: '#828282',
              fontFamily: 'NotoSansKR-Thin',
              fontSize: 14,
              left: 20,
              width: 301,
            }}>
            {item.body}
          </Text>
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
        <View
          style={{
            justifyContent: 'center',
            left: 20,
          }}>
          <Text
            style={{
              fontFamily: 'NotoSansKR-Medium',
              fontSize: 14,
              color: '#3C3C3C',
            }}>
            임시저장함
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            width: 92,
            flexDirection: 'row',
            justifyContent: 'space-between',
            right: 19,
          }}>
          <TouchableOpacity onPress={onPressRecent} activeOpacity={1}>
            <Text
              style={{
                ...styles.bodyHeaderTextOrder,
                color: recentSelect ? '#000000' : '#BEBEBE',
              }}>
              최신순&nbsp;
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
              &nbsp;오래된순
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          data={storage}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
    marginBottom: 14,
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
  },
  bodyHeader: {
    width: '100%',
    height: 32.6,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    // paddingBottom: 103 - 23.78,
    paddingBottom: 84.5,
  },
});
export default AuthorWrite;
