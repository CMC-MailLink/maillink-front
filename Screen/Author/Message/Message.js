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
import AuthorProfileImage from '../../../assets/images/AuthorProfileImage.png';
import ReportMenuExit from '../../../assets/images/ReportMenuExit.png';
import ReportMenuPage from '../../../assets/images/ReportMenuPage.png';
import {SafeAreaView} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import ChatExitModal from './ChatExitModal';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {MessageAPI} from '../../../API/MessageAPI';

import BackMail2 from '../../../assets/images/BackMail2.png';
import Report from '../../../assets/images/Report.png';
import PenceilWriting from '../../../assets/images/PenceilWriting.png';
// import MessageData from '../assets/data/Message';

const STATUSBAR_HEIGHT = 48;

const Message = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {isLoading: messageLoading, data: messagePartnerData} = useQuery(
    ['MessagePartner', params.partnerId],
    MessageAPI.getMessagePartner,
  );

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressReport = data => {
    navigation.navigate('AuthorStacks', {
      screen: 'MessageReport',
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['MessagePartner']);
    setRefreshing(false);
  };

  const onPressModalConfirm = () => {
    setModalVisible(!modalVisible);
  };

  const renderItem = data => (
    <View
      style={{
        backgroundColor: '#FFF',
        paddingTop: 12,
        paddingHorizontal: 21,
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: '#3C3C3C',
            fontFamily: 'NotoSansKR-Bold',
            fontSize: 14,
            includeFontPadding: false,
          }}>
          {data.item.type === 'SEND' ? '보낸쪽지' : '받은쪽지'}
        </Text>
        <Text
          style={{
            color: '#BEBEBE',
            fontFamily: 'NotoSansKR-Light',
            fontSize: 12,
            includeFontPadding: false,
          }}>
          {data.item.time ? data.item.time.slice(0, 10) : ''}
        </Text>
      </View>
      <Text
        style={{
          paddingTop: 6,
          color: '#828282',
          fontFamily: 'NotoSansKR-Regular',
          fontSize: 14,
          includeFontPadding: false,
        }}>
        {data.item.text}
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
            {/* {params.item.sender} */}
          </Text>
        </View>
      </View>
      {/* body */}
      <View>
        {messagePartnerData ? (
          <FlatList
            style={styles.bodyContainer}
            data={messagePartnerData}
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
            name: 'bt_write',
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
      />
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
