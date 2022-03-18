import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';

import ExitWriting from '../../../assets/images/ExitWriting.png';
import SendWriting from '../../../assets/images/SendWriting.png';
import {AuthorAPI} from '../../../API/AuthorAPI';

const AuthorEditor = () => {
  let webRef = useRef();
  const navigation = useNavigation();
  const url = 'https://www.mail-link.co.kr/quilEditor';
  const [save, setSave] = useState(false);
  const [title, setTitle] = useState('');

  const onPressBack = () => {
    navigation.goBack();
  };
  const handleOnMessage = async ({nativeEvent: {data}}) => {
    if (save) {
      const temp = await JSON.parse(data);
      const contents = temp.contents;
      const text = temp.text;
      const preView = text.replaceAll('\n', ' ').slice(0, 44) + '...';
      const result = await AuthorAPI.writerPostSaving({
        title: title,
        content: contents,
        preView: preView,
      });
    }
  };

  const runFirst = `
      document.getElementById('sendButton').click();
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  const onPressSend = async () => {
    await webRef.current.injectJavaScript(runFirst);
    setSave(true);
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{left: 22.5}}>
            <Image style={{width: 14.5, height: 14.5}} source={ExitWriting} />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            position: 'absolute',
            right: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback onPress={onPressSend}>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Medium',
                fontSize: 16,
                color: '#3C3C3C',
                includeFontPadding: false,
              }}>
              임시저장
            </Text>
          </TouchableWithoutFeedback>
          <Text
            style={{
              marginHorizontal: 11,
              color: '#CECECE',
              includeFontPadding: false,
            }}>
            ・
          </Text>
          <TouchableWithoutFeedback>
            <Image style={{width: 21.05, height: 25.43}} source={SendWriting} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <TextInput
        style={{
          color: '#3C3C3C',
          fontFamily: 'NotoSansKR-Medium',
          fontSize: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: 1,
          includeFontPadding: false,
        }}
        placeholder="제목을 입력해주세요."
        placeholderTextColor="#BFBFBF"
        value={title}
        onChangeText={setTitle}></TextInput>
      <WebView
        automaticallyAdjustContentInsets={false}
        source={{uri: url}}
        scrollEnabled={true}
        hideKeyboardAccessoryView={true}
        ref={webRef}
        onMessage={handleOnMessage}
        // injectedJavaScript={INJECTED_JAVASCRIPT}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 94 - 48,
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
    width: '100%',
    height: 32.6,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    // paddingBottom: 103 - 23.78,
    paddingBottom: 84.5,
  },
});
export default AuthorEditor;
