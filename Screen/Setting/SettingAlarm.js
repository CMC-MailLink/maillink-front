import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BackMail from '../../assets/images/BackMail.png';

const SettingAlarm = () => {
  const navigation = useNavigation();
  const [isReader, setIsReader] = useState(true);
  const [isEnabledMail, setIsEnabledMail] = useState(false);
  const [isEnabledSubscribeDone, setIsEnabledSubscribeDone] = useState(false);
  const [isEnabledNewSubscribe, setIsEnabledNewSubscribe] = useState(false);
  const [isEnabledMessage, setIsEnabledMessage] = useState(false);

  const toggleSwitchMail = () =>
    setIsEnabledMail(previousState => !previousState);
  const toggleSwitchSubscribeDone = () =>
    setIsEnabledSubscribeDone(previousState => !previousState);
  const toggleSwitchNewSubscribe = () =>
    setIsEnabledNewSubscribe(previousState => !previousState);
  const toggleSwitchMessage = () =>
    setIsEnabledMessage(previousState => !previousState);

  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      <StatusBar barStyle="light-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail}></Image>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>알림 설정</Text>
      </View>
      {isReader ? (
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
      {isReader ? (
        <View style={styles.menuView}>
          <Text style={styles.menuText}>구독 완료 알림</Text>
          <Switch
            style={{width: 52, height: 28}}
            trackColor={{false: '#EBEBEB', true: '#4562F1'}}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#EBEBEB"
            onValueChange={toggleSwitchSubscribeDone}
            value={isEnabledSubscribeDone}
          />
        </View>
      ) : null}
      {!isReader ? (
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
