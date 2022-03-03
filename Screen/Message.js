/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AuthorProfileImage from '../assets/images/AuthorProfileImage.png';
import {SafeAreaView} from 'react-native';
import BackMail2 from '../assets/images/BackMail2.png';
import Report from '../assets/images/Report.png';
// import MessageData from '../assets/data/Message';

const STATUSBAR_HEIGHT = 48;

const Message = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const [sender, setSender] = useState('이작가');
  const [message, setMessage] = useState([
    {
      key: '5',
      type: '받은 쪽지',
      sender: '이작가',
      date: '21. 02. 12',
      context: '아하 감사합니다! 좋은 하루 되세요!',
      localtime: '3:00',
      daytime: '오후',
    },
    {
      key: '4',
      type: '보낸 쪽지',
      sender: '이작가',
      date: '21. 02. 12',
      context:
        '저는 이렇게 해석했는데, 그렇게 해석될 수 있겠네요! 독자님의 상상력 좋습니다!',
      localtime: '3:00',
      daytime: '오후',
    },
    {
      key: '3',
      type: '받은 쪽지',
      sender: '나동현',
      date: '21. 02. 12',
      context:
        '작가님의 글 중에서, ‘피가 광야에서 이는 위하여 없으면,부분을 저는 조금 비관적인 문장으로 해석하였는데, 작가님의 생각은 어떠셨는지 궁금합니다!',
      localtime: '3:00',
      daytime: '오후',
    },
    {
      key: '2',
      type: '보낸 쪽지',
      sender: '이작가',
      date: '21. 02. 12',
      context: '안녕하세요!질문이 뭔가요 독자님?',
      localtime: '3:00',
      daytime: '오후',
    },
    {
      key: '1',
      type: '받은 쪽지',
      sender: '이작가',
      date: '21. 02. 12',
      context:
        '안녕하세요! 작가님 글 너무 잘보았습니다.혹시 질문 하나 드려도 될까요?',
      localtime: '3:00',
      daytime: '오후',
    },
    {
      key: '0',
      type: '보낸 쪽지',
      sender: '이작가',
      date: '21. 02. 12',
      context: '저도 감사합니다~',
      localtime: '3:00',
      daytime: '오후',
    },
  ]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [send, setSendSelect] = useState(false);
  const [messageData, setMessageData] = useState(true);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onPressSend = () => {
    setSendSelect(true);
  };
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressMessageItem = data => {
    navigation.navigate('Stacks', {
      screen: 'Message',
      params: {...data},
    });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderMessageItem = a => {
    console.log(a);
  };
  useEffect(() => {}, [message]);

  const renderItem = data => (
    <View
      style={{
        backgroundColor: '#FFF',
        paddingTop: 12,
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          paddingRight: 70,
        }}>
        <Text
          style={{
            color: '#3C3C3C',
            fontFamily: 'NotoSansKR-Bold',
            fontSize: 14,
            left: 22,
            includeFontPadding: false,
          }}>
          {data.item.type}
        </Text>
        <Text
          style={{
            paddingTop: 22,
            color: '#828282',
            fontFamily: 'NotoSansKR-Regular',
            fontSize: 14,
            left: 22,
            right: 10,
            bottom: 18,
            includeFontPadding: false,
          }}>
          {data.item.context}
        </Text>
      </View>
      <Text
        style={{
          paddingTop: 15,
          position: 'absolute',
          color: '#BEBEBE',
          fontFamily: 'NotoSansKR-Light',
          fontSize: 12,
          right: 20,
          includeFontPadding: false,
        }}>
        {data.item.date}&nbsp;&nbsp;
        {data.item.daytime}&nbsp;
        {data.item.localtime}
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0}} />
      {/* upperHeader */}
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* mainHeader */}
      <View style={styles.bodyHeader}>
        <Image
          style={{
            width: 42,
            height: 42,
            marginRight: 14,
          }}
          source={AuthorProfileImage}
        />
        <Text
          style={{
            fontFamily: 'NotoSansKR-Bold',
            color: '#3C3C3C',
            fontSize: 14,
            includeFontPadding: false,
          }}>
          {params.item.sender}
        </Text>
        <Image
          style={{width: 3, height: 17, position: 'absolute', right: 30}}
          source={Report}
        />
        {/* {renderMessageItem(message.sender)} */}
      </View>
      {/* body */}
      {messageData ? (
        <FlatList
          style={styles.bodyContainer}
          data={message}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              style={styles.refresh}
              tintColor="#4562F1"
            />
          }
          //keyExtractor={item => item.id}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            flex: 1,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 25,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  bodyHeaderBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#4562F1',
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingBottom: 103 - 23.78,
  },
  bodyHeader: {
    height: 57,
    paddingLeft: 22,
    backgroundColor: '#fff',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#BEBEBE',
    paddingBottom: 8,
    includeFontPadding: false,
  },
});

export default Message;
