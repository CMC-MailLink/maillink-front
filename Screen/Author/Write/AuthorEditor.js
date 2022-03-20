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
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import ImagePicker from 'react-native-image-crop-picker';
import {SignUpAPI} from '../../../API/SignUpAPI';

import ExitWriting from '../../../assets/images/ExitWriting.png';
import SendWriting from '../../../assets/images/SendWriting.png';
import {AuthorAPI} from '../../../API/AuthorAPI';

const AuthorEditor = ({navigation: {setOptions}, route: {params}}) => {
  let webRef = useRef();
  const navigation = useNavigation();
  const url = 'https://www.mail-link.co.kr/quilEditor';
  // const url = 'http://localhost:3000/quilEditor';
  const [save, setSave] = useState(false);
  const [send, setSend] = useState(false);
  const [title, setTitle] = useState(params ? params.title : '');
  const [imageCount, setImageCount] = useState(0);

  const onPressBack = () => {
    navigation.goBack();
  };
  const handleOnMessage = async ({nativeEvent: {data}}) => {
    if (data === 'image') {
      console.log('!!');
      //이미지 선택
      const onPressEditImage = async () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          console.log(image);
          imageUpload(image.path);
        });
      };

      //이미지 등록
      const imageUpload = async imagePath => {
        const imageData = new FormData();
        imageData.append('image', {
          uri: imagePath,
          name: 'image.png',
          fileName: 'image',
          type: 'image/png',
        });

        const result = await SignUpAPI.profileEditing({image: imageData});
        console.log(result);
        if (result) {
          webRef.current.postMessage(JSON.stringify({imageURL: result}));
          setImageCount(imageCount + 1);
          webRef.current.injectJavaScript(`
            var imageDiv = document.getElementById('imageURL');
            var textNode = document.createTextNode('${result}');
            imageDiv.appendChild(textNode);
            true;
          `);
        } else {
          console.log('이미지 업로드 실패');
        }
      };

      onPressEditImage();
    }
    if (save) {
      const temp = await JSON.parse(data);
      const contents = temp.contents;
      const text = temp.text;
      console.log(contents, text);
      const preView = text.replace(/\n/g, ' ').slice(0, 44) + '...';
      const result = await AuthorAPI.writerPostSaving({
        title: title,
        content: contents,
        preView: preView,
      });
      navigation.goBack();
    }
    if (send) {
      const temp = await JSON.parse(data);
      const contents = temp.contents;
      const text = temp.text;
      const preView = text.replace(/\n/g, ' ').slice(0, 44) + '...';
      const result = await AuthorAPI.writerPostSending({
        title: title,
        content: contents,
        preView: preView,
      });
      navigation.goBack();
    }
  };

  const runFirst = `
      document.getElementById('sendButton').click();
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  const contentSending = `
    let div = document.createElement('div');
    div.classList.add('test');
    var textNode = document.createTextNode('${params ? params.content : ''}');
    div.append(textNode);
    div.style.display="none";
    document.body.appendChild(div);
    true;
  `;

  const onPressSave = async () => {
    await webRef.current.injectJavaScript(runFirst);
    setSave(true);
  };

  const onPressSend2 = async () => {
    await webRef.current.injectJavaScript(runFirst);
    setSend(true);
  };

  const onPressSend = () => {
    Alert.alert('발행하기', '발행 후 수정이 불가합니다. 발행하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: '확인',
        onPress: () => {
          onPressSend2();
        },
      },
    ]);
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
          <TouchableWithoutFeedback onPress={onPressSave}>
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
          <TouchableWithoutFeedback onPress={onPressSend}>
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
        injectedJavaScript={contentSending}
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
