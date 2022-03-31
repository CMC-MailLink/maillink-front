import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import AppContext from '../../AppContext';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';

import BackMail from '../../assets/images/BackMail.png';
import {AuthorAPI} from '../../API/AuthorAPI';
import {ReaderAPI} from '../../API/ReaderAPI';

const SettingAlarm = () => {
  const navigation = useNavigation();
  const myContext = useContext(AppContext);
  const [isEnabledMail, setIsEnabledMail] = useState(true);
  const [isEnabledNewSubscribe, setIsEnabledNewSubscribe] = useState(true);
  const [isEnabledMessage, setIsEnabledMessage] = useState(true);
  const {isLoading: alarmInfoLoading, data: alarmInfoData} = useQuery(
    ['AlarmInfo'],
    myContext.isReaader === 'READER' ? ReaderAPI.getAlarm : AuthorAPI.getAlarm,
  );

  useEffect(() => {
    if (alarmInfoData) {
      if (myContext.isReaader === 'READER') {
        setIsEnabledMessage(alarmInfoData.mailAlarm);
        setIsEnabledMessage(alarmInfoData.messageAlarm);
      } else {
        setIsEnabledMessage(alarmInfoData.messageAlarm);
        setIsEnabledNewSubscribe(alarmInfoData.subscribeAlarm);
      }
    }
  }, [alarmInfoData, myContext]);

  const toggleSwitchMail = () =>
    setIsEnabledMail(previousState => !previousState);
  const toggleSwitchNewSubscribe = () =>
    setIsEnabledNewSubscribe(previousState => !previousState);
  const toggleSwitchMessage = () =>
    setIsEnabledMessage(previousState => !previousState);

  const onPressBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (myContext.isReader === 'READER') {
      ///reader
      ReaderAPI.setAlarm({
        mailAlarm: isEnabledMail,
        messageAlarm: isEnabledMessage,
      });
    } else {
      ///writer
      AuthorAPI.setAlarm({
        subscribeAlarm: isEnabledNewSubscribe,
        messageAlarm: isEnabledMessage,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabledMail, isEnabledNewSubscribe, isEnabledMessage, myContext]);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <StatusBar barStyle="light-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24, width: 20, height: 20}}>
            <FastImage
              style={{width: 9.5, height: 19}}
              source={BackMail}></FastImage>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>알림 설정</Text>
      </View>
      {myContext.isReader === 'READER' ? (
        <View style={styles.menuView}>
          <Text style={styles.menuText}>새 글 알림</Text>
          <Switch
            style={{width: 52, height: 28}}
            trackColor={{false: '#EBEBEB', true: '#4562F1'}}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#EBEBEB"
            onValueChange={toggleSwitchMail}
            value={isEnabledMail}
          />
        </View>
      ) : null}
      {myContext.isReader !== 'READER' ? (
        <View style={styles.menuView}>
          <Text style={styles.menuText}>새 구독 알림</Text>
          <Switch
            style={{width: 52, height: 28}}
            trackColor={{false: '#EBEBEB', true: '#4562F1'}}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#EBEBEB"
            onValueChange={toggleSwitchNewSubscribe}
            value={isEnabledNewSubscribe}
          />
        </View>
      ) : null}
      <View style={styles.menuView}>
        <Text style={styles.menuText}>쪽지 알림</Text>
        <Switch
          style={{width: 52, height: 28}}
          trackColor={{false: '#EBEBEB', true: '#4562F1'}}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#EBEBEB"
          onValueChange={toggleSwitchMessage}
          value={isEnabledMessage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    backgroundColor: '#4562F1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#fff',
    includeFontPadding: false,
  },
  menuView: {
    height: 56,
    width: '100%',
    paddingHorizontal: 21,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    justifyContent: 'space-between',
  },
  menuText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
});

export default SettingAlarm;
