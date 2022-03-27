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
  SafeAreaView,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useNavigation} from '@react-navigation/native';
import ChatExitModal from './ChatExitModal';
import {MessageAPI} from '../../../API/MessageAPI';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import {FloatingAction} from 'react-native-floating-action';

import PenceilWriting from '../../../assets/images/PenceilWriting.png';
import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import ReportMenuExit from '../../../assets/images/ReportMenuExit.png';
import ReportMenuPage from '../../../assets/images/ReportMenuPage.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
import Report from '../../../assets/images/Report.png';

const STATUSBAR_HEIGHT = 48;

const Message = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {isLoading: messageLoading, data: messagePartnerData} = useQuery(
    ['MessagePartner', params.partnerId],
    MessageAPI.getMessagePartner,
  );

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressReport = data => {
    navigation.navigate('ReaderStacks', {
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

  const onPressWritingPage = () => {
    navigation.navigate('ReaderStacks', {
      screen: 'MessageWrite',
      params: {writerId: params.partnerId},
    });
  };

  const renderItem = data => {
    console.log(data);
    return (
      <View
        style={{
          backgroundColor: '#FFF',
          paddingVertical: 12,
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
  };

  const RenderInfoItem = ({item}) => {
    return (
      <Menu style={{justifyContent: 'center'}}>
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
          <View
            style={{
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image style={{width: 3, height: 17}} source={Report} />
          </View>
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
          {/* <MenuOption onSelect={onPressModalConfirm}>
            <Text style={styles.menuText}>
              <Text>채팅방 나가기</Text>
            </Text>
            <Image
              style={{width: 24, height: 24, position: 'absolute', left: 178.5}}
              source={ReportMenuExit}
            />
          </MenuOption> */}
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
          <View style={{position: 'absolute', left: 24, width: 20, height: 20}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.bodyHeader}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 42,
              height: 42,
              borderRadius: 90,
              marginRight: 14,
            }}
            source={
              !messagePartnerData || messagePartnerData.partnerImgUrl === ''
                ? DefaultProfile
                : {uri: messagePartnerData.partnerImgUrl}
            }
          />
          <Text
            style={{
              fontFamily: 'NotoSansKR-Bold',
              color: '#3C3C3C',
              fontSize: 16,
              includeFontPadding: false,
            }}>
            {messagePartnerData ? messagePartnerData.partnerNickname : ''}
          </Text>
        </View>
        <TouchableWithoutFeedback>
          <RenderInfoItem />
        </TouchableWithoutFeedback>
      </View>
      {/* body */}
      {messagePartnerData ? (
        <FlatList
          style={styles.bodyContainer}
          data={messagePartnerData.message}
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
        distanceToEdge={{vertical: 56, horizontal: 17}}
        buttonSize={50}
        shadow={{
          shadowOpacity: 0.12,
          shadowColor: '#000000',
          shadowRadius: 23,
        }}
        overrideWithAction={true}
        animated={false}
        onPressItem={() => {
          onPressWritingPage();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingBottom: 103 - 23.78,
  },
  bodyHeader: {
    paddingBottom: 17,
    paddingHorizontal: 22,
    backgroundColor: '#fff',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
