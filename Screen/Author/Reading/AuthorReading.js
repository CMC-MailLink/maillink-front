import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import FastImage from 'react-native-fast-image';
import {
  addScreenshotListener,
  removeScreenshotListener,
} from 'react-native-detector';

import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import BackMail2 from '../../../assets/images/BackMail2.png';

const AuthorReading = ({navigation: {setOptions}, route: {params}}) => {
  let webRef = useRef();
  const navigation = useNavigation();
  const url = 'https://www.mail-link.co.kr/readingEditor';
  // const url = 'http://localhost:3000/readingEditor';

  const onPressBack = () => {
    navigation.goBack();
  };

  const contentSending = `
    let div = document.createElement('div');
    div.classList.add('test');
    var textNode = document.createTextNode('${
      params.data ? params.data.content : ''
    }');
    div.append(textNode);
    div.style.display="none";
    document.body.appendChild(div);
    document.getElementById('loadingButton').click();
    true;
  `;

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

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24, width: 20, height: 20}}>
            <FastImage style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{params.data.title}</Text>
        <Text style={styles.dateText}>
          {params.data.publishedTime.slice(0, 10)}
        </Text>
      </View>
      <View style={styles.authorView}>
        <FastImage
          style={{width: 30, height: 30, marginRight: 12, borderRadius: 90}}
          source={
            params.memberInfo.imgUrl == ''
              ? DefaultProfile
              : {uri: params.memberInfo.imgUrl}
          }></FastImage>
        <Text style={styles.authorText}>{params.memberInfo.nickName}</Text>
      </View>
      <WebView
        startInLoadingState={true}
        automaticallyAdjustContentInsets={false}
        source={{uri: url}}
        scrollEnabled={true}
        hideKeyboardAccessoryView={true}
        ref={webRef}
        onMessage={event => {}}
        injectedJavaScript={contentSending}
        menuItems={[{label: '인스타 공유', key: 'shareinstagram'}]}
        onCustomMenuSelection={webViewEvent => {
          const {label} = webViewEvent.nativeEvent; // The name of the menu item, i.e. 'Tweet'
          const {key} = webViewEvent.nativeEvent; // The key of the menu item, i.e. 'tweet'
          const {selectedText} = webViewEvent.nativeEvent; // Text highlighted
          navigation.navigate('AuthorStacks', {
            screen: 'InstaShare',
            params: {
              text: selectedText,
              title: params.data.title,
              // author: params.author,
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
    height: 75,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  titleText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    color: '#3C3C3C',
    marginBottom: 4,
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
});
export default AuthorReading;
