/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ReportCheck from '../../../assets/images/ReportCheck.png';
import ReportCheckActivate from '../../../assets/images/ReportCheckActivate.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
import ReportSuccessModal from './ReportSuccessModal';
import FastImage from 'react-native-fast-image';
const MessageReport = () => {
  const navigation = useNavigation();
  const [moneyReport, setMoneyReport] = useState(false);
  const [dateReport, setDateReport] = useState(false);
  const [rightReport, setRightReport] = useState(false);
  const [sameReport, setSameReport] = useState(false);
  const [otherReport, setOtherReport] = useState(false);
  const [otherReportContent, setOtherReportContent] = useState('');
  const [reportTypesData, setReportTypesData] = useState([]);
  const [confirmSuccess, setConfirmSuccess] = useState(true);
  const [enterCount, setenterCount] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [subscribeCancel, setSubscribeCancel] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressMoneyReport = () => {
    setMoneyReport(!moneyReport);
  };
  const onPressDateReport = () => {
    setDateReport(!dateReport);
  };
  const onPressrightReport = () => {
    setRightReport(!rightReport);
  };
  const onPressSameReport = () => {
    setSameReport(!sameReport);
  };
  const onPressOtherReport = () => {
    setOtherReport(!otherReport);
  };
  const onPressSubscribeCancel = () => {
    setSubscribeCancel(!subscribeCancel);
  };
  const onPressModalConfirm = () => {
    setModalVisible(!modalVisible);
  };
  const onChangeText = text => setOtherReportContent(text);
  const keyPress = e => {
    if (e.key === 'Enter') {
      setenterCount(enterCount + 1);
    }
  };
  useEffect(() => {
    setTextCount(otherReportContent.length);
    if (
      moneyReport ||
      dateReport ||
      rightReport ||
      sameReport ||
      otherReport ||
      subscribeCancel
    ) {
      setConfirmSuccess(true);
    } else {
      setConfirmSuccess(false);
    }
  }, [
    moneyReport,
    dateReport,
    rightReport,
    otherReport,
    sameReport,
    subscribeCancel,
    otherReportContent,
    enterCount,
  ]);

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <StatusBar barStyle="dark-content" />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ReportSuccessModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onPressModalConfirm={onPressModalConfirm}
        />
      </Modal>
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24, width: 20, height: 20}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback>

        <Text style={styles.headerText}>신고하기</Text>
      </View>
      {/* mainHeader */}
      <View style={styles.bodyHeader}>
        <Text style={styles.bodyHeaderText}>
          해당 사용자를 신고하시겠습니까? {'\n'}사용자를 신고하는 사유를
          선택해주세요. (중복가능)
        </Text>
      </View>
      <KeyboardAwareScrollView bounces={false} keyboardOpeningTime={0}>
        {/* body */}
        <TouchableWithoutFeedback onPress={onPressMoneyReport}>
          <View style={styles.itemView}>
            <Text style={styles.itemText}>영리 목적/ 홍보성 글</Text>
            {!moneyReport ? (
              <Image style={styles.itemCheckImg} source={ReportCheck} />
            ) : (
              <Image style={styles.itemCheckImg} source={ReportCheckActivate} />
            )}
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={onPressDateReport}>
          <View style={styles.itemView}>
            <Text style={styles.itemText}>음란성/선정성</Text>
            {!dateReport ? (
              <Image style={styles.itemCheckImg} source={ReportCheck} />
            ) : (
              <Image style={styles.itemCheckImg} source={ReportCheckActivate} />
            )}
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={onPressrightReport}>
          <View style={styles.itemView}>
            <Text style={styles.itemText}>타인의 권리 침해</Text>
            {!rightReport ? (
              <Image style={styles.itemCheckImg} source={ReportCheck} />
            ) : (
              <Image style={styles.itemCheckImg} source={ReportCheckActivate} />
            )}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressSameReport}>
          <View style={styles.itemView}>
            <Text style={styles.itemText}>같은 내용 반복(도배)</Text>
            {!sameReport ? (
              <Image style={styles.itemCheckImg} source={ReportCheck} />
            ) : (
              <Image style={styles.itemCheckImg} source={ReportCheckActivate} />
            )}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressOtherReport}>
          <View style={{...styles.itemView}}>
            <Text style={styles.itemText}>기타 사유</Text>
            <Image
              style={styles.itemCheckImg}
              source={!otherReport ? ReportCheck : ReportCheckActivate}
            />
          </View>
        </TouchableWithoutFeedback>
        {!otherReport ? null : (
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 18,
              paddingHorizontal: 21,
            }}>
            <View
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: '#F8F8F8',
              }}>
              <TextInput
                style={styles.textInput}
                value={otherReportContent}
                placeholder="(300자 이하)"
                placeholderTextColor="#BEBEBE"
                onChangeText={onChangeText}
                maxLength={300}
                maxHeight={300}
                multiline={true}
                autoCorrect={false}
                autoCapitalize={false}
              />
            </View>
          </View>
        )}
        <TouchableWithoutFeedback onPress={onPressSubscribeCancel}>
          <View
            style={{
              marginTop: 22,
              marginBottom: 24,
              borderTopColor: '#EBEBEB',
              borderTopWidth: 1,
              ...styles.itemView,
            }}>
            <Text style={styles.itemText}>해당 작가의 구독을 취소합니다.</Text>
            {!subscribeCancel ? (
              <Image style={styles.itemCheckImg} source={ReportCheck} />
            ) : (
              <Image style={styles.itemCheckImg} source={ReportCheckActivate} />
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      {/* footer */}
      <View
        style={{
          position: 'static',
          width: '100%',
          paddingHorizontal: 20,
          marginBottom: 40,
          paddingTop: 5,
        }}>
        <TouchableOpacity
          disabled={confirmSuccess ? false : true}
          onPress={confirmSuccess ? () => setModalVisible(true) : null}
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
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  headerText: {
    width: '100%',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    textAlign: 'center',
    includeFontPadding: false,
  },
  bodyHeader: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 21,
    paddingBottom: 16,
    borderBottomWidth: 6,
    borderBottomColor: '#F8F8F8',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  itemView: {
    backgroundColor: 'white',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 21,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemOtherView: {
    backgroundColor: 'white',
    height: 269,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  textInput: {
    width: '100%',
    height: 189,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  itemText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  itemCheckImg: {
    width: 17.88,
    height: 14.12,
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
