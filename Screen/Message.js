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
  Modal,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useNavigation} from '@react-navigation/native';
import AuthorProfileImage from '../assets/images/AuthorProfileImage.png';
import ReportMenuExit from '../assets/images/ReportMenuExit.png';
import ReportMenuPage from '../assets/images/ReportMenuPage.png';
import {SafeAreaView} from 'react-native';
import BackMail2 from '../assets/images/BackMail2.png';
import Report from '../assets/images/Report.png';
import ChatExitModal from './ChatExitModal';
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
  const [modalVisible, setModalVisible] = useState(false);

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
  const onPressReport = data => {
    navigation.navigate('ReaderStacks', {
      screen: 'MessageReport',
    });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderMessageItem = a => {
    console.log(a);
  };

  const onPressModalConfirm = () => {
    setModalVisible(!modalVisible);
  };

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
        }}>
        {data.item.date}&nbsp;&nbsp;
        {data.item.daytime}&nbsp;
        {data.item.localtime}
      </Text>
    </View>
  );

  const RenderInfoItem = ({item}) => {
    return (
      <Menu style={{...styles.menuView, marginTop: -50}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <ChatExitModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onPressModalConfirm={onPressModalConfirm}
          />
        </Modal>
        <MenuTrigger>
          <Image style={{width: 3, height: 17}} source={Report} />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#E3E3E3',
              borderLength: 226,
            }}
            onSelect={onPressReport}>
            <Text style={styles.menuText}>
              <Text>신고하기</Text>
            </Text>
            <Image
              style={{width: 24, height: 24, position: 'absolute', left: 178.5}}
              source={ReportMenuPage}
            />
          </MenuOption>
          <MenuOption onSelect={onPressModalConfirm}>
            <Text style={styles.menuText}>
              <Text>채팅방 나가기</Text>
            </Text>
            <Image
              style={{width: 24, height: 24, position: 'absolute', left: 178.5}}
              source={ReportMenuExit}
            />
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

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
        <View style={{left: 364}}>
          <TouchableWithoutFeedback>
            <RenderInfoItem />
          </TouchableWithoutFeedback>
        </View>
        <View style={{left: 22, marginBottom: 45}}>
          <Image
            style={{
              position: 'absolute',
              width: 42,
              height: 42,
            }}
            source={AuthorProfileImage}
          />
          <Text
            style={{
              fontFamily: 'NotoSansKR-Bold',
              color: '#3C3C3C',
              fontSize: 14,
              left: 56,
              top: 11,
            }}>
            {params.item.sender}
          </Text>
        </View>
        {renderMessageItem(message.sender)}
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
  header: {
    height: 261 - STATUSBAR_HEIGHT,
    backgroundColor: '#4562F1',
  },
  headerView: {
    width: '100%',
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
    height: 80,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#BEBEBE',
    paddingBottom: 8,
  },
  menuText: {
    left: 13,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 15,
    color: '#5F5F5F',
    includeFontPadding: false,
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    width: 226,
  },
  optionWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    justifyContent: 'center',
  },
};

export default Message;
