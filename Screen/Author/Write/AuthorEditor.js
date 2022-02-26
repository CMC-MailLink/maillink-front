import React from 'react';
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

import BackMail2 from '../../../assets/images/BackMail2.png';
import ExitWriting from '../../../assets/images/ExitWriting.png';
import SendWriting from '../../../assets/images/SendWriting.png';

const AuthorEditor = () => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };

  const url = Platform.select({
    ios: 'http://localhost:3000/quileditor',
    android: 'http://10.0.2.2:3000/quileditor',
  });
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
          <TouchableWithoutFeedback>
            <Text
              style={{
                fontFamily: 'NotoSansKR-Medium',
                fontSize: 16,
                color: '#3C3C3C',
              }}>
              임시저장
            </Text>
          </TouchableWithoutFeedback>
          <Text style={{marginHorizontal: 16, color: '#CECECE'}}>•</Text>
          <TouchableWithoutFeedback>
            <Image style={{width: 21.05, height: 25.43}} source={SendWriting} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <TextInput
        style={{
          height: 40,
          color: '#3C3C3C',
          fontFamily: 'NotoSansKR-Medium',
          fontSize: 20,
          paddingHorizontal: 20,
          marginVertical: 10,
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: 1,
        }}
        placeholder="제목을 입력해주세요."
        placeholderTextColor="#BFBFBF"></TextInput>
      <WebView
        hideKeyboardAccessoryView
        source={{uri: url}}
        menuItems={[{label: '공유', key: 'share'}]}
        onCustomMenuSelection={webViewEvent => {
          const {label} = webViewEvent.nativeEvent; // The name of the menu item, i.e. 'Tweet'
          const {key} = webViewEvent.nativeEvent; // The key of the menu item, i.e. 'tweet'
          const {selectedText} = webViewEvent.nativeEvent; // Text highlighted
        }}
        scrollEnabled={true}
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