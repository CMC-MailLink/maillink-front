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
import AuthorMail from '../assets/images/AuthorMail.png';
import {SafeAreaView} from 'react-native';
import BackMail2 from '../assets/images/BackMail2.png';
const STATUSBAR_HEIGHT = 48;

const Message = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState([
    {
      key: '0',
      type: '받은쪽지',
      date: '21. 02. 12',
      context: '저도 감사합니다.',
      localtime: '3:00',
      daytime: '오후',
    },
  ]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [send, setSendSelect] = useState(false);

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

  const renderItem = data => (
    <View
      style={{
        height: 71,
        backgroundColor: '#FFF',
        paddingTop: 14,
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
      }}>
      <Image
        style={{
          position: 'absolute',
          width: 42,
          height: 42,
          left: 36,
          top: 14,
        }}
        source={AuthorMail}
      />
      <Text
        style={{
          color: '#3C3C3C',
          fontSize: 14,
          left: 93,
        }}>
        <Text
          style={{
            fontFamily: 'NotoSansKR-Bold',
          }}>
          {data.item.author ? data.item.author : data.item.sender}&nbsp;
        </Text>
        <Text
          style={{
            fontFamily: 'NotoSansKR-Regular',
          }}>
          {data.item.newpost ? data.item.newpost : data.item.subscribe}
        </Text>
      </Text>
      <Text
        style={{
          paddingTop: 3,
          color: '#828282',
          fontFamily: 'NotoSansKR-Regular',
          fontSize: 14,
          left: 93,
        }}>
        {data.item.messageContext}
        {data.item.newpost ? data.item.title : data.item.context}
      </Text>
      <Text
        style={{
          position: 'absolute',
          color: '#BEBEBE',
          fontFamily: 'NotoSansKR-Light',
          fontSize: 12,
          right: 20,
        }}>
        {data.item.date}
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
        <View
          style={{
            width: 241,
            flexDirection: 'row',
            justifyContent: 'space-between',
            left: 76,
          }}>
          <View style={styles.bodyHeaderBorder}>
            <TouchableOpacity>
              <Text style={styles.bodyHeaderText} />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyHeaderBorder}>
            <Text style={styles.bodyHeaderText} />
          </View>
        </View>
      </View>
      {/* body */}
      <FlatList
        style={styles.bodyContainer}
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
    height: 35,
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
});

export default Message;
