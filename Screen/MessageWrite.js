import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ExitMessage from '../assets/images/ExitMessage.png';
import SendWriting from '../assets/images/SendWriting.png';

const MessageWrite = () => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#F8F8F8'}} />
      {/* upperHeader */}
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View>
            <Image style={{width: 14.5, height: 14.5}} source={ExitMessage} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>쪽지보내기</Text>
        <TouchableWithoutFeedback>
          <View>
            <Image style={{width: 21.05, height: 25.43}} source={SendWriting} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TextInput
        style={styles.inputView}
        multiline={true}
        placeholder="내용을 입력하세요. (200자 제한)"
        placeholderTextColor="#BEBEBE"
        maxLength={200}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    paddingLeft: 22.5,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  inputView: {
    flex: 1,
    textAlignVertical: 'top',
    marginVertical: 16,
    paddingHorizontal: 20,
    fontFamily: 'NotoSansKR-Light',
    fontSize: 15,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
});

export default MessageWrite;
