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

import ReportCheck from '../../../assets/images/ReportCheck.png';
import ReportCheckActivate from '../../../assets/images/ReportCheckActivate.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
import ReportSuccessModal from './ReportSuccessModal';

const MessageReport = () => {
  const navigation = useNavigation();
  const [moneyReport, setMoneyReport] = useState(false);
  const [dateReport, setDateReport] = useState(false);
  const [languageReport, setLanguageReport] = useState(false);
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
  const onPressSubscribeCancel = () => {
    setSubscribeCancel(!subscribeCancel);
  };
  const onPressModalConfirm = () => {
    setModalVisible(!modalVisible);
  };
  const onChangeText = text => setOtherReportContent(text);

  useEffect(() => {
    if (otherReportContent !== '') {
      setConfirmSuccess(true);
    } else {
      setConfirmSuccess(false);
    }
    setTextCount(otherReportContent.length);
    if (this.keyCode === 13) {
      setenterCount(enterCount + 1);
    }
  }, [otherReportContent, enterCount]);

  return (
    <View style={{flex: 1}}>
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
            해당 작가를 신고하는 이유를 선택해주세요. (중복가능)
          </Text>
          <Text style={styles.bodyHeaderText}>
            해당 사용자와의 쪽지는 비활성화됩니다.
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
        {!otherReport ? (
          <TouchableWithoutFeedback onPress={onPressOtherReport}>
            <View style={styles.itemView}>
              <Text style={styles.itemText}>기타 사유</Text>
              <Image style={styles.itemCheckImg} source={ReportCheck} />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={onPressOtherReport}>
            <View style={styles.itemOtherView}>
              <Text style={styles.itemText}>기타 사유</Text>

              <Image style={styles.itemCheckImg} source={ReportCheckActivate} />

              <View style={{alignItems: 'center', paddingTop: 18}}>
                <TextInput
                  style={styles.textInput}
                  value={otherReportContent}
                  placeholder="(300자 이하)"
                  placeholderTextColor="#BEBEBE"
                  returnKeyType="search"
                  onChangeText={onChangeText}
                  maxLength={300}
                  maxHeight={300}
                  multiline={true}
                  autoCorrect={false}
                  autoCapitalize={false}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}

        <TouchableWithoutFeedback onPress={onPressSubscribeCancel}>
          <View style={{...styles.itemView, marginTop: 22}}>
            <Text style={styles.itemText}>해당 작가의 구독을 취소합니다.</Text>
            {!subscribeCancel ? (
              <Image style={styles.itemCheckImg} source={ReportCheck} />
            ) : (
              <Image style={styles.itemCheckImg} source={ReportCheckActivate} />
            )}
          </View>
        </TouchableWithoutFeedback>

        {/* footer */}
        <View style={!otherReport ? {paddingTop: 293} : {paddingTop: 24}}>
          <View
            style={{
              position: 'static',
              width: '100%',
              paddingHorizontal: 20,
              paddingTop: 5,
              marginBottom: 40,
            }}>
            <TouchableOpacity
              // disabled={confirmSuccess ? false : true}
              // onPress={confirmSuccess ? () => setModalVisible(true) : null}
              onPress={() => setModalVisible(true)}
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
  itemOtherView: {
    backgroundColor: 'white',
    height: 325,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  textInput: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
    backgroundColor: '#F8F8F8',
    height: 245,
    width: 350,
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
