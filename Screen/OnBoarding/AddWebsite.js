import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SignUpStep1 from '../../assets/images/SignUpStep1.png';
import BackMail2 from '../../assets/images/BackMail2.png';
import FacebookNone from '../../assets/images/FacebookNone.png';
import TwitterNone from '../../assets/images/TwitterNone.png';
import InstagramNone from '../../assets/images/InstagramNone.png';
import URLNone from '../../assets/images/URLNone.png';
import {useNavigation} from '@react-navigation/native';
import AuthorSuccessModal from './AuthorSuccessModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SignUpAPI} from '../../API/SignUpAPI';
import NoticeModal from './NoticeModal';
import AppContext from '../../AppContext';

const AddWebsite = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const myContext = useContext(AppContext);
  const [editFacebook, setEditFacebook] = useState('');
  const [editTwitter, setEditTwitter] = useState('');
  const [editInstagram, setEditInstagram] = useState('');
  const [editURL, setEditURL] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalConfirm2, setModalConfirm2] = useState(false);
  const facebookRef = useRef();
  const twitterRef = useRef();
  const instagramRef = useRef();
  const urlRef = useRef();

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressConfirm = async () => {
    var result = await SignUpAPI.setAuthorInfo({
      ...params,
      facebook: editFacebook,
      twitter: editTwitter,
      instagram: editInstagram,
      etc: editURL,
    });

    console.log(result);
    if (result) {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    if (modalConfirm2) {
      myContext.setIsReader('WRITER');
    }
  }, [modalConfirm2, myContext]);

  return (
    <View
      style={{
        ...Platform.select({
          ios: {flex: 1},
          android: {flex: 0},
        }),
      }}>
      <SafeAreaView style={{flex: 0}} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <AuthorSuccessModal
          setModalVisible={setModalVisible}
          setModalVisible2={setModalVisible2}
        />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}>
        <NoticeModal
          setModalVisible2={setModalVisible2}
          setModalConfirm2={setModalConfirm2}
        />
      </Modal>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}
        keyboardOpeningTime={0}
        enableAutomaticScroll={true}
        scrollEnabled={true}
        resetScrollToCoords={{x: 0, y: 0}}>
        {/* upperHeader */}
        <View style={styles.headerView}>
          <TouchableWithoutFeedback onPress={onPressBack}>
            <View style={{left: 24}}>
              <Image style={{width: 9.5, height: 19}} source={BackMail2} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* mainHeader */}
        <Image
          style={{width: 48, height: 32.28, marginTop: 25, marginLeft: 25}}
          source={SignUpStep1}
        />
        <View style={{marginTop: 10, marginLeft: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.nameTitle}>웹사이트</Text>
            <Text style={styles.introTitle}>를</Text>
          </View>
          <Text style={styles.introTitle}>추가해주세요.</Text>
          <Text style={styles.introSub}>
            자유롭게 추가해주세요. 독자와 연결됩니다.
          </Text>
        </View>

        {/* Body: Input */}
        <View
          style={{
            ...styles.titleView,
            borderBottomWidth: 0,
            paddingBottom: 150,
          }}>
          <View>
            <View style={styles.websiteView}>
              <Image
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={FacebookNone}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => facebookRef.current.focus()}>
                <Text style={styles.websiteText}>facebook.com/</Text>
              </TouchableOpacity>
              <View style={{height: 20, width: 240}}>
                <TextInput
                  ref={facebookRef}
                  style={styles.websiteTextInput}
                  value={editFacebook}
                  onChangeText={setEditFacebook}
                />
              </View>
            </View>
            <View style={styles.websiteView}>
              <Image
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={TwitterNone}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => twitterRef.current.focus()}>
                <Text style={styles.websiteText}>twitter.com/</Text>
              </TouchableOpacity>
              <View style={{height: 20, width: 240}}>
                <TextInput
                  ref={twitterRef}
                  style={styles.websiteTextInput}
                  value={editTwitter}
                  onChangeText={setEditTwitter}
                />
              </View>
            </View>
            <View style={styles.websiteView}>
              <Image
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={InstagramNone}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => instagramRef.current.focus()}>
                <Text style={styles.websiteText}>instagram.com/</Text>
              </TouchableOpacity>
              <View style={{height: 20, width: 240}}>
                <TextInput
                  ref={instagramRef}
                  style={styles.websiteTextInput}
                  value={editInstagram}
                  onChangeText={setEditInstagram}
                />
              </View>
            </View>
            <View style={styles.websiteView}>
              <Image
                style={{width: 21.5, height: 20.64, marginRight: 17}}
                source={URLNone}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => urlRef.current.focus()}>
                <Text style={styles.websiteText}>https://</Text>
              </TouchableOpacity>
              <View style={{height: 20, width: 240}}>
                <TextInput
                  ref={urlRef}
                  style={styles.websiteTextInput}
                  value={editURL}
                  onChangeText={setEditURL}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* Footer: Button pass */}
      <View style={{...styles.bottomView, bottom: insets.bottom + 15}}>
        <TouchableOpacity onPress={onPressConfirm} style={styles.buttonAble}>
          <View>
            <Text style={styles.buttonAbleText}>완료</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 22,
  },
  nameTitle: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 27,
    color: '#3C3C3C',
  },
  introTitle: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 27,
    color: '#3C3C3C',
  },
  introSub: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#BEBEBE',
    marginTop: 6,
  },
  input: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#3C3C3C',
    top: -103 + 82,
    left: 37,
    paddingRight: 40,
    includeFontPadding: false,
  },
  bodyinputBorder: {
    bottom: 22 - 11,
    width: 336,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  bottomView: {
    width: '100%',
    position: 'absolute',
  },
  buttonAble: {
    marginHorizontal: 20,
    backgroundColor: '#4562F1',
    borderRadius: 26,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonAbleText: {
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#FFFFFF',
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
  },
  footerPassText: {
    marginTop: 15,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    color: '#3C3C3C',
    textDecorationLine: 'underline',
  },
  websiteView: {
    flexDirection: 'row',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 0.5,
    paddingVertical: 14,
    alignItems: 'center',
  },
  websiteText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  websiteTextInput: {
    padding: 0,
    width: '100%',
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  titleView: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 21,
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 1,
    marginTop: 70,
  },
});

export default AddWebsite;
