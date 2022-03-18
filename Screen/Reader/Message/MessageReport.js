/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

import ReportCheck from '../../../assets/images/ReportCheck.png';
import ReportCheckActivate from '../../../assets/images/ReportCheckActivate.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
const STATUSBAR_HEIGHT = 48;

const MessageReport = () => {
  const [alarmData, setAlarmData] = useState(true);
  const [alarmSelect, setAlarmSelect] = useState(true);
  const navigation = useNavigation();
  const [moneyReport, setMoneyReport] = useState(false);
  const [dateReport, setDateReport] = useState(false);
  const [languageReport, setLanguageReport] = useState(false);
  const [otherReport, setOtherReport] = useState(false);
  const [otherReportContent, setOtherReportContent] = useState('');
  const [reportTypesData, setReportTypesData] = useState([]);
  const [confirmSuccess, setConfirmSuccess] = useState(false);

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressMessageItem = data => {
    navigation.navigate('ReaderStacks', {
      screen: 'Message',
      params: {...data},
    });
  };
  const onPressMoneyReport = () => {
    setMoneyReport(!moneyReport);
  };
  const onPressDateReport = () => {
    setDateReport(!dateReport);
  };
  const onPressLanguageReport = () => {
    setLanguageReport(!languageReport);
  };
  const onPressOtherReport = () => {
    setOtherReport(!otherReport);
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.headerText}>신고하기</Text>
        </View>
      </View>

      {/* mainHeader */}
      <View style={styles.bodyHeader}>
        <View style={{paddingLeft: 21, paddingBottom: 17 + 25 - 27}}>
          <Text style={styles.bodyHeaderText}>
            해당 사용자를 신고하시겠습니까?
          </Text>
          <Text style={styles.bodyHeaderText}>
            사용자를 신고하는 이유를 선택해주세요. (중복가능)
          </Text>
        </View>
      </View>

      {/* body */}

      <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
        <TouchableWithoutFeedback onPress={onPressMoneyReport}>
          <View style={{...styles.itemView, marginTop: 6}}>
            <Text style={styles.itemText}>금전 요구</Text>
            {!moneyReport ? (
              <Image style={styles.itemCheckImg} source={ReportCheck} />
            ) : (
              <Image style={styles.itemCheckImg} source={ReportCheckActivate} />
            )}
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={onPressDateReport}>
          <View style={styles.itemView}>
            <Text style={styles.itemText}>연애 목적의 대화 시도</Text>
            {!dateReport ? (
              <Image style={styles.itemCheckImg} source={ReportCheck} />
            ) : (
              <Image style={styles.itemCheckImg} source={ReportCheckActivate} />
            )}
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={onPressLanguageReport}>
          <View style={styles.itemView}>
            <Text style={styles.itemText}>부적절한 어휘 사용</Text>
            {!languageReport ? (
              <Image style={styles.itemCheckImg} source={ReportCheck} />
            ) : (
              <Image style={styles.itemCheckImg} source={ReportCheckActivate} />
            )}
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={onPressOtherReport}>
          <View style={styles.itemView}>
            <Text style={styles.itemText}>기타 사유</Text>
            {!otherReport ? (
              <Image style={styles.itemCheckImg} source={ReportCheck} />
            ) : (
              <Image style={styles.itemCheckImg} source={ReportCheckActivate} />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* footer */}
      <View style={{alignItems: 'center', paddingBottom: 10}}>
        <Text style={styles.bodyHeaderText}>
          사용자를 신고해도 메일 발송은 유지됩니다.
        </Text>
        <Text style={styles.bodyHeaderText}>
          해당 사용자와의 쪽지는 비활성화됩니다.
        </Text>
      </View>
      <View
        style={{
          position: 'static',
          width: '100%',
          paddingHorizontal: 20,
          paddingTop: 5,
          marginBottom: 40,
        }}>
        <TouchableOpacity
          disabled={confirmSuccess ? false : true}
          onPress={confirmSuccess ? null : null}
          style={confirmSuccess ? styles.buttonAble : styles.buttonDisable}>
          <View>
            <Text
              style={
                confirmSuccess
                  ? styles.buttonAbleText
                  : styles.buttonDisableText
              }>
              신고하기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  bodyHeaderBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#4562F1',
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingBottom: 103 - 23.78,
  },
  bodyHeader: {
    height: 65,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  itemView: {
    backgroundColor: 'white',
    height: 56,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  itemNewView: {
    position: 'absolute',
    top: 0,
    left: -16,
    width: 10,
    height: 10,
    backgroundColor: '#FF9B9B',
    borderRadius: 90,
  },
  itemText: {
    paddingLeft: 10,
    paddingTop: 17,
  },
  itemCheckImg: {
    position: 'absolute',
    width: 17.88,
    height: 14.12,
    marginTop: 22,
    marginLeft: 370 - 21.91,
  },
  itemAuthorText: {
    fontFamily: 'NotoSansKR-Regular',
    color: '#3C3C3C',
    fontSize: 14,
    includeFontPadding: false,
  },
  itemDateText: {
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Light',
    fontSize: 12,
    includeFontPadding: false,
  },
  itemBodyText: {
    color: '#828282',
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    marginTop: 3,
    includeFontPadding: false,
  },
  buttonAble: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAbleText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  buttonDisable: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#BEBEBE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisableText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});

export default MessageReport;
