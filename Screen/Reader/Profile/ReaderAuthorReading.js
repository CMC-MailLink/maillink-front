import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {useQuery, useQueryClient} from 'react-query';
import {ReaderAPI} from '../../../API/ReaderAPI';
import FastImage from 'react-native-fast-image';
import {
  addScreenshotListener,
  removeScreenshotListener,
} from 'react-native-detector';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
import ReportReading from '../../../assets/images/ReportReading.png';
import ReportMenuPage from '../../../assets/images/ReportMenuPage.png';

const ReaderAuthorReading = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const url = 'https://www.mail-link.co.kr/readingEditor';
  let webRef = useRef();
  const [webviewLoading, setWebviewLoading] = useState(true);
  const {isLoading: mailDetailLoading, data: mailDetailData} = useQuery(
    ['ReaderMailDetail', params.mailId],
    ReaderAPI.mailProfileReading,
  );
  const {isLoading: authorInfoLoading, data: authorInfoData} = useQuery(
    ['AuthorInfo', params.writerId],
    ReaderAPI.getWriterInfo,
  );
  const loading = mailDetailLoading || authorInfoLoading;

  useEffect(() => {
    queryClient.refetchQueries(['ReaderMail']);
  }, [queryClient]);

  const onPressBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const userDidScreenshot = () => {
      Alert.alert(
        '작품을 지켜주세요!',
        '작품을 캡쳐한 스크린샷을 온/오프라인에 유포/공유할 경우 법적인 제재를 받을 수 있습니다.',
        [{text: '확인', onPress: () => console.log('OK Pressed')}],
      );
    };
    const unsubscribe = addScreenshotListener(userDidScreenshot);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading && !webviewLoading) {
      console.log('로딩 끝', mailDetailData);
      webRef.current.injectJavaScript(contentSending);
    }
  }, [loading, contentSending, mailDetailData, webviewLoading]);

  const contentSending = `
    let div = document.createElement('div');
    div.classList.add('test');
    var textNode = document.createTextNode('${
      mailDetailData ? mailDetailData.content.replaceAll("'", "\\'") : ''
    }');
    div.append(textNode);
    div.style.display="none";
    document.body.appendChild(div);
    document.getElementById('loadingButton').click();
    true;
  `;

  const onPressReport = data => {
    navigation.navigate('ReaderStacks', {
      screen: 'MessageReport',
    });
  };

  const RenderInfoItem = ({item}) => {
    return (
      <Menu style={{justifyContent: 'center'}}>
        <MenuTrigger>
          <View>
            <FastImage style={{width: 23, height: 23}} source={ReportReading} />
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
            <FastImage
              style={{
                width: 22,
                height: 22,
                position: 'absolute',
                left: 178.5,
              }}
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
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24, width: 20, height: 20}}>
            <FastImage
              style={{width: 9.5, height: 19}}
              source={BackMail2}></FastImage>
          </View>
        </TouchableWithoutFeedback>
        <View style={{position: 'absolute', right: 21}}>
          <RenderInfoItem></RenderInfoItem>
        </View>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          {mailDetailData ? mailDetailData.title : null}
        </Text>
        <Text style={styles.dateText}>
          {mailDetailData ? mailDetailData.publishedTime.slice(0, 10) : null}
        </Text>
      </View>
      <View style={styles.authorView}>
        <FastImage
          style={{width: 30, height: 30, marginRight: 12, borderRadius: 90}}
          source={
            !mailDetailData ||
            mailDetailData.writerImgUrl === '' ||
            !mailDetailData.writerImgUrl
              ? DefaultProfile
              : {uri: mailDetailData.writerImgUrl}
          }></FastImage>
        <Text style={styles.authorText}>
          {authorInfoData ? authorInfoData.writerInfo.nickName : null}
        </Text>
      </View>
      <WebView
        startInLoadingState={true}
        onLoad={() => setWebviewLoading(false)}
        automaticallyAdjustContentInsets={false}
        source={{uri: url}}
        scrollEnabled={true}
        hideKeyboardAccessoryView={true}
        ref={webRef}
        menuItems={[{label: '인스타 공유', key: 'shareinstagram'}]}
        onCustomMenuSelection={webViewEvent => {
          const {label} = webViewEvent.nativeEvent; // The name of the menu item, i.e. 'Tweet'
          const {key} = webViewEvent.nativeEvent; // The key of the menu item, i.e. 'tweet'
          const {selectedText} = webViewEvent.nativeEvent; // Text highlighted
          navigation.navigate('ReaderStacks', {
            screen: 'InstaShare',
            params: {
              text: selectedText,
              title: mailDetailData.title,
              author: authorInfoData.writerInfo.nickName,
            },
          });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  titleView: {
    paddingVertical: 13,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  dateText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  authorView: {
    height: 46,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingLeft: 20,
    flexDirection: 'row',
  },
  authorText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 15,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  subscribeView: {
    position: 'absolute',
    right: 20,
    width: 75,
    height: 30,
    borderRadius: 15,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeNotView: {
    position: 'absolute',
    right: 20,
    width: 75,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#828282',
    includeFontPadding: false,
  },
  subscribeNotText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#FFF',
    includeFontPadding: false,
  },
  bodyView: {
    width: '100%',
    padding: 20,
    marginBottom: 150,
  },
  bodyText: {
    color: '#3C3C3C',
    width: '100%',
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
export default ReaderAuthorReading;
