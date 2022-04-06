import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import ImagePicker from 'react-native-image-crop-picker';
import {SignUpAPI} from '../../../API/SignUpAPI';
import FastImage from 'react-native-fast-image';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import WriteConfirmModal from './WriteConfirmModal.js';

import ExitWriting from '../../../assets/images/ExitWriting.png';
import SendWriting from '../../../assets/images/SendWriting.png';
import {AuthorAPI} from '../../../API/AuthorAPI';

const AuthorTempEditor = ({navigation: {setOptions}, route: {params}}) => {
  let webRef = useRef();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const urlIOS = 'https://www.mail-link.co.kr/quilEditor';
  const urlAndroid = 'https://www.mail-link.co.kr/quilEditorAndroid';
  const [save, setSave] = useState(false);
  const [send, setSend] = useState(false);
  const [title, setTitle] = useState(params ? params.title : '');
  const [imageCount, setImageCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  const onPressBack = () => {
    navigation.goBack();
  };
  const handleOnMessage = async ({nativeEvent: {data}}) => {
    if (data === 'image') {
      //이미지 선택
      const onPressEditImage = async () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
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
      const preView = text.replace(/\n/g, ' ').slice(0, 44) + '...';
      const result = await AuthorAPI.writerTempSaving({
        mailId: params.id,
        title: title,
        content: contents,
        preView: preView,
      });
      if (!result) {
        return;
      }
      await queryClient.refetchQueries(['AuthorStorage']);
      navigation.goBack();
    }
    if (send) {
      const temp = await JSON.parse(data);
      const contents = temp.contents;
      const text = temp.text;
      const preView = text.replace(/\n/g, ' ').slice(0, 44) + '...';
      const result = await AuthorAPI.writerTempSaving({
        mailId: params.id,
        title: title,
        content: contents,
        preView: preView,
      });
      const result2 = await AuthorAPI.writerTempSending({
        tempMailId: params.id,
      });
      if (!result || !result2) {
        return;
      }
      await queryClient.refetchQueries(['AuthorStorage']);
      await queryClient.refetchQueries(['AuthorMail']);
      setModalVisible(false);
      navigation.navigate('AuthorTabs', {
        screen: 'AuthorWrite',
        params: {send: true},
      });
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

  const onPressSend2 = () => {
    setModalVisible(!modalVisible);
  };

  const onPressConfirm = async () => {
    await webRef.current.injectJavaScript(runFirst);
    setSend(true);
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="dark-content" />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <WriteConfirmModal
          setModalVisible={setModalVisible}
          setModalConfirm={setModalConfirm}
          onPressSend2={onPressSend2}
          onPressConfirm={onPressConfirm}
        />
      </Modal>
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24, width: 20, height: 20}}>
            <FastImage
              style={{width: 14.5, height: 14.5}}
              source={ExitWriting}
            />
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
          <TouchableWithoutFeedback onPress={onPressSend2}>
            <FastImage
              style={{width: 21.05, height: 25.43}}
              source={SendWriting}
            />
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
        onChangeText={setTitle}
      />
      <WebView
        startInLoadingState={true}
        automaticallyAdjustContentInsets={false}
        source={{uri: Platform.OS === 'ios' ? urlIOS : urlAndroid}}
        scrollEnabled={true}
        // hideKeyboardAccessoryView={true}
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
export default AuthorTempEditor;
